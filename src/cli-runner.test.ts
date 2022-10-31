import { cli, command, input, runCli } from './'

function trim(output: string) {
  return output
    .split('\n')
    .map(line => `${line.trim().replace(/^(\s|\t)*/g, '')}`)
    .join('\n')
}

jest.mock('chalk', () => ({
  yellow: (a: string) => a,
  green: (a: string) => a,
  gray: (a: string) => a,
}))

describe('cli', () => {
  test('should run a simple cli', async () => {
    const run = jest.fn()
    await runCli(cli('hypergraph').version('1.0').help().handle(run), [])
    expect(run).toHaveBeenCalledWith({})
  })

  test('should show the version', async () => {
    const run = jest.fn()
    console.log = jest.fn()
    await runCli(cli('hypergraph').version('1.0').help().handle(run), ['--version'])
    expect(run).not.toHaveBeenCalled()
    expect(console.log).toHaveBeenCalledWith('1.0')
  })

  test('should parse options', async () => {
    const run = jest.fn()
    await runCli(
      cli('hypergraph')
        .version('1.0')
        .option(input('dry-run'))
        .option(input('service').string())
        .help()
        .handle(run),
      ['--dry-run', '--service=cdn'],
    )
    expect(run).toHaveBeenCalledWith({ dryRun: true, service: 'cdn' })
  })

  test('should parse value from the position next to option', async () => {
    const run = jest.fn()
    await runCli(
      cli('hypergraph')
        .version('1.0')
        .option(input('dry-run'))
        .option(input('service').string())
        .help()
        .handle(run),
      ['--dry-run', '--service', 'cdn'],
    )
    expect(run).toHaveBeenCalledWith({ dryRun: true, service: 'cdn' })
  })

  test('should parse of a boolean option', async () => {
    const run = jest.fn()
    await runCli(
      cli('hypergraph')
        .version('1.0')
        .option(input('dry-run'))
        .option(input('service').string())
        .help()
        .handle(run),
      ['--dry-run=true'],
    )
    expect(run).toHaveBeenCalledWith({ dryRun: true })
  })

  test('should throw an error if value for an option is missing', async () => {
    const run = jest.fn()
    await expect(() =>
      runCli(
        cli('hypergraph')
          .version('1.0')
          .option(input('dry-run'))
          .option(input('service').string())
          .help()
          .handle(run),
        ['--dry-run', '--service'],
      ),
    ).rejects.toThrow('Missing value for the option "--service"')
  })

  test('should throw an error if value is invalid for an option', async () => {
    const run = jest.fn()
    await expect(() =>
      runCli(
        cli('hypergraph')
          .version('1.0')
          .option(input('dry-run'))
          .option(input('instances').number())
          .help()
          .handle(run),
        ['--dry-run', '--instances', 'x'],
      ),
    ).rejects.toThrow('Invalid value "x" for the input "--instances". You must provide a number')
  })

  test('should throw an error if value for an option is missing', async () => {
    const run = jest.fn()
    await expect(() =>
      runCli(
        cli('hypergraph')
          .version('1.0')
          .option(input('dry-run'))
          .option(input('service').string())
          .help()
          .handle(run),
        ['--service', '--dry-run'],
      ),
    ).rejects.toThrow('Missing value for the option "--service"')
  })

  test('should throw an error if value for an option is missing', async () => {
    const run = jest.fn()
    await expect(() =>
      runCli(
        cli('hypergraph')
          .version('1.0')
          .option(input('dry-run'))
          .option(input('service').string())
          .help()
          .handle(run),
        ['--service='],
      ),
    ).rejects.toThrow('Missing value for the option "--service"')
  })

  test('should throw error if required option is not provided', async () => {
    const run = jest.fn()
    await expect(() =>
      runCli(
        cli('hypergraph')
          .version('1.0')
          .option(input('dry-run'))
          .option(input('service').string().required())
          .help()
          .handle(run),
        [],
      ),
    ).rejects.toThrow('Missing a required input "--service"')
  })

  test('should throw an error if an argument is invalid', async () => {
    const run = jest.fn()
    await expect(() =>
      runCli(
        cli('hypergraph')
          .version('1.0')
          .option(input('dry-run'))
          .option(input('service').string())
          .help()
          .handle(run),
        ['just-an-argument'],
      ),
    ).rejects.toThrow('Invalid argument "just-an-argument')
  })

  test('should throw an error if an option is invalid', async () => {
    const run = jest.fn()
    await expect(() =>
      runCli(
        cli('hypergraph')
          .version('1.0')
          .option(input('dry-run'))
          .option(input('service').string())
          .help()
          .handle(run),
        ['--just-an-option'],
      ),
    ).rejects.toThrow('Invalid option "--just-an-option')
  })

  test('should throw an error if input is not from the list', async () => {
    const run = jest.fn()
    await expect(() =>
      runCli(
        cli('hypergraph')
          .version('1.0')
          .option(input('type').string().options(['string', 'number']).toInput())
          .help()
          .handle(run),
        ['--type=boolean'],
      ),
    ).rejects.toThrow(
      'Invalid value "boolean" for the input "--type". You must provide "string" or "number"',
    )
  })

  test('should parse a command', async () => {
    const run = jest.fn()
    const runInner = jest.fn()
    await runCli(
      cli('hypergraph')
        .version('1.0')
        .command(command('command').description('show a command').handle(runInner))
        .handle(run),
      ['command'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(runInner).toHaveBeenCalledWith({})
  })

  test('should parse a command with options', async () => {
    const run = jest.fn()
    const runInner = jest.fn()
    await runCli(
      cli('hypergraph')
        .version('1.0')
        .command(
          command('command')
            .description('show a command')
            .option(input('dry-run'))
            .option(input('sample'))
            .option(input('instances').number())
            .handle(runInner),
        )
        .handle(run),
      ['command', '--dry-run', '--sample', '--instances=2'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(runInner).toHaveBeenCalledWith({
      dryRun: true,
      sample: true,
      instances: 2,
    })
  })

  test('should show help', async () => {
    const run = jest.fn()
    const help = await runCli(
      cli('hypergraph')
        .version('1.0')
        .argument(input('command').description('show a command').toInput())
        .help()
        .handle(run),
      ['--help'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(trim(help)).toEqual(
      trim(`
      hypergraph   [command] [--version] [--help]

      ARGUMENTS

      command     show a command

      OPTIONS

      --version   Show version

      --help      Show help
    `),
    )
  })

  test('should show help of a subcommand', async () => {
    const run = jest.fn()
    const runInner = jest.fn()
    const help = await runCli(
      cli('hypergraph')
        .version('1.0')
        .help()
        .command(
          command('command')
            .description('show a command')
            .option(input('dry-run').description('Do a dry run'))
            .option(input('sample').description('Sample input'))
            .option(input('instances').number().description('Number of instances'))
            .handle(runInner)
            .toCommand(),
        )
        .handle(run),
      ['command', '--help'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(runInner).not.toHaveBeenCalled()
    expect(trim(help)).toEqual(
      trim(`
      hypergraph command   [--version] [--help] [--dry-run] [--sample] [--instances]

      OPTIONS

      --version              Show version

      --help                 Show help

      --dry-run              Do a dry run

      --sample               Sample input

      --instances=<number>   Number of instances
    `),
    )
  })
})