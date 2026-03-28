import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { command, input } from '../../..'

// Demonstrates: subcommands with .load() for async config, .prompt() for interactive
// inputs, .choices(), .default(), .required(), and mixed string/number options.

enum Environment {
  Local = 'local',
  Dev = 'dev',
  Prod = 'prod',
}

enum CloudProvider {
  Aws = 'aws',
  GCloud = 'gcloud',
  Azure = 'azure',
}

const ENV_FILE = resolve(__dirname, '..', '..', '..', '..', 'env.json')

interface Props {
  name: string
  environment: Environment
  cloud: CloudProvider
  awsAccountId: string
  awsAccessKey: string
  awsSecret: string
  awsRegion: string
  localPort: number
}

async function loadFromEnv() {
  try {
    return JSON.parse(readFileSync(ENV_FILE, { encoding: 'utf-8' }).toString())
  } catch (_e) {
    return {} as any
  }
}

async function run(props: Props) {
  console.log({ props })
  writeFileSync(ENV_FILE, JSON.stringify(props, null, 2), { encoding: 'utf-8' })
}

export default command<Props>('configure')
  .description('Configure environment for this project')

  // Positional argument with prompt fallback
  .argument(input('name').description('Project name').string().prompt())

  // Required string with choices, default, and prompt
  .option(
    input('environment')
      .description('Target environment')
      .string()
      .required()
      .choices([Environment.Local, Environment.Dev, Environment.Prod])
      .default(Environment.Dev)
      .prompt(),
  )

  // String with choices (no prompt — CLI-only)
  .option(
    input('cloud')
      .description('Cloud provider')
      .string()
      .choices([CloudProvider.Aws, CloudProvider.GCloud, CloudProvider.Azure]),
  )

  // String options with prompt fallback
  .option(input('awsAccountId').description('AWS account ID').string().prompt())
  .option(input('awsAccessKey').description('AWS access key').string())
  .option(input('awsSecret').description('AWS secret key').string())
  .option(input('awsRegion').description('AWS region').string())

  // Number with choices and prompt
  .option(
    input('localPort')
      .description('Local port for the service')
      .number()
      .choices([3000, 4000, 4001, 4002, 8080])
      .prompt(),
  )

  // Async config loader — pre-fills values from env.json
  .load(loadFromEnv)

  .handle(run)
