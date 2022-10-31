import { input, InputOrBuilder, isInputBuilder } from './cli-input-builder'
import { Command, InputType, InputValueType, Kind } from './cli-types'

export type CommandBuilderType<T> = CommandBuilder<T> | CommandBuilderBase<T>

export type CommandOrBuilder<T> = Command<T> | CommandBuilderType<T>

export function isCommandBuilder<T>(cmd: CommandOrBuilder<T>): cmd is CommandBuilderType<T> {
  return cmd instanceof CommandBuilderBase
}

class CommandBuilderBase<T> {
  cmd: Command<T>

  constructor(name: string) {
    this.cmd = {
      kind: Kind.Command,
      name,
      arguments: [],
      inputs: {
        help: input('help').description('Show help').toInput(),
      },
    }
  }

  description(description: string) {
    this.cmd.description = description
    return this
  }

  option<T extends InputValueType>(inputOrBuilder: InputOrBuilder<T>) {
    const input = isInputBuilder(inputOrBuilder) ? inputOrBuilder.toInput() : inputOrBuilder
    this.cmd.inputs[input.name] = input
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
    const arg = isCommandBuilder(commandOrBuilder) ? commandOrBuilder.toCommand() : commandOrBuilder
    this.cmd.arguments.push({ ...arg, inputs: { ...this.cmd.inputs, ...arg.inputs } })
    return this
  }
}

class CommandBuilderWithArguments<T> extends CommandBuilderBase<T> {
  constructor(command: Command<T>) {
    super(command.name)
    this.cmd = command
  }

  argument<T extends InputValueType>(inputOrBuilder: InputOrBuilder<T>) {
    const arg = isInputBuilder(inputOrBuilder) ? inputOrBuilder.toInput() : inputOrBuilder
    if (arg.type === InputType.Boolean) {
      arg.type = InputType.String
    }
    this.cmd.arguments.push(arg)
    return this
  }
}

export class CommandBuilder<T> extends CommandBuilderBase<T> {
  command(inputOrBuilder: CommandOrBuilder<any>) {
    return new CommandBuilderWithInnerCommands(this.cmd).command(inputOrBuilder)
  }

  argument<T extends InputValueType>(inputOrBuilder: InputOrBuilder<T>) {
    return new CommandBuilderWithArguments(this.cmd).argument(inputOrBuilder)
  }
}

export function command<T>(name: string) {
  return new CommandBuilder<T>(name)
}
