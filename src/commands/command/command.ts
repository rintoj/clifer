import { command } from '../../cli-command-builder'
import addCommand from './add.command'

export default command('command').description('Add or remove a command').command(addCommand)
