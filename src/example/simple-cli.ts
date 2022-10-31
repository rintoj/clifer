import { cli, input, runCli } from '..'

function run(props: any) {
  // handle the action here
  console.log({ props })
}

const program = cli('create-model')
  // add an option '--version' to the version of the cli
  .version('1.0')

  // add --name=<string>
  .argument(input('name').description('Name of the model').string().required())

  // add --service=<string>
  .option(input('service').description('Name of the service').string().required())

  // add --dry-run flag
  .option(input('dry-run').description('Do a dry run'))

  // handle the command
  .handle(run)

void runCli(program)
