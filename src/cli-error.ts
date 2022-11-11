import { Command } from './cli-types'

export class CliError extends Error {
  constructor(
    public readonly message: string,
    public readonly command: Command<any>,
    public readonly parentCommands: Command<any>[],
  ) {
    super(message)
  }
}
