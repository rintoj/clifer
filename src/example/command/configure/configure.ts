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
  awsAccountId: string
  awsAccessKey: string
  awsSecret: string
  awsRegion: string
  environment: Environment
  cloud: CloudProvider
}

async function run(props: Props) {
  console.log({ props })
}

export default command<Props>('configure')
  .description('Configure environment for this project')
  .option(input('environment').description('Environment').string().required().options(ENVIRONMENTS))
  .option(input('cloud').description('Cloud provider').string().options(CLOUD_PROVIDER))
  .option(input('aws-account-id').description('AWS account id').string())
  .option(input('aws-access-key').description('AWS account access key').string())
  .option(input('aws-secret').description('AWS account access secret').string())
  .option(input('aws-region').description('AWS region').string())
  .handle(run)
