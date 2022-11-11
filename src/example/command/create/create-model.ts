import { command, input } from '../../..'

enum Type {
  ts = 'ts',
  js = 'js',
}

interface Props {
  name: string
  type?: Type
  dryRun?: boolean
}

function run(props: Props) {
  console.log({ props })
}

export default command<Props>('model')
  .description('Create a model')
  .argument(input('name').description('Name of the model').string().required())
  .option(input('type').description('Type of the model').string().choices([Type.ts, Type.js]))
  .handle(run)
