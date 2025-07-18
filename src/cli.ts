import { cli } from './cli-builder'
import { runCli } from './cli-runner'
import initCommand from './commands/init.command'

const program = cli('clifer').version('0.1').command(initCommand)

runCli(program).catch(e => console.error(e))
