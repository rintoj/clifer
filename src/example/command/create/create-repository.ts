import { command, input } from '../../..'

// Demonstrates: a subcommand with number option and default value.

interface Props {
  name: string
  maxConnections: number
}

async function run(props: Props) {
  console.log({ props })
}

export default command<Props>('repository')
  .description('Create a repository')
  .argument(input('name').description('Name of the repository').string().required())
  .option(input('maxConnections').description('Max DB connections').number().default(10))
  .handle(run)
