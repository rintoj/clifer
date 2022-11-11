import { cli, input, runCli } from '..'

enum Type {
  api = 'api',
  subscriber = 'subscriber',
}

interface Props {
  service: string
  name: string
  instances?: number
  type?: Type
  dryRun?: boolean
}

function run(props: Props) {
  // handle the action here
  console.log({ props })
}

const program = cli<Props>('create-model')
  // add an option '--version' to the version of the cli
  .version('1.0')

  // add a position input of type string
  .argument(input('name').description('Name of the model').string().required())

  // add --service=<string>
  .option(input('service').description('Name of the service').string().required())

  // add --instances=<number>
  .option(input('instances').description('Number of instances').number())

  // add --type=[api|subscriber]
  .option(
    input('type').description('Type of the model').string().choices([Type.api, Type.subscriber]),
  )

  // add --dry-run flag
  .option(input('dryRun').description('Do a dry run'))

  // handle the command
  .handle(run)

void runCli(program)
