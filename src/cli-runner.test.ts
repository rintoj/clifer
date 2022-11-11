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
  red: (a: string) => a,
}))

describe('cli', () => {
  test('should run a simple cli', async () => {
    const run = jest.fn()
    await runCli(cli('mycli').version('1.0').handle(run), [])
    expect(run).toHaveBeenCalledWith({})
  })

  test('should show the version', async () => {
    const run = jest.fn()
    console.log = jest.fn()
    await runCli(cli('mycli').version('1.0').handle(run), ['--version'])
    expect(run).not.toHaveBeenCalled()
    expect(console.log).toHaveBeenCalledWith('1.0')
  })

  test('should parse options', async () => {
    const run = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .option(input('dryRun'))
        .option(input('service').string())
        .handle(run),
      ['--dry-run', '--service=cdn'],
    )
    expect(run).toHaveBeenCalledWith({ dryRun: true, service: 'cdn' })
  })

  test('should parse positional arguments', async () => {
    const run = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .argument(input('name').string())
        .option(input('dryRun'))
        .option(input('service').string())
        .handle(run),
      ['test'],
    )
    expect(run).toHaveBeenCalledWith({ name: 'test' })
  })

  test('should parse multiple positional arguments', async () => {
    const run = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .argument(input('name').string())
        .argument(input('category').string())
        .argument(input('type').string())
        .option(input('dryRun'))
        .option(input('service').string())
        .handle(run),
      ['test', 'category1', 'type1'],
    )
    expect(run).toHaveBeenCalledWith({ name: 'test', category: 'category1', type: 'type1' })
  })

  test('should throw an error if a required argument is missing', async () => {
    const run = jest.fn()
    console.error = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .argument(input('name').string())
        .argument(input('category').string())
        .argument(input('type').string().required())
        .option(input('dryRun'))
        .option(input('service').string())
        .handle(run),
      ['test', 'category1'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(console.error).not.toHaveBeenCalledWith(`Error: Missing required argument "<type>"`)
  })

  test('should parse value from the position next to option', async () => {
    const run = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .option(input('dryRun'))
        .option(input('service').string())
        .handle(run),
      ['--dry-run', '--service', 'cdn'],
    )
    expect(run).toHaveBeenCalledWith({ dryRun: true, service: 'cdn' })
  })

  test('should parse of a boolean option', async () => {
    const run = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .option(input('dryRun'))
        .option(input('service').string())
        .handle(run),
      ['--dry-run=true'],
    )
    expect(run).toHaveBeenCalledWith({ dryRun: true })
  })

  test('should throw an error if value for an option is missing', async () => {
    const run = jest.fn()
    console.error = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .option(input('dryRun'))
        .option(input('service').string())
        .handle(run),
      ['--dry-run', '--service'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith(
      '\nError: Missing value for the option "--service"\n',
    )
  })

  test('should throw an error if value is invalid for an option', async () => {
    const run = jest.fn()
    console.error = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .option(input('dryRun'))
        .option(input('instances').number())
        .handle(run),
      ['--dry-run', '--instances', 'x'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith(
      '\nError: Invalid value "x" for the input "--instances". You must provide a number\n',
    )
  })

  test('should throw an error if value for an option is missing', async () => {
    const run = jest.fn()
    console.error = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .option(input('dryRun'))
        .option(input('service').string())
        .handle(run),
      ['--service', '--dry-run'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith(
      '\nError: Missing value for the option "--service"\n',
    )
  })

  test('should throw an error if value for an option is missing', async () => {
    const run = jest.fn()
    console.error = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .option(input('dryRun'))
        .option(input('service').string())
        .handle(run),
      ['--service='],
    )
    expect(run).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith(
      '\nError: Missing value for the option "--service"\n',
    )
  })

  test('should throw error if required option is not provided', async () => {
    const run = jest.fn()
    console.error = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .option(input('dryRun'))
        .option(input('service').string().required())
        .handle(run),
      [],
    )
    expect(console.error).toHaveBeenCalledWith(`\nError: Missing a required input "--service"\n`)
  })

  test('should throw an error if an argument is invalid', async () => {
    const run = jest.fn()
    console.error = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .option(input('dryRun'))
        .option(input('service').string())
        .handle(run),
      ['just-an-argument'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith('\nError: Invalid argument "just-an-argument"\n')
  })

  test('should throw an error if an option is invalid', async () => {
    const run = jest.fn()
    console.error = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .option(input('dryRun'))
        .option(input('service').string())
        .handle(run),
      ['--just-an-option'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith('\nError: Invalid option "--just-an-option"\n')
  })

  test('should throw an error if input is not from the list', async () => {
    const run = jest.fn()
    console.error = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .option(input('type').string().choices(['string', 'number']).toInput())
        .handle(run),
      ['--type=boolean'],
    )

    expect(run).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith(
      '\nError: Invalid value "boolean" for the input "--type". You must provide "string" or "number"\n',
    )
  })

  test('should throw an error if required argument is not provided', async () => {
    const run = jest.fn()
    console.error = jest.fn()
    await runCli(
      cli<any>('mycli').version('1.0').argument(input('package').string().required()).handle(run),
      [],
    )
    expect(run).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith(`\nError: Missing a required argument "<package>"\n`)
  })

  test('should throw an error if a second argument is not provided', async () => {
    const run = jest.fn()
    console.error = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .argument(input('package').string().required())
        .argument(input('name').string().required())
        .handle(run),
      ['package1'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith(`\nError: Missing a required argument "<name>"\n`)
  })

  test('should throw an error if a command is missing handler', async () => {
    const run = jest.fn()
    console.error = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .argument(input('package').string().required())
        .argument(input('name').string()),
      ['package1'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith(`\nError: Command "mycli" is missing a handler\n`)
  })

  test('should parse a command', async () => {
    const run = jest.fn()
    const runInner = jest.fn()
    await runCli(
      cli('mycli')
        .version('1.0')
        .command(command('command').description('show a command').handle(runInner))
        .handle(run),
      ['command'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(runInner).toHaveBeenCalledWith({})
  })

  test('should parse a second command', async () => {
    const run = jest.fn()
    const runCommand1 = jest.fn()
    const runCommand2 = jest.fn()
    await runCli(
      cli('mycli')
        .version('1.0')
        .command(command('command1').description('show a command').handle(runCommand1))
        .command(command('command2').description('show a command').handle(runCommand2))
        .handle(run),
      ['command2'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(runCommand1).not.toHaveBeenCalledWith({})
    expect(runCommand2).toHaveBeenCalledWith({})
  })

  test('should parse a command with options', async () => {
    const run = jest.fn()
    const runInner = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .command(
          command<any>('command')
            .description('show a command')
            .option(input('sample'))
            .option(input('instances').number())
            .handle(runInner),
        )
        .option(input('dryRun'))
        .handle(run),
      ['command', '--sample', '--instances=2'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(runInner).toHaveBeenCalledWith({
      sample: true,
      instances: 2,
    })
  })

  test('should parse a command that has option with default value', async () => {
    const run = jest.fn()
    const runInner = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .command(
          command<any>('command')
            .description('show a command')
            .option(input('sample'))
            .option(input('instances').number().default(1))
            .handle(runInner),
        )
        .handle(run),
      ['command', '--sample'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(runInner).toHaveBeenCalledWith({
      sample: true,
      instances: 1,
    })
  })

  test("should override an option's default value with the given value", async () => {
    const run = jest.fn()
    const runInner = jest.fn()
    await runCli(
      cli<any>('mycli')
        .version('1.0')
        .command(
          command<any>('command')
            .description('show a command')
            .option(input('sample'))
            .option(input('instances').number().default(1))
            .handle(runInner),
        )
        .handle(run),
      ['command', '--sample', '--instances=10'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(runInner).toHaveBeenCalledWith({
      sample: true,
      instances: 10,
    })
  })

  test('should show help', async () => {
    const run = jest.fn()
    const help = await runCli(
      cli<any>('mycli')
        .version('1.0')
        .argument(input('command').description('show a command').toInput())
        .handle(run),
      ['--help'],
    )
    expect(run).not.toHaveBeenCalled()
    expect(trim(help)).toEqual(
      trim(`
      mycli   [command] [--help] [--version]

      ARGUMENTS

      command     show a command

      OPTIONS

      --help      Show help

      --version   Show version
    `),
    )
  })

  test('should show help of a subcommand', async () => {
    const run = jest.fn()
    const runInner = jest.fn()
    const help = await runCli(
      cli<any>('mycli')
        .version('1.0')
        .command(
          command<any>('command')
            .description('show a command')
            .option(input('dryRun').description('Do a dry run'))
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
      mycli command   [--dry-run] [--sample] [--instances=<number>] [--help] [--version]

      OPTIONS

      --dry-run              Do a dry run

      --sample               Sample input

      --instances=<number>   Number of instances

      --help                 Show help

      --version              Show version
    `),
    )
  })
})
