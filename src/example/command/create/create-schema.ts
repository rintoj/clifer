import { command, input } from '../../..'

// Demonstrates: .many() for accepting multiple comma-separated values.

interface Props {
  name: string
  fields: string[]
}

async function run(props: Props) {
  console.log({ props })
}

export default command<Props>('schema')
  .description('Create a database schema')
  .argument(input('name').description('Name of the schema').string().required())
  .option(input('fields').description('Field names (comma-separated)').string().many())
  .handle(run)
