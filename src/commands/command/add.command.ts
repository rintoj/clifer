import { command } from '../../cli-command-builder'
import { input } from '../../cli-input-builder'

interface Props {
  name: string
}

export default command<Props>('add')
  .description('Add a new command')
  .argument(input('name').description('Name of the command to add').string().required())
  .handle(async ({ name }) => {
    console.log(`Adding command: ${name}`)
    console.log('This is where you would implement the logic to add a new command.')
    console.log('For now, this is just a placeholder.')
  })
