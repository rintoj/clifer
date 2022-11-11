import { cli, runCli } from '../..'
import { input } from '../../cli-input-builder'
import configureCommand from './configure/configure'
import createCommand from './create'
import indexCommand from './index/index'

interface Props {
  dryRun?: boolean
}

const program = cli<Props>('builder')
  .version('1.0')
  .command(configureCommand)
  .command(createCommand)
  .command(indexCommand)
  .option(input('dryRun').description('Execute a sample run'))

runCli(program).catch((e: any) => console.error(e))
