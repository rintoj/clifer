import { cli, input, runCli } from '..'

// Demonstrates all input types, modifiers, and type-safe props.

enum Environment {
  Local = 'local',
  Dev = 'dev',
  Staging = 'staging',
  Prod = 'prod',
}

enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

interface Props {
  name: string
  service: string
  instances: number
  environment: Environment
  logLevel: LogLevel
  tags: string[]
  port: number
  verbose: boolean
  dryRun: boolean
}

async function run(props: Props) {
  console.log({ props })
}

const program = cli<Props>('deploy')
  .version('2.0.0')

  // --- Positional argument ---
  // Required string argument: deploy <name>
  .argument(input('name').description('Name of the deployment').string().required())

  // --- String options ---
  // Required string option: --service=<string>
  .option(input('service').description('Target service name').string().required())

  // String option with choices and default: --environment=[local|dev|staging|prod]
  .option(
    input('environment')
      .description('Target environment')
      .string()
      .required()
      .choices([Environment.Local, Environment.Dev, Environment.Staging, Environment.Prod])
      .default(Environment.Dev),
  )

  // String option with choices: --log-level=[debug|info|warn|error]
  .option(
    input('logLevel')
      .description('Log level')
      .string()
      .choices([LogLevel.Debug, LogLevel.Info, LogLevel.Warn, LogLevel.Error]),
  )

  // String option with .many() for comma-separated values: --tags=a,b,c
  .option(input('tags').description('Deployment tags (comma-separated)').string().many())

  // --- Number options ---
  // Number option: --instances=<number>
  .option(input('instances').description('Number of instances to run').number())

  // Number option with choices: --port=[3000|4000|5000|8080]
  .option(input('port').description('Port number').number().choices([3000, 4000, 5000, 8080]))

  // --- Boolean options ---
  // Boolean flag: --verbose
  .option(input('verbose').description('Enable verbose output'))

  // Boolean flag: --dry-run
  .option(input('dryRun').description('Preview changes without deploying'))

  // --- Handler ---
  .handle(run)

void runCli(program)
