import { command, input } from '../../..'

// Demonstrates: a leaf subcommand with argument, choices, and boolean flag.

enum Language {
  TypeScript = 'ts',
  JavaScript = 'js',
}

interface Props {
  name: string
  type: Language
  dryRun: boolean
}

async function run(props: Props) {
  console.log({ props })
}

export default command<Props>('model')
  .description('Create a model')
  .argument(input('name').description('Name of the model').string().required())
  .option(
    input('type')
      .description('Language type')
      .string()
      .choices([Language.TypeScript, Language.JavaScript]),
  )
  .option(input('dryRun').description('Preview without creating files'))
  .handle(run)
