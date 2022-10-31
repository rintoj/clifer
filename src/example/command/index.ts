import { cli, runCli } from '../..'
import { input } from '../../cli-input-builder'
import createCommand from './create'
import indexCommand from './index/index'

const program = cli('builder')
  .version('1.0')
  .command(createCommand)
  .command(indexCommand)
  .option(input('dry-run').description('Execute a sample run'))

runCli(program).catch((e: any) => console.error(e))
