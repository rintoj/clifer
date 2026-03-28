import { cli, input, runCli } from '..'

// A minimal CLI with the essentials: version, argument, option, and handler.

interface Props {
  name: string
  dryRun?: boolean
}

async function run(props: Props) {
  console.log({ props })
}

const program = cli<Props>('greet')
  // --version flag
  .version('1.0')

  // positional argument: greet <name>
  .argument(input('name').description('Name of the person to greet').string().required())

  // boolean flag: --dry-run
  .option(input('dryRun').description('Do a dry run without side effects'))

  // handler
  .handle(run)

void runCli(program)
