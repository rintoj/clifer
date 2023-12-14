import { cli } from './cli-builder'
import { toDocumentation, toHelp } from './cli-help'
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
    const help = toHelp(cli('mycli').toCommand(), '', true)
    expect(trim(help)).toEqual(
      trim(`
        mycli   [--help] [--doc]

        COMMON

        --help   Show help

        --doc    Generate documentation
      `),
    )
  })

  test('should generate a simple cli with help', () => {
    const help = toHelp(cli('mycli').toCommand(), '', true)
    expect(trim(help)).toEqual(
      trim(`
        mycli   [--help] [--doc]

        COMMON

        --help   Show help

        --doc    Generate documentation
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
      '',
      true,
    )
    expect(trim(help)).toEqual(
      trim(`
        mycli   [--service-name=<string>] [--instances=<number>] [--dry-run] [--help]
        [--doc]

        OPTIONS

        --service-name=<string>   Name of the service

        --instances=<number>      Number of instances

        --dry-run                 Do not make changes but run in dry-run mode

        COMMON

        --help                    Show help

        --doc                     Generate documentation
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
      '',
      true,
    )
    expect(trim(help)).toEqual(
      trim(`
        mycli   --service-name=<string> [--instances=<number>] [--dry-run] [--help] [--doc]

        OPTIONS

        --service-name=<string>   [Required] Name of the service

        --instances=<number>      Number of instances

        --dry-run                 Do not make changes but run in dry-run mode

        COMMON

        --help                    Show help

        --doc                     Generate documentation
      `),
    )
  })

  test('should generate a simple cli with version and help', () => {
    const help = toHelp(cli('mycli').version('1.0.0').toCommand(), '', true)
    expect(trim(help)).toEqual(
      trim(`
        mycli   [--help] [--doc] [--version]

        COMMON

        --help      Show help

        --doc       Generate documentation

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
      '',
      true,
    )
    expect(trim(help)).toEqual(
      trim(`
        mycli   <name> [service] [instances] [event] [--help] [--doc] [--version]

        ARGUMENTS

        name        Name of the service

        service     Name of the target service

        instances   Number of instances

        event       Event to be attached

        COMMON

        --help      Show help

        --doc       Generate documentation

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
      '',
      true,
    )
    expect(trim(help)).toEqual(
      trim(`
        mycli   <create|generate|index> [--dry-run] [--help] [--doc] [--version]

        COMMANDS

        create      Create a module

        generate    Generate data hooks

        index       Create database index

        OPTIONS

        --dry-run   Do a sample run

        COMMON

        --help      Show help

        --doc       Generate documentation

        --version   Show version
      `),
    )
  })

  test('should generate documentation', () => {
    const help = toDocumentation(
      cli<any>('mycli')
        .version('1.0.0')
        .command(command('create').description('Create a module'))
        .command(command('generate').description('Generate data hooks'))
        .command(command('index').description('Create database index'))
        .option(input('dry-run').description('Do a sample run'))
        .toCommand(),
      '',
      true,
    ).join('\n')
    expect(trim(help)).toEqual(
      trim(
        [
          '# mycli',
          '```sh',
          '   ',
          'mycli   <create|generate|index> [--dry-run] [--help] [--doc] [--version]',
          '',
          'COMMANDS ',
          '',
          'create      Create a module       ',
          '',
          'generate    Generate data hooks   ',
          '',
          'index       Create database index ',
          '',
          'OPTIONS  ',
          '',
          '--dry-run   Do a sample run       ',
          '',
          'COMMON   ',
          '',
          '--help      Show help             ',
          '',
          '--doc       Generate documentation',
          '',
          '--version   Show version          ',
          '   ',
          '```',
          '',
          '## mycli create',
          '',
          'Create a module',
          '',
          '```sh',
          '   ',
          'mycli create   ',
          '   ',
          '```',
          '',
          '## mycli generate',
          '',
          'Generate data hooks',
          '',
          '```sh',
          '   ',
          'mycli generate   ',
          '   ',
          '```',
          '',
          '## mycli index',
          '',
          'Create database index',
          '',
          '```sh',
          '   ',
          'mycli index   ',
          '   ',
          '```',
          '',
        ].join('\n'),
      ),
    )
  })
})
