import { cli, input, runCli } from '../..'
import configureCommand from './configure/configure'
import createCommand from './create'
import indexCommand from './index/index'

// Demonstrates: nested subcommands, shared global options, and multi-command CLI.
// Usage:
//   builder configure           — interactive project configuration
//   builder create model <name> — create a model (nested subcommand)
//   builder create schema <name> --fields=id,name,email
//   builder create repository <name> --max-connections=20
//   builder index <name>        — create a database index
//   builder --dry-run <command> — global flag inherited by all commands

interface Props {
  dryRun?: boolean
}

const program = cli<Props>('builder')
  .version('1.0')
  .command(configureCommand)
  .command(createCommand)
  .command(indexCommand)
  .option(input('dryRun').description('Execute a dry run across all commands'))

runCli(program).catch((e: any) => console.error(e))
