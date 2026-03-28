import { command, input } from '../../..'

// Demonstrates: a simple leaf command with argument and boolean flag.

interface Props {
  name: string
  publish?: boolean
  dryRun?: boolean
}

async function run(props: Props) {
  console.log({ props })
}

export default command<Props>('index')
  .description('Create database index')
  .argument(input('name').description('Name of the index file').string().required())
  .option(input('publish').description('Publish the index after creation'))
  .option(input('dryRun').description('Preview without creating'))
  .handle(run)
