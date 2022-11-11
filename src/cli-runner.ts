import { red } from 'chalk'
import { toCamelCase } from 'name-util'
import { CommandOrBuilder, isCommandBuilder } from './cli-command-builder'
import { showHelp, toHelp } from './cli-help'
import { Command, Input, InputType, isCommand, isInput } from './cli-types'

class CliError extends Error {
  constructor(public readonly message: string) {
    super(message)
  }
}

function toValues(value: string[]) {
  return [
    value
      .slice(0, -1)
      .map(v => `"${v}"`)
      .join(', '),
    `"${value.slice(-1)}"`,
  ].join(' or ')
}

function parseValue(value: string | boolean, input: Input<any>) {
  const { type, options } = input
  switch (type) {
    case InputType.String:
      if (options?.length && !options.includes(value)) {
        throw new CliError(
          `Invalid value "${value}" for the input "--${input.name}". You must provide ${toValues(
            options,
          )}`,
        )
      }
      return value
    case InputType.Number: {
      if (typeof value === 'string') {
        const targetValue = parseInt(value, undefined)
        if (!isNaN(targetValue)) return targetValue
      }
      throw new CliError(
        `Invalid value "${value}" for the input "--${
          input.name
        }". You must provide a ${input.type.toLocaleLowerCase()}`,
      )
    }
    case InputType.Boolean:
      if (typeof value === 'string') return value === 'true'
      if (typeof value === 'boolean') return value
  }
}

function toOptionName(arg: string): [string, any] {
  const [name, value = true] = arg.split('=')
  return [name.replace(/^--/g, ''), value]
}

function parseInput<P>(
  command: Command<any>,
  args: string[],
  props: P = {} as any,
  commands: Command<any>[] = [],
): [Command<any>, P, Command<any>[]] | undefined {
  const currentArg = args[0]
  const [option, value = true] = toOptionName(currentArg)
  const input = command.inputs[option]
  if (!input) return undefined
  if (input.type !== InputType.Boolean && !/.+=.+/.test(currentArg)) {
    if (typeof args[1] === 'undefined' || /^--.*/.test(args[1])) {
      throw new CliError(`Missing value for the option "--${option}"`)
    }
    return parseCommand(
      command,
      args.slice(2),
      { ...props, [toCamelCase(option)]: parseValue(args[1], input) },
      commands,
    )
  }
  return parseCommand(
    command,
    args.slice(1),
    { ...props, [toCamelCase(option)]: parseValue(value, input) },
    commands,
  )
}

function parseCommand<P>(
  command: Command<any>,
  args: string[],
  props: P = {} as any,
  commands: Command<any>[] = [],
): [Command<any>, P, Command<any>[]] {
  const currentArg = args[0]
  if (!currentArg) return [command, props, commands]
  const input = parseInput(command, args, props, commands)
  if (input) return input
  if (/^--.+/.test(currentArg)) throw new CliError(`Invalid option "${currentArg}"`)
  for (const input of command.arguments) {
    if (isCommand(input) && input.name === currentArg) {
      return parseCommand(input, args.slice(1), props, [...commands, command])
    }
  }
  const cmdArg = command.arguments[0]
  if (isInput(cmdArg)) {
    return parseCommand(
      { ...command, arguments: command.arguments.slice(1) },
      args.slice(1),
      { ...props, [toCamelCase(cmdArg.name)]: parseValue(currentArg, cmdArg) },
      [...commands, command],
    )
  }
  throw new CliError(`Invalid argument "${currentArg}"`)
}

function validateMissingArgs(command: Command<any>, props: any) {
  for (const input of Object.values(command.inputs)) {
    if (input.isRequired && typeof props[toCamelCase(input.name)] === 'undefined') {
      throw new CliError(`Missing a required input "--${input.name}"`)
    }
  }
  for (const input of command.arguments) {
    if (
      isInput(input) &&
      input.isRequired &&
      typeof props[toCamelCase(input.name)] === 'undefined'
    ) {
      throw new CliError(`Missing a required argument "<${input.name}>"`)
    }
  }
}

function showCliHelp(command: Command<any>, commands: Command<any>[]) {
  const prefix = commands.map(({ name }) => name).join(' ')
  return typeof jest !== 'undefined' ? toHelp(command, prefix) : showHelp(command, prefix)
}

export async function runCli<T>(
  commandOrBuilder: CommandOrBuilder<T>,
  args = process.argv.slice(2),
) {
  const command = isCommandBuilder(commandOrBuilder)
    ? commandOrBuilder.toCommand()
    : commandOrBuilder

  if (args.includes('--version')) {
    return console.log(command.version ?? 'Unknown')
  }
  const [targetCommand, props, commands] = parseCommand<{ help?: boolean }>(command, args)
  if (props.help) return showCliHelp(targetCommand, commands)
  try {
    validateMissingArgs(targetCommand, props)
    if (!targetCommand.handler) {
      throw new CliError(`Command "${targetCommand.name}" is missing a handler`)
    }
    return targetCommand.handler(props)
  } catch (e) {
    if (e instanceof CliError) {
      console.error(red(`\nError: ${e.message}\n`))
      return showCliHelp(targetCommand, commands)
    }
    throw e
  }
}
