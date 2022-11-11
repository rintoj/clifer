import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { command, input } from '../../..'

enum Environment {
  Local = 'local',
  Dev = 'dev',
  Prod = 'prod',
}

enum CloudProvider {
  Aws = 'aws',
  GCloud = 'gcloud',
}

const ENVIRONMENTS = [Environment.Local, Environment.Dev, Environment.Prod]
const CLOUD_PROVIDER = [CloudProvider.Aws, CloudProvider.GCloud]
const ENV_FILE = resolve(__dirname, '..', '..', '..', '..', 'env.json')

interface Props {
  environment: Environment
  cloud?: CloudProvider
  awsAccountId: string
  awsAccessKey: string
  awsSecret?: string
  awsRegion?: string
  name?: string
  localPort?: number
}

async function loadFromEnv() {
  try {
    return JSON.parse(readFileSync(ENV_FILE, { encoding: 'utf-8' }).toString())
  } catch (e) {
    return {} as any
  }
}

async function run(props: Props) {
  console.log({ props })
  writeFileSync(ENV_FILE, JSON.stringify(props, null, 2), { encoding: 'utf-8' })
}

export default command<Props>('configure')
  .description('Configure environment for this project')
  .argument(input('name').description('Project name').string().prompt())
  .option(
    input('environment')
      .description('Environment')
      .string()
      .required()
      .choices(ENVIRONMENTS)
      .default(Environment.Dev)
      .prompt(),
  )
  .option(input('cloud').description('Cloud provider').string().choices(CLOUD_PROVIDER))
  .option(input('awsAccountId').description('AWS account id').string().prompt())
  .option(input('awsAccessKey').description('AWS account access key').string())
  .option(input('awsSecret').description('AWS account access secret').string())
  .option(input('awsRegion').description('AWS region').string())
  .option(
    input('localPort')
      .description('Local port for starting up the service')
      .number()
      .choices([4000, 4001, 4002])
      .prompt(),
  )
  .load(loadFromEnv)
  .handle(run)
