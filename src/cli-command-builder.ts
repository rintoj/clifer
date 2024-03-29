import { input, InputOrBuilder, isInputBuilder } from './cli-input-builder'
import { Command, Input, InputType, InputValueType, isInput, Kind } from './cli-types'

export type CommandBuilderType<T> = CommandBuilder<T> | CommandBuilderBase<T>

export type CommandOrBuilder<T> = Command<T> | CommandBuilderType<T>

export function isCommandBuilder<T>(cmd: CommandOrBuilder<T>): cmd is CommandBuilderType<T> {
  return cmd instanceof CommandBuilderBase
}

export function allInputs<T>(cmd: Command<T>): Input<any, any>[] {
  return [...cmd.arguments, ...Object.values(cmd.inputs).filter(isInput)].filter(
    i => !['version', 'help', 'doc'].includes(i.name as string),
  ) as any
}

class CommandBuilderBase<T> {
  cmd: Command<T>

  constructor(name: string) {
    this.cmd = {
      kind: Kind.Command,
      name,
      arguments: [],
      inputs: {
        help: input<{ help: boolean }, any>('help').description('Show help').toInput(),
        doc: input<{ doc: boolean }, any>('doc').description('Generate documentation').toInput(),
      } as any,
    }
  }

  description(description: string) {
    this.cmd.description = description
    return this
  }

  option<V extends InputValueType>(inputOrBuilder: InputOrBuilder<T, V>) {
    const input = isInputBuilder(inputOrBuilder) ? inputOrBuilder.toInput() : inputOrBuilder
    this.cmd.inputs[input.name as any] = input
    return this
  }

  load(loader: (props: Partial<T>) => Promise<Partial<T>>) {
    this.cmd.loader = loader
    return this
  }

  handle(action: (props: T) => void | Promise<any>) {
    this.cmd.handler = action
    return this
  }

  toCommand() {
    return this.cmd
  }
}

class CommandBuilderWithInnerCommands<T> extends CommandBuilderBase<T> {
  constructor(command: Command<T>) {
    super(command.name)
    this.cmd = command
  }

  command(commandOrBuilder: CommandOrBuilder<any>) {
    const command = isCommandBuilder(commandOrBuilder)
      ? commandOrBuilder.toCommand()
      : commandOrBuilder
    this.cmd.arguments.push({ ...command, inputs: { ...this.cmd.inputs, ...command.inputs } })
    return this
  }
}

class CommandBuilderWithArguments<T> extends CommandBuilderBase<T> {
  constructor(command: Command<T>) {
    super(command.name)
    this.cmd = command
  }

  argument<V extends InputValueType>(inputOrBuilder: InputOrBuilder<T, V>) {
    const arg = isInputBuilder(inputOrBuilder) ? inputOrBuilder.toInput() : inputOrBuilder
    if (arg.type === InputType.Boolean) {
      arg.type = InputType.String
    }
    if (arg.isRequired) {
      for (const currentArg of this.cmd.arguments) {
        if (isInput(currentArg)) currentArg.isRequired = true
      }
    }
    this.cmd.arguments.push(arg)
    return this
  }
}

export class CommandBuilder<T> extends CommandBuilderBase<T> {
  command(inputOrBuilder: CommandOrBuilder<any>) {
    return new CommandBuilderWithInnerCommands(this.cmd).command(inputOrBuilder)
  }

  argument<V extends InputValueType>(inputOrBuilder: InputOrBuilder<T, V>) {
    return new CommandBuilderWithArguments(this.cmd).argument(inputOrBuilder)
  }
}

export function command<T>(name: string) {
  return new CommandBuilder<T>(name)
}
