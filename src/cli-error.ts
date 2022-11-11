export class CliError extends Error {
  constructor(public readonly message: string) {
    super(message)
  }
}
