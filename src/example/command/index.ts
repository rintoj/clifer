import { cli, runCli } from '../..'
import { input } from '../../cli-input-builder'
import configureCommand from './configure/configure'
import createCommand from './create'
import indexCommand from './index/index'

const program = cli('builder')
  .version('1.0')
  .command(configureCommand)
  .command(createCommand)
  .command(indexCommand)
  .option(input('dry-run').description('Execute a sample run'))

runCli(program).catch((e: any) => console.error(e))
