export class CliExpectedError extends Error {
  constructor(public readonly message: string) {
    super(message)
  }
}
