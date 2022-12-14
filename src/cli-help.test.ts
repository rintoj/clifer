import { cli } from './cli-builder'
import { toHelp } from './cli-help'
import { command } from './cli-command-builder'
import { input } from './cli-input-builder'

jest.mock('chalk', () => ({
  yellow: (a: string) => a,
  green: (a: string) => a,
  gray: (a: string) => a,
  red: (a: string) => a,
}))

function trim(output: string) {
  return output
    .split('\n')
    .map(line => `${line.trim().replace(/^(\s|\t)*/g, '')}`)
    .join('\n')
}

describe('cli', () => {
  test('should generate a simple cli with no args and options', () => {
    const help = toHelp(cli('mycli').toCommand())
    expect(trim(help)).toEqual(
      trim(`
        mycli   [--help]

        OPTIONS

        --help    Show help
      `),
    )
  })

  test('should generate a simple cli with help', () => {
    const help = toHelp(cli('mycli').toCommand())
    expect(trim(help)).toEqual(
      trim(`
        mycli   [--help]

        OPTIONS

        --help    Show help
      `),
    )
  })

  test('should generate a simple cli with help and options', () => {
    const help = toHelp(
      cli<any>('mycli')
        .option(input('service-name').description('Name of the service').string())
        .option(input('instances').description('Number of instances').number())
        .option(input('dry-run').description('Do not make changes but run in dry-run mode'))
        .toCommand(),
    )
    expect(trim(help)).toEqual(
      trim(`
        mycli   [--service-name=<string>] [--instances=<number>] [--dry-run] [--help]

        OPTIONS

        --service-name=<string>   Name of the service

        --instances=<number>      Number of instances

        --dry-run                 Do not make changes but run in dry-run mode

        --help                    Show help
      `),
    )
  })

  test('should not add square brackets around required inputs', () => {
    const help = toHelp(
      cli<any>('mycli')
        .option(input('service-name').description('Name of the service').string().required())
        .option(input('instances').description('Number of instances').number())
        .option(input('dry-run').description('Do not make changes but run in dry-run mode'))
        .toCommand(),
    )
    expect(trim(help)).toEqual(
      trim(`
        mycli   --service-name=<string> [--instances=<number>] [--dry-run] [--help]

        OPTIONS

        --service-name=<string>   [Required] Name of the service

        --instances=<number>      Number of instances

        --dry-run                 Do not make changes but run in dry-run mode

        --help                    Show help
      `),
    )
  })

  test('should generate a simple cli with version and help', () => {
    const help = toHelp(cli('mycli').version('1.0.0').toCommand())
    expect(trim(help)).toEqual(
      trim(`
        mycli   [--help] [--version]

        OPTIONS

        --help      Show help

        --version   Show version
      `),
    )
  })

  test('should generate a simple cli with arguments, version and help', () => {
    const help = toHelp(
      cli<any>('mycli')
        .version('1.0.0')
        .argument(input('name').description('Name of the service').string().required())
        .argument(input('service').description('Name of the target service'))
        .argument(input('instances').description('Number of instances').number())
        .argument(input('event').description('Event to be attached'))
        .toCommand(),
    )
    expect(trim(help)).toEqual(
      trim(`
        mycli   <name> [service] [instances] [event] [--help] [--version]

        ARGUMENTS

        name        Name of the service

        service     Name of the target service

        instances   Number of instances

        event       Event to be attached

        OPTIONS

        --help      Show help

        --version   Show version
      `),
    )
  })

  test('should generate a simple cli with commands, version and help', () => {
    const help = toHelp(
      cli<any>('mycli')
        .version('1.0.0')
        .command(command('create').description('Create a module'))
        .command(command('generate').description('Generate data hooks'))
        .command(command('index').description('Create database index'))
        .option(input('dry-run').description('Do a sample run'))
        .toCommand(),
    )
    expect(trim(help)).toEqual(
      trim(`
        mycli   <create|generate|index> [--dry-run] [--help] [--version]

        COMMANDS

        create      Create a module

        generate    Generate data hooks

        index       Create database index

        OPTIONS

        --dry-run   Do a sample run

        --help      Show help

        --version   Show version
      `),
    )
  })
})
