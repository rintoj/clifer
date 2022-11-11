import { red, yellow } from 'chalk'
import { toCamelCase } from 'name-util'
import { CommandOrBuilder, isCommandBuilder } from './cli-command-builder'
import { CliError } from './cli-error'
import { showHelp, toHelp } from './cli-help'
import { Command, Input, InputType, isCommand, isInput } from './cli-types'

interface Props {
  help?: boolean
  version?: boolean
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

function parseValue(
  value: string | boolean,
  input: Input<any, any>,
  command: Command<any>,
  parentCommands: Command<any>[],
) {
  const { type, options } = input
  switch (type) {
    case InputType.String:
      if (options?.length && !options.includes(value)) {
        throw new CliError(
          `Invalid value "${value}" for the input "--${
            input.name as string
          }". You must provide ${toValues(options)}`,
          command,
          parentCommands,
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
          input.name as string
        }". You must provide a ${input.type.toLocaleLowerCase()}`,
        command,
        parentCommands,
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
  argIndex = 0,
  props: P = {} as any,
  parentCommands: Command<any>[] = [],
): [Command<any>, P, Command<any>[]] | undefined {
  const currentArg = args[argIndex]
  const [option, value = true] = toOptionName(currentArg)
  const input = command.inputs[option]
  if (!input) return undefined
  if (input.type !== InputType.Boolean && !/.+=.+/.test(currentArg)) {
    const nextValue = args[argIndex + 1]
    if (typeof nextValue === 'undefined' || /^--.*/.test(nextValue)) {
      throw new CliError(`Missing value for the option "--${option}"`, command, parentCommands)
    }
    return parseCommand(
      command,
      args,
      argIndex + 2,
      { ...props, [toCamelCase(option)]: parseValue(nextValue, input, command, parentCommands) },
      parentCommands,
    )
  }
  return parseCommand(
    command,
    args,
    argIndex + 1,
    { ...props, [toCamelCase(option)]: parseValue(value, input, command, parentCommands) },
    parentCommands,
  )
}

function parseCommand<P>(
  command: Command<any>,
  args: string[],
  argIndex = 0,
  props: P = {} as any,
  parentCommands: Command<any>[] = [],
): [Command<any>, P, Command<any>[]] {
  const currentArg = args[argIndex]
  if (!currentArg) return [command, props, parentCommands]
  const input = parseInput(command, args, argIndex, props, parentCommands)
  if (input) return input
  if (/^--.+/.test(currentArg))
    throw new CliError(`Invalid option "${currentArg}"`, command, parentCommands)
  for (const input of command.arguments) {
    if (isCommand(input) && input.name === currentArg) {
      return parseCommand(
        { ...input, inputs: { ...command.inputs, ...input.inputs } },
        args.slice(argIndex + 1),
        0,
        props,
        [...parentCommands, command],
      )
    }
  }
  const cmdArg = command.arguments[argIndex]
  if (isInput(cmdArg)) {
    return parseCommand(
      command,
      args,
      argIndex + 1,
      {
        ...props,
        [toCamelCase(cmdArg.name)]: parseValue(currentArg, cmdArg, command, parentCommands),
      },
      parentCommands,
    )
  }
  throw new CliError(`Invalid argument "${currentArg}"`, command, parentCommands)
}

function validateMissingArgs(command: Command<any>, props: any, parentCommands: Command<any>[]) {
  for (const input of Object.values(command.inputs)) {
    if (input.isRequired && typeof props[toCamelCase(input.name as string)] === 'undefined') {
      throw new CliError(
        `Missing a required input "--${input.name as string}"`,
        command,
        parentCommands,
      )
    }
  }
  for (const input of command.arguments) {
    if (
      isInput(input) &&
      input.isRequired &&
      typeof props[toCamelCase(input.name)] === 'undefined'
    ) {
      throw new CliError(`Missing a required argument "<${input.name}>"`, command, parentCommands)
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
  try {
    const inputCommand = isCommandBuilder(commandOrBuilder)
      ? commandOrBuilder.toCommand()
      : commandOrBuilder
    const [command, props, commands] = parseCommand<Props>(inputCommand, args)
    if (props.version) return console.log(inputCommand.version ?? 'Unknown')
    if (props.help) return showCliHelp(command, commands)
    validateMissingArgs(command, props, commands)
    if (!command.handler) {
      throw new CliError(`Command "${inputCommand.name}" is missing a handler`, command, commands)
    }
    return command.handler(props as any)
  } catch (e) {
    if (e instanceof CliError) {
      console.error(red(`\nError: ${e.message}\n`))
      const commandText = [...e.parentCommands, e.command].map(c => c.name).join(' ')
      return console.log(yellow(`Run "${commandText} --help" to see help`))
    }
    throw e
  }
}
