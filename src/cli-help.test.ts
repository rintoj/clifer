import { cli } from './cli-builder'
import { toHelp } from './cli-help'
import { command } from './cli-command-builder'
import { input } from './cli-input-builder'

jest.mock('chalk', () => ({
  yellow: (a: string) => a,
  green: (a: string) => a,
  gray: (a: string) => a,
}))

function trim(output: string) {
  return output
    .split('\n')
    .map(line => `${line.trim().replace(/^(\s|\t)*/g, '')}`)
    .join('\n')
}

describe('cli', () => {
  test('should generate a simple cli with no args and options', () => {
    const help = toHelp(cli('hypergraph').toCommand())
    expect(trim(help)).toEqual(
      trim(`
        hypergraph
      `),
    )
  })

  test('should generate a simple cli with help', () => {
    const help = toHelp(cli('hypergraph').help().toCommand())
    expect(trim(help)).toEqual(
      trim(`
        hypergraph   [--help]

        OPTIONS

        --help    Show help
      `),
    )
  })

  test('should generate a simple cli with help and options', () => {
    const help = toHelp(
      cli('hypergraph')
        .option(input('service-name').description('Name of the service').string())
        .option(input('instances').description('Number of instances').number())
        .option(input('dry-run').description('Do not make changes but run in dry-run mode'))
        .help()
        .toCommand(),
    )
    expect(trim(help)).toEqual(
      trim(`
        hypergraph   [--service-name=<string>] [--instances=<number>] [--dry-run] [--help]

        OPTIONS

        --service-name=<string>   Name of the service

        --instances=<number>      Number of instances

        --dry-run                 Do not make changes but run in dry-run mode

        --help                    Show help
      `),
    )
  })

  test('should generate a simple cli with version and help', () => {
    const help = toHelp(cli('hypergraph').version('1.0.0').help().toCommand())
    expect(trim(help)).toEqual(
      trim(`
        hypergraph   [--version] [--help]

        OPTIONS

        --version   Show version

        --help      Show help
      `),
    )
  })

  test('should generate a simple cli with arguments, version and help', () => {
    const help = toHelp(
      cli('hypergraph')
        .version('1.0.0')
        .argument(input('name').description('Name of the service').string().required())
        .argument(input('service').description('Name of the target service'))
        .argument(input('instances').description('Number of instances').number())
        .argument(input('event').description('Event to be attached'))
        .help()
        .toCommand(),
    )
    expect(trim(help)).toEqual(
      trim(`
        hypergraph   <name> [service] [instances] [event] [--version] [--help]

        ARGUMENTS

        name        Name of the service

        service     Name of the target service

        instances   Number of instances

        event       Event to be attached

        OPTIONS

        --version   Show version

        --help      Show help
      `),
    )
  })

  test('should generate a simple cli with commands, version and help', () => {
    const help = toHelp(
      cli('hypergraph')
        .version('1.0.0')
        .command(command('create').description('Create a module'))
        .command(command('generate').description('Generate data hooks'))
        .command(command('index').description('Create database index'))
        .option(input('dry-run').description('Do a sample run'))
        .help()
        .toCommand(),
    )
    expect(trim(help)).toEqual(
      trim(`
        hypergraph   <create|generate|index> [--dry-run] [--version] [--help]

        COMMANDS

        create      Create a module

        generate    Generate data hooks

        index       Create database index

        OPTIONS

        --dry-run   Do a sample run

        --version   Show version

        --help      Show help
      `),
    )
  })
})
