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

interface Props {
  environment: Environment
  cloud?: CloudProvider
  awsAccountId?: string
  awsAccessKey?: string
  awsSecret?: string
  awsRegion?: string
}

async function run(props: Props) {
  console.log({ props })
}

export default command<Props>('configure')
  .description('Configure environment for this project')
  .option(input('environment').description('Environment').string().required().options(ENVIRONMENTS))
  .option(input('cloud').description('Cloud provider').string().options(CLOUD_PROVIDER))
  .option(input('awsAccountId').description('AWS account id').string())
  .option(input('awsAccessKey').description('AWS account access key').string())
  .option(input('awsSecret').description('AWS account access secret').string())
  .option(input('awsRegion').description('AWS region').string())
  .handle(run)
