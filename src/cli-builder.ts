import { CommandBuilder } from './cli-command-builder'
import { input } from './cli-input-builder'

class Cli<T> extends CommandBuilder<T> {
  constructor(name: string) {
    super(name)
  }

  version(version: string) {
    this.cmd.version = version
    if (!this.cmd.inputs['version']) {
      this.option(input('version').description('Show version') as any)
    }
    return this
  }
}

export function cli<T>(name: string) {
  return new Cli<T>(name)
}
