import { cli } from './cli-builder'
import { runCli } from './cli-runner'
import command from './commands/command/command'
import initCommand from './commands/init.command'

const program = cli('clifer').version('0.1').command(initCommand).command(command)

runCli(program).catch(e => console.error(e))
