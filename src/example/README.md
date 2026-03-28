# Clifer Examples

Comprehensive examples demonstrating every clifer feature.

## Running Examples

### 1. Simple CLI (`simple-cli.ts`)

```sh
# Show help
bun run src/example/simple-cli.ts --help

# Show version
bun run src/example/simple-cli.ts --version

# Required argument: <name>
bun run src/example/simple-cli.ts John

# Boolean flag: --dry-run
bun run src/example/simple-cli.ts John --dry-run
```

### 2. All Input Types (`cli-with-props.ts`)

```sh
# Show help (lists all options with types, choices, defaults)
bun run src/example/cli-with-props.ts --help

# Required argument + required option
bun run src/example/cli-with-props.ts my-app --service=api

# String with choices: --environment=[local|dev|staging|prod]
bun run src/example/cli-with-props.ts my-app --service=api --environment=prod

# String with choices: --log-level=[debug|info|warn|error]
bun run src/example/cli-with-props.ts my-app --service=api --log-level=debug

# String with .many() (comma-separated): --tags=a,b,c
bun run src/example/cli-with-props.ts my-app --service=api --tags=v2,hotfix,urgent

# Number option: --instances=<number>
bun run src/example/cli-with-props.ts my-app --service=api --instances=3

# Number with choices: --port=[3000|4000|5000|8080]
bun run src/example/cli-with-props.ts my-app --service=api --port=8080

# Boolean flags: --verbose, --dry-run
bun run src/example/cli-with-props.ts my-app --service=api --verbose --dry-run

# All options combined
bun run src/example/cli-with-props.ts my-app \
  --service=api \
  --environment=prod \
  --log-level=warn \
  --tags=v2,hotfix \
  --instances=3 \
  --port=8080 \
  --verbose \
  --dry-run
```

### 3. Interactive Prompts (`prompt.ts`)

```sh
# Runs all prompts interactively (boolean, string, string+choices, number, number+choices, multi-input)
bun run src/example/prompt.ts
```

### 4. Nested Subcommands (`command/index.ts`)

```sh
# Root help — lists all subcommands
bun run src/example/command/index.ts --help

# Root version
bun run src/example/command/index.ts --version

# Global boolean flag: --dry-run (applies to all subcommands)
bun run src/example/command/index.ts --dry-run create model User

# --- configure ---

# Interactive configure (uses .load() to pre-fill from env.json, .prompt() for missing values)
bun run src/example/command/index.ts configure

# Configure with all options
bun run src/example/command/index.ts configure my-project \
  --environment=prod \
  --cloud=aws \
  --aws-account-id=123456 \
  --aws-access-key=AKIA123 \
  --aws-secret=secret123 \
  --aws-region=us-east-1 \
  --local-port=4000

# Configure with choices: --environment=[local|dev|prod]
bun run src/example/command/index.ts configure --environment=dev

# Configure with choices: --cloud=[aws|gcloud|azure]
bun run src/example/command/index.ts configure --cloud=gcloud

# Configure with number choices: --local-port=[3000|4000|4001|4002|8080]
bun run src/example/command/index.ts configure --local-port=8080

# --- create (parent command with nested subcommands) ---

# Create help — lists create subcommands
bun run src/example/command/index.ts create --help

# create model — argument + string choices: --type=[ts|js]
bun run src/example/command/index.ts create model User
bun run src/example/command/index.ts create model User --type=ts
bun run src/example/command/index.ts create model User --type=js --dry-run

# create schema — argument + .many(): --fields=a,b,c
bun run src/example/command/index.ts create schema Order
bun run src/example/command/index.ts create schema Order --fields=id,name,email,createdAt

# create repository — argument + number with default: --max-connections (default: 10)
bun run src/example/command/index.ts create repository UserRepo
bun run src/example/command/index.ts create repository UserRepo --max-connections=20

# --- index ---

# index — argument + boolean flags
bun run src/example/command/index.ts index search-index
bun run src/example/command/index.ts index search-index --publish
bun run src/example/command/index.ts index search-index --publish --dry-run
```

### 5. Output & UI Components (`output.tsx`)

```sh
# Show help
bun run src/example/output.tsx --help

# Print functions demo (printJson, printText, printTextList, printMarkdown, formatAsTable, formatAsList)
bun run src/example/output.tsx print

# Ink UI components demo (Heading, Message, StatusBadge, LabelValue, KeyValueTable, Card, RichTable, ErrorBox)
bun run src/example/output.tsx ui

# render() dispatcher with --format option
bun run src/example/output.tsx render --format=json
bun run src/example/output.tsx render --format=text
bun run src/example/output.tsx render

# CliExpectedError — clean error without stack trace
bun run src/example/output.tsx error

# Run all demos
bun run src/example/output.tsx all
bun run src/example/output.tsx
```

## Example Files

| File | Description |
| --- | --- |
| `simple-cli.ts` | Minimal CLI — version, argument, boolean flag, handler |
| `cli-with-props.ts` | All input types and modifiers with typed props |
| `prompt.ts` | Interactive prompts — boolean, string, number, choices, multi-input |
| `command/index.ts` | Nested subcommands with shared global options |
| `output.tsx` | Output utilities and Ink UI components |

---

## 1. Simple CLI (`simple-cli.ts`)

A minimal CLI with the essentials.

```ts
import { cli, input, runCli } from 'clifer'

const program = cli('greet')
  .version('1.0')
  .argument(input('name').description('Name of the person').string().required())
  .option(input('dryRun').description('Do a dry run'))
  .handle(async props => console.log(props))

void runCli(program)
```

```sh
greet John
greet John --dry-run
greet --help
greet --version
```

---

## 2. All Input Types (`cli-with-props.ts`)

Demonstrates every input modifier with full TypeScript typing.

### String Options

```ts
// Required string argument (positional)
.argument(input('name').description('Name').string().required())

// Required string option
.option(input('service').description('Service name').string().required())

// String with choices and default
.option(
  input('environment')
    .description('Target environment')
    .string()
    .required()
    .choices(['local', 'dev', 'staging', 'prod'])
    .default('dev'),
)

// String with .many() for comma-separated values (--tags=a,b,c)
.option(input('tags').description('Tags').string().many())
```

### Number Options

```ts
// Number option
.option(input('instances').description('Number of instances').number())

// Number with choices
.option(input('port').description('Port').number().choices([3000, 4000, 5000, 8080]))

// Number with default
.option(input('maxConnections').description('Max connections').number().default(10))
```

### Boolean Options

```ts
// Boolean flag (default type — no .string() or .number() needed)
.option(input('verbose').description('Enable verbose output'))
.option(input('dryRun').description('Preview without deploying'))
```

### Input Modifier Summary

| Modifier | Description | Applies To |
| --- | --- | --- |
| `.string()` | Set type to string | all |
| `.number()` | Set type to number | all |
| `.required()` | Mark as required | string, number |
| `.default(value)` | Set default value | all |
| `.choices([...])` | Restrict to specific values | string, number |
| `.many()` | Accept comma-separated values | string, number |
| `.description(text)` | Help text | all |
| `.prompt(message?)` | Enable interactive prompt fallback | all |

```sh
deploy my-app --service=api --environment=prod --instances=3 --port=8080
deploy my-app --service=api --tags=v2,hotfix,urgent --verbose --dry-run
```

---

## 3. Interactive Prompts (`prompt.ts`)

Standalone prompts outside of CLI parsing — useful for wizard-style flows.

```ts
import { input, prompt } from 'clifer'

// Boolean (yes/no)
const { overwrite } = await prompt(
  input('overwrite').description('Overwrite?').prompt('Should overwrite?'),
)

// String
const { projectName } = await prompt(
  input('projectName').string().prompt('Project name?'),
)

// String with autocomplete choices
const { environment } = await prompt(
  input('environment').string().choices(['local', 'dev', 'prod']).prompt('Environment'),
)

// Number
const { port } = await prompt(
  input('port').number().prompt('Port number'),
)

// Number with choices
const { diskSize } = await prompt(
  input('diskSize').number().choices([10, 20, 50, 100]).prompt('Disk size (GB)'),
)

// Multiple prompts at once
const config = await prompt(
  input('firstName').string().prompt(),
  input('lastName').string().prompt(),
  input('role').string().choices(['admin', 'editor', 'viewer']).prompt(),
  input('age').number().prompt(),
  input('newsletter').prompt('Subscribe?'),
)
```

---

## 4. Nested Subcommands (`command/`)

Build multi-level command trees with shared options and async config loading.

### Directory Structure

```
command/
├── index.ts                  # Root CLI: builder
├── configure/
│   └── configure.ts          # builder configure (with .load() and .prompt())
├── create/
│   ├── index.ts              # builder create (parent command)
│   ├── create-model.ts       # builder create model <name>
│   ├── create-schema.ts      # builder create schema <name> --fields=a,b,c
│   └── create-repository.ts  # builder create repository <name>
└── index/
    └── index.ts              # builder index <name>
```

### Root Command with Subcommands

```ts
import { cli, command, input, runCli } from 'clifer'

// Leaf commands
const modelCmd = command('model')
  .description('Create a model')
  .argument(input('name').string().required())
  .handle(async props => console.log(props))

const schemaCmd = command('schema')
  .description('Create a schema')
  .argument(input('name').string().required())
  .option(input('fields').description('Fields').string().many())
  .handle(async props => console.log(props))

// Parent command grouping subcommands
const createCmd = command('create')
  .description('Create modules')
  .command(modelCmd)
  .command(schemaCmd)

// Root CLI
const program = cli('builder')
  .version('1.0')
  .command(createCmd)
  .option(input('dryRun').description('Dry run'))

void runCli(program)
```

```sh
builder create model User
builder create schema Order --fields=id,name,email
builder --help
builder create --help
```

### Async Config Loading with `.load()`

Pre-fill option values from a file, database, or API before parsing:

```ts
import { readFileSync } from 'node:fs'

export default command('configure')
  .description('Configure environment')
  .option(
    input('environment')
      .string()
      .required()
      .choices(['local', 'dev', 'prod'])
      .default('dev')
      .prompt(),
  )
  .option(input('awsAccountId').string().prompt())
  .option(input('localPort').number().choices([3000, 4000, 8080]).prompt())
  .load(async () => {
    try {
      return JSON.parse(readFileSync('env.json', 'utf-8'))
    } catch {
      return {}
    }
  })
  .handle(async props => console.log(props))
```

---

## 5. Output & UI Components (`output.tsx`)

### Print Functions

```ts
import { printJson, printText, printTextList, printMarkdown } from 'clifer'

// JSON output
printJson({ version: '2.4.1', status: 'active' })

// Aligned key-value pairs
printText({ version: '2.4.1', environment: 'production', region: 'us-east-1' })

// Tabular list
printTextList([
  { name: 'api-gateway', status: 'active', port: 8080 },
  { name: 'worker', status: 'inactive', port: 4002 },
])

// Tabular list with selected fields
printTextList(services, ['name', 'status'])

// Rendered markdown with syntax highlighting and tables
printMarkdown(`
# Deploy Summary
| Service | Status |
| --- | --- |
| api-gateway | active |
`)
```

### String Formatters

```ts
import { formatAsTable, formatAsList, printMarkdown } from 'clifer'

// Object → markdown table string
printMarkdown(formatAsTable({ version: '2.4.1', status: 'active' }))

// Array → markdown list table string
printMarkdown(formatAsList(services, ['name', 'status', 'port']))
```

### Ink UI Components

All components render via `renderOnce()` for static (non-interactive) output.

```tsx
import React from 'react'
import {
  Card, ErrorBox, Heading, KeyValueTable,
  LabelValue, Message, RichTable, StatusBadge, renderOnce,
} from 'clifer'

// Heading
await renderOnce(<Heading>Service Dashboard</Heading>)

// Message — success, error, info, warning
await renderOnce(<Message type="success">Deployed successfully</Message>)
await renderOnce(<Message type="error">Connection failed</Message>)
await renderOnce(<Message type="info">Checking health...</Message>)
await renderOnce(<Message type="warning">Memory above 80%</Message>)

// StatusBadge — active, inactive, error, published, draft, completed, archived
await renderOnce(<StatusBadge status="active" />)
await renderOnce(<StatusBadge status="error" />)

// LabelValue — single key-value pair
await renderOnce(<LabelValue label="Region" value="us-east-1" labelWidth={15} />)

// KeyValueTable — bordered key-value display
await renderOnce(<KeyValueTable title="Deploy Info" data={{ version: '2.4.1', status: 'active' }} />)

// Card — bordered content card
await renderOnce(
  <Card title="Summary">
    <Message type="success">All services running</Message>
  </Card>,
)

// RichTable — data table with conditional styling
await renderOnce(
  <RichTable
    data={services}
    columns={[
      { key: 'name', header: 'Service', priority: 1, growable: true, value: s => s.name },
      {
        key: 'status',
        header: 'Status',
        value: s => s.status,
        color: s => (s.status === 'active' ? 'green' : 'red'),
        bold: s => s.status === 'error',
      },
      { key: 'port', header: 'Port', priority: 3, value: s => String(s.port) },
    ]}
  />,
)

// RichTable with pagination
await renderOnce(
  <RichTable
    data={services}
    columns={[
      { key: 'name', header: 'Service', value: s => s.name },
      { key: 'status', header: 'Status', value: s => s.status },
    ]}
    pagination={{ total: 50, hasMore: true, limit: 10, offset: 0 }}
  />,
)

// ErrorBox — prominent error display
await renderOnce(<ErrorBox message="Database unreachable at port 5432" />)
```

### `.format()` and `render()` Dispatcher

Use `.format()` on a command to add a `--format=<default|text|json>` option. It injects a typed `format: OutputFormat` property into your handler props.

```tsx
import React from 'react'
import { cli, input, render, runCli, KeyValueTable } from 'clifer'
import type { FormatProps } from 'clifer'

interface Props extends FormatProps {
  name: string
}

const program = cli<Props>('status')
  .argument(input('name').string().required())
  .format()  // adds --format=<default|text|json> option
  .handle(async (props) => {
    const data = { name: props.name, status: 'active' }
    // render() picks the right output based on props.format
    await render(data, props.format, d => <KeyValueTable title="Status" data={d} />)
  })

void runCli(program)
```

```sh
status my-app                 # default — renders KeyValueTable via Ink
status my-app --format=json   # JSON output
status my-app --format=text   # plain text key-value pairs
```

| Flag | `format` Value | Behavior |
| --- | --- | --- |
| _(none)_ | `'default'` | Renders the Ink component via `renderOnce()` |
| `--format=json` | `'json'` | Calls `printJson(data)` |
| `--format=text` | `'text'` | Calls `printText(data)` or `printTextList(data)` |

### Error Handling

```ts
import { CliExpectedError } from 'clifer'

// Throws a clean error message (no stack trace) — ideal for user-facing errors
throw new CliExpectedError('Service not found. Run `deploy list` to see services.')
```

---

## RichTable Column Reference

| Property | Type | Description |
| --- | --- | --- |
| `key` | `string` | Unique column identifier |
| `header` | `string` | Column header text |
| `value` | `(item, index) => string` | Extract display value from row |
| `priority` | `number` | 1 = essential (never dropped), higher = dropped first when narrow |
| `growable` | `boolean` | Receives extra space when terminal is wide |
| `color` | `string \| (item) => string` | Cell text color (static or conditional) |
| `bold` | `boolean \| (item) => boolean` | Bold cell text (static or conditional) |

## RichTable Pagination Reference

| Property | Type | Description |
| --- | --- | --- |
| `total` | `number` | Total number of items |
| `hasMore` | `boolean` | Whether more pages exist |
| `limit` | `number` | Items per page |
| `offset` | `number` | Current offset |
