# clifer

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A light weight library for building beautiful command line interfaces for NodeJS applications

## Install

### Yarn

```sh
yarn add clifer
```

### NPM

```sh
npm install clifer
```

## Usage

```js
import { cli, input, runCli } from 'clifer'

function run(props) {
  // handle the action here
  console.log({ props })
}

const program = cli('create-model')
  // add an option '--version' to the version of the cli
  .version('1.0')

  // add --name=<string>
  .argument(input('name').description('Name of the model').string().required())

  // add --service=<string>
  .option(input('service').description('Name of the service').string().required())

  // add --dry-run flag
  .option(input('dry-run').description('Do a dry run'))

  // handle the command
  .handle(run)

runCli(program).catch(e => console.error(e))
```

## Auto Generated Help

```sh
$ create-model --version
1.0

$ create-model --help

create-model   <name> [--service=<string>] [--dry-run] [--version]
               [--help]

ARGUMENTS

name                 Name of the model

OPTIONS

--service=<string>   Name of the service

--dry-run            Do a dry run

--version            Show version

--help               Show help
```

## TypeScript Support

```ts
import { cli, input, runCli } from 'clifer'

enum Type {
  api = 'api',
  subscriber = 'subscriber',
}

interface Props {
  service: string
  instances?: number
  type?: Type
  dryRun?: boolean
}

function run(props: Props) {
  // handle the action here
  console.log({ props })
}

const program = cli<Props>('create-model')
  // add an option '--version' to the version of the cli
  .version('1.0')

  // add a position input of type string
  .argument(input('name').description('Name of the model').string().required())

  // add --service=<string>
  .option(input('service').description('Name of the service').string().required())

  // add --instances=<number>
  .option(input('instances').description('Number of instances').number())

  // add --type=[api|subscriber]
  .option(
    input('type').description('Type of the model').string().options([Type.api, Type.subscriber]),
  )

  // add --dry-run flag
  .option(input('dry-run').description('Do a dry run'))

  // handle the command
  .handle(run)

runCli(program).catch(e => console.error(e))

/*
$ npx ts-node ./src/example/cli-with-props.ts --help

create-model   <name> [--service=<string>] [--instances=<number>]
               [--type=<api|subscriber>] [--dry-run] [--version]
               [--help]

ARGUMENTS

name                      Name of the model

OPTIONS

--service=<string>        Name of the service

--instances=<number>      Number of instances

--type=<api|subscriber>   Type of the model

--dry-run                 Do a dry run

--version                 Show version

--help                    Show help
/*
```

## Commands

```ts
import { cli, command, input, runCli } from 'clifer'

enum Type {
  ts = 'ts',
  js = 'js',
}

interface CreateCommandProps {
  name: string
  type?: Type
  dryRun?: boolean
}

const createModel = command<CreateCommandProps>('model')
  .description('Create a model')
  .argument(input('name').description('Name of the model').string().required())
  .option(input('type').description('Type of the model').string().options([Type.ts, Type.js]))
  .handle((props: CreateCommandProps) => {
    // handle action
  })

const createRepository = command<CreateCommandProps>('repository')
  .description('Create a repository')
  .argument(input('name').description('Name of the model').string().required())
  .option(input('type').description('Type of the model').string().options([Type.ts, Type.js]))
  .handle((props: CreateCommandProps) => {
    // handle action
  })

const createSchema = command<CreateCommandProps>('schema')
  .description('Create a schema file')
  .argument(input('name').description('Name of the model').string().required())
  .option(input('type').description('Type of the model').string().options([Type.ts, Type.js]))
  .handle((props: CreateCommandProps) => {
    // handle action
  })

const createCommand = command('create')
  .description('Create backend modules')
  .command(createModel)
  .command(createRepository)
  .command(createSchema)

interface IndexCommandProps {
  name: string
  publish?: boolean
  dryRun?: boolean
}

const indexCommand = command<IndexCommandProps>('index')
  .description('Create database index')
  .argument(input('name').description('Name of the file to create').string().required())
  .option(input('publish').description('Should publish index'))
  .handle((props: IndexCommandProps) => {
    // handle action
  })

const program = cli('builder')
  .version('1.0')
  .command(createCommand)
  .command(indexCommand)
  .option(input('dry-run').description('Execute a sample run'))

runCli(program).catch((e: any) => console.error(e))

/*
$ npx ts-node ./src/example/command/index.ts --help

builder   <create|index> [--dry-run] [--version] [--help]

COMMANDS

create      Create backend modules

index       Create database index

OPTIONS

--dry-run   Execute a sample run

--version   Show version

--help      Show help


$ npx ts-node ./src/example/command/index.ts create --help

builder create   <model|repository|schema> [--version] [--help]

COMMANDS

model        Create a model

repository   Create a repository

schema       Create a schema file

OPTIONS

--version    Show version

--help       Show help


$ npx ts-node ./src/example/command/index.ts create model --help

builder create model   <name> [--type=<ts|js>] [--help]

ARGUMENTS

name             Name of the model

OPTIONS

--type=<ts|js>   Type of the model

--help           Show help
*/
```

## Automatic Release

Here is an example of the release type that will be done based on a commit messages:

| Commit message      | Release type          |
| ------------------- | --------------------- |
| fix: [comment]      | Patch Release         |
| feat: [comment]     | Minor Feature Release |
| perf: [comment]     | Major Feature Release |
| doc: [comment]      | No Release            |
| refactor: [comment] | No Release            |
| chore: [comment]    | No Release            |
