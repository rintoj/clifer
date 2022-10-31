import { command, input } from '../../..'

interface Props {
  name: string
  publish?: boolean
  dryRun?: boolean
}

function run(props: Props) {
  console.log({ props })
}

export default command<Props>('index')
  .description('Create database index')
  .argument(input('name').description('Name of the file to create').string().required())
  .option(input('publish').description('Should publish index'))
  .handle(run)
