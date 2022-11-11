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
  awsAccountId: string
  awsAccessKey: string
  awsSecret?: string
  awsRegion?: string
  name?: string
  localPort?: number
}

async function run(props: Props) {
  console.log({ props })
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
  .handle(run)
