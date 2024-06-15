import { red, yellow } from 'chalk'
import { toCamelCase } from 'name-util'
import { CommandOrBuilder, allInputs, isCommandBuilder } from './cli-command-builder'
import { CliError } from './cli-error'
import { showDocumentation, showHelp, toDocumentation, toHelp } from './cli-help'
import { prompt } from './cli-prompt'
import { Command, Input, InputType, isCommand, isInput } from './cli-types'
import { CliExpectedError } from './cli-expected-error'

interface Props {
  help?: boolean
  doc?: boolean
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
  const { type, choices } = input
  switch (type) {
    case InputType.String:
      if (choices?.length && !choices.includes(value)) {
        throw new CliError(
          `Invalid value "${value}" for the input "--${
            input.name as string
          }". You must provide ${toValues(choices)}`,
          command,
          parentCommands,
        )
      }
      return value
    case InputType.Number: {
      const targetValue =
        typeof value === 'number'
          ? value
          : typeof value === 'string'
          ? parseInt(value, undefined)
          : undefined
      if (targetValue && !isNaN(targetValue)) return targetValue
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
      return parseCommand(input, args.slice(argIndex + 1), 0, props, [...parentCommands, command])
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
        [toCamelCase(String(cmdArg.name))]: parseValue(currentArg, cmdArg, command, parentCommands),
      },
      parentCommands,
    )
  }
  throw new CliError(`Invalid argument "${currentArg}"`, command, parentCommands)
}

async function promptAllMissingValues(
  command: Command<any>,
  props: any,
  parentCommands: Command<any>[],
) {
  const nextProps = { ...props }
  const inputs = allInputs(command).filter(input => input.shouldPrompt)
  for (const input of inputs) {
    const key = toCamelCase(input.name as string)
    if (typeof props[key] === 'undefined') {
      const nextValue = await prompt(input)
      nextProps[key] = parseValue(nextValue[key], input, command, parentCommands)
    }
  }
  return nextProps
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
      typeof props[toCamelCase(String(input.name))] === 'undefined'
    ) {
      throw new CliError(
        `Missing a required argument "<${String(input.name)}>"`,
        command,
        parentCommands,
      )
    }
  }
}

function showCliHelp(command: Command<any>, commands: Command<any>[]) {
  const prefix = commands.map(({ name }) => name).join(' ')
  return typeof jest !== 'undefined' ? toHelp(command, prefix) : showHelp(command, prefix)
}

function showDoc(command: Command<any>, commands: Command<any>[]) {
  const prefix = commands.map(({ name }) => name).join(' ')
  return typeof jest !== 'undefined'
    ? toDocumentation(command, prefix).join('\n')
    : showDocumentation(command, prefix)
}

async function parseInitialValues(command: Command<any>, parsedProps: any) {
  const props = allInputs(command).reduce((a: any, i) => {
    const key = toCamelCase(i.name as string)
    return { ...a, [key]: a[key] ?? i.default }
  }, parsedProps)
  const loadedProps = (await command?.loader?.(props)) ?? {}
  return allInputs(command).reduce((a: any, i) => {
    const key = toCamelCase(i.name as string)
    return { ...a, [key]: a[key] ?? loadedProps[key] ?? i.default }
  }, parsedProps)
}

export async function runCli<T>(
  commandOrBuilder: CommandOrBuilder<T>,
  args = process.argv.slice(2),
) {
  try {
    const inputCommand = isCommandBuilder(commandOrBuilder)
      ? commandOrBuilder.toCommand()
      : commandOrBuilder
    const [command, parsedProps, commands] = parseCommand<Props>(inputCommand, args)
    if (parsedProps.version) return console.log(inputCommand.version ?? 'Unknown')
    if (parsedProps.help) return showCliHelp(command, commands)
    if (parsedProps.doc) return showDoc(command, commands)
    const initialProps = await parseInitialValues(command, parsedProps)
    const props = await promptAllMissingValues(command, initialProps, commands)
    validateMissingArgs(command, props, commands)
    if (!command.handler) return showCliHelp(command, commands)
    return await command.handler(props as any)
  } catch (e) {
    if (e instanceof CliError) {
      console.error(red(`\nError: ${e.message}\n`))
      const commandText = [...e.parentCommands, e.command].map(c => c.name).join(' ')
      return console.log(yellow(`Run "${commandText} --help" to see help`))
    }
    if (e instanceof CliExpectedError) {
      console.log('')
      console.error(red(`ERROR: ${e.message}`))
      process.exit(1)
    }
    throw e
  }
}
