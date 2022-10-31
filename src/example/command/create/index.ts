import { command } from '../../..'
import createModel from './create-model'
import createRepository from './create-repository'
import createSchema from './create-schema'

export default command('create')
  .description('Create backend modules')
  .command(createModel)
  .command(createRepository)
  .command(createSchema)
