# Clifer Usage Guide

This guide provides comprehensive usage examples and patterns for the Clifer CLI framework. It follows the llms.txt standard for LLM-friendly documentation.

## Quick Reference

```typescript
import { cli, command, input, prompt, runCli, CliExpectedError } from 'clifer'
```

## Common Usage Patterns

### 1. Simple CLI Application

```typescript
import { cli, input, runCli } from 'clifer'

interface Props {
  name: string
  greeting?: string
}

const program = cli<Props>('greet')
  .version('1.0.0')
  .description('A greeting CLI')
  .argument(input('name').description('Your name').string().required())
  .option(input('greeting').description('Custom greeting').string().default('Hello'))
  .handle(async ({ name, greeting }) => {
    console.log(`${greeting}, ${name}!`)
  })

runCli(program)
```

**Usage:**
```bash
greet John              # Output: Hello, John!
greet John --greeting Hi # Output: Hi, John!
greet --help            # Shows help information
```

### 2. CLI with Subcommands

```typescript
import { cli, command, input, runCli } from 'clifer'

// Define types
interface FileProps {
  path: string
  content: string
}

interface ListProps {
  dir?: string
  all?: boolean
}

// Create command
const createFile = command<FileProps>('create')
  .description('Create a new file')
  .argument(input('path').string().required())
  .argument(input('content').string().required())
  .handle(async ({ path, content }) => {
    // File creation logic
    console.log(`Creating file: ${path}`)
  })

// List command
const listFiles = command<ListProps>('list')
  .description('List files')
  .option(input('dir').string().default('.'))
  .option(input('all').description('Show hidden files'))
  .handle(async ({ dir, all }) => {
    console.log(`Listing files in ${dir}`)
    if (all) console.log('Including hidden files')
  })

// Main CLI
const program = cli('files')
  .version('1.0.0')
  .description('File manager')
  .command(createFile)
  .command(listFiles)

runCli(program)
```

**Usage:**
```bash
files create config.json '{"name":"app"}'
files list --dir /tmp --all
```

### 3. Interactive Prompts

```typescript
import { cli, input, prompt, runCli } from 'clifer'

const program = cli('init')
  .description('Initialize a new project')
  .handle(async () => {
    const config = await prompt(
      input('name').prompt('Project name?').string().required(),
      input('description').prompt('Description?').string(),
      input('author').prompt('Author name?').string().required(),
      input('license').prompt('License?').string().choices(['MIT', 'Apache-2.0', 'GPL-3.0']).default('MIT'),
      input('typescript').prompt('Use TypeScript?').boolean(),
      input('git').prompt('Initialize git repository?').boolean()
    )
    
    console.log('Project configuration:', config)
  })

runCli(program)
```

### 4. Validating Input

```typescript
import { cli, input, runCli, CliExpectedError } from 'clifer'

interface Props {
  email: string
  port?: number
  url?: string
}

const program = cli<Props>('validate')
  .description('Input validation example')
  .argument(
    input('email')
      .string()
      .required()
      .validate((value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          throw new CliExpectedError('Invalid email format')
        }
        return value
      })
  )
  .option(
    input('port')
      .number()
      .validate((value) => {
        if (value < 1 || value > 65535) {
          throw new CliExpectedError('Port must be between 1 and 65535')
        }
        return value
      })
  )
  .option(
    input('url')
      .string()
      .validate((value) => {
        try {
          new URL(value)
          return value
        } catch {
          throw new CliExpectedError('Invalid URL format')
        }
      })
  )
  .handle(async (props) => {
    console.log('Valid inputs:', props)
  })

runCli(program)
```

### 5. Loading Configuration

```typescript
import { cli, input, runCli } from 'clifer'
import { readFile } from 'fs/promises'
import { homedir } from 'os'
import { join } from 'path'

interface Config {
  apiKey?: string
  endpoint?: string
  timeout?: number
}

const program = cli<Config>('api-client')
  .version('1.0.0')
  .option(input('apiKey').string())
  .option(input('endpoint').string())
  .option(input('timeout').number())
  .load(async (props) => {
    // Try to load config from file
    try {
      const configPath = join(homedir(), '.api-client.json')
      const content = await readFile(configPath, 'utf-8')
      const fileConfig = JSON.parse(content)
      
      // CLI args override file config
      return { ...fileConfig, ...props }
    } catch {
      // No config file, use defaults
      return {
        endpoint: 'https://api.example.com',
        timeout: 5000,
        ...props
      }
    }
  })
  .handle(async ({ apiKey, endpoint, timeout }) => {
    if (!apiKey) {
      throw new CliExpectedError('API key required. Set via --apiKey or in ~/.api-client.json')
    }
    
    console.log(`Connecting to ${endpoint} with timeout ${timeout}ms`)
  })

runCli(program)
```

### 6. Complex Nested Commands

```typescript
import { cli, command, input, runCli } from 'clifer'

// Database commands
const dbCreate = command<{ name: string }>('create')
  .description('Create database')
  .argument(input('name').string().required())
  .handle(async ({ name }) => {
    console.log(`Creating database: ${name}`)
  })

const dbDrop = command<{ name: string; force?: boolean }>('drop')
  .description('Drop database')
  .argument(input('name').string().required())
  .option(input('force').description('Skip confirmation'))
  .handle(async ({ name, force }) => {
    if (!force) {
      const { confirm } = await prompt(
        input('confirm').prompt(`Drop database "${name}"?`).boolean()
      )
      if (!confirm) return
    }
    console.log(`Dropping database: ${name}`)
  })

const dbCommand = command('db')
  .description('Database operations')
  .command(dbCreate)
  .command(dbDrop)

// User commands
const userCreate = command<{ username: string; email: string; admin?: boolean }>('create')
  .description('Create user')
  .argument(input('username').string().required())
  .argument(input('email').string().required())
  .option(input('admin').description('Grant admin privileges'))
  .handle(async ({ username, email, admin }) => {
    console.log(`Creating user: ${username} (${email})`)
    if (admin) console.log('Granting admin privileges')
  })

const userCommand = command('user')
  .description('User management')
  .command(userCreate)

// Main CLI
const program = cli('app')
  .version('1.0.0')
  .description('Application manager')
  .command(dbCommand)
  .command(userCommand)

runCli(program)
```

**Usage:**
```bash
app db create mydb
app db drop mydb --force
app user create john john@example.com --admin
```

### 7. Different Input Types

```typescript
import { cli, input, runCli } from 'clifer'

enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

interface Props {
  // String with choices
  environment: string
  // Number with validation
  workers?: number
  // Boolean flags
  verbose?: boolean
  watch?: boolean
  // Enum type
  logLevel?: LogLevel
  // Array type (multiple values)
  tags?: string[]
}

const program = cli<Props>('server')
  .description('Server configuration example')
  .argument(
    input('environment')
      .string()
      .required()
      .choices(['development', 'staging', 'production'])
  )
  .option(
    input('workers')
      .description('Number of worker processes')
      .number()
      .default(4)
      .validate(n => n > 0 ? n : 1)
  )
  .option(
    input('verbose')
      .description('Enable verbose logging')
      .alias('v')
  )
  .option(
    input('watch')
      .description('Watch for file changes')
      .alias('w')
  )
  .option(
    input('logLevel')
      .description('Logging level')
      .string()
      .choices(Object.values(LogLevel))
      .default(LogLevel.INFO)
  )
  .handle(async (props) => {
    console.log('Server configuration:', props)
  })

runCli(program)
```

**Usage:**
```bash
server production --workers 8 -v --log-level debug
```

### 8. Error Handling Patterns

```typescript
import { cli, input, runCli, CliExpectedError } from 'clifer'
import { readFile } from 'fs/promises'

interface Props {
  file: string
  encoding?: string
}

const program = cli<Props>('read')
  .description('Read file contents')
  .argument(input('file').string().required())
  .option(input('encoding').string().default('utf-8'))
  .handle(async ({ file, encoding }) => {
    try {
      const content = await readFile(file, encoding as BufferEncoding)
      console.log(content)
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        throw new CliExpectedError(`File not found: ${file}`)
      }
      if (error.code === 'EACCES') {
        throw new CliExpectedError(`Permission denied: ${file}`)
      }
      // Unexpected errors will show stack trace
      throw error
    }
  })

// Global error handling
runCli(program).catch((error) => {
  if (error instanceof CliExpectedError) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
  
  // Unexpected errors
  console.error('Unexpected error:', error)
  process.exit(1)
})
```

### 9. Progress and Spinner

```typescript
import { cli, input, runCli } from 'clifer'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const program = cli('process')
  .description('Long running process')
  .argument(input('count').number().required())
  .handle(async ({ count }) => {
    console.log(`Processing ${count} items...`)
    
    for (let i = 1; i <= count; i++) {
      // Clear line and show progress
      process.stdout.write(`\rProgress: ${i}/${count} (${Math.round(i/count * 100)}%)`)
      await delay(100)
    }
    
    console.log('\n✅ Processing complete!')
  })

runCli(program)
```

### 10. Testing CLI Commands

```typescript
// cli.ts
export function createProgram() {
  return cli<{ name: string }>('greet')
    .argument(input('name').string().required())
    .handle(async ({ name }) => {
      console.log(`Hello, ${name}!`)
    })
}

if (require.main === module) {
  runCli(createProgram())
}

// cli.test.ts
import { createProgram } from './cli'

describe('greet command', () => {
  let consoleSpy: jest.SpyInstance
  
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  })
  
  afterEach(() => {
    consoleSpy.mockRestore()
  })
  
  it('should greet the user', async () => {
    const program = createProgram()
    const handler = program.getHandler()
    
    await handler({ name: 'John' })
    
    expect(consoleSpy).toHaveBeenCalledWith('Hello, John!')
  })
})
```

## Common Recipes

### Recipe: Git-style CLI

```typescript
const program = cli('git')
  .version('2.0.0')
  .command(
    command('init')
      .description('Initialize repository')
      .option(input('bare').description('Create bare repository'))
      .handle(async ({ bare }) => {
        console.log(`Initializing ${bare ? 'bare ' : ''}repository`)
      })
  )
  .command(
    command<{ message: string; amend?: boolean }>('commit')
      .description('Commit changes')
      .option(input('message').string().required().alias('m'))
      .option(input('amend').description('Amend previous commit'))
      .handle(async ({ message, amend }) => {
        console.log(`Committing: ${message}`)
        if (amend) console.log('Amending previous commit')
      })
  )
```

### Recipe: Environment-based Configuration

```typescript
const program = cli('app')
  .load(async () => {
    return {
      apiUrl: process.env.API_URL || 'https://api.example.com',
      apiKey: process.env.API_KEY,
      debug: process.env.DEBUG === 'true'
    }
  })
```

### Recipe: Multi-file Organization

```typescript
// commands/deploy.ts
export const deployCommand = command<{ environment: string }>('deploy')
  .argument(input('environment').string().required())
  .handle(async ({ environment }) => {
    console.log(`Deploying to ${environment}`)
  })

// commands/build.ts
export const buildCommand = command<{ watch?: boolean }>('build')
  .option(input('watch').alias('w'))
  .handle(async ({ watch }) => {
    console.log(`Building${watch ? ' in watch mode' : ''}`)
  })

// cli.ts
import { deployCommand } from './commands/deploy'
import { buildCommand } from './commands/build'

const program = cli('myapp')
  .version('1.0.0')
  .command(deployCommand)
  .command(buildCommand)

runCli(program)
```

## Best Practices

1. **Always define TypeScript interfaces** for your props
2. **Use descriptive names** for commands and options
3. **Provide help text** for all inputs and commands
4. **Handle errors gracefully** with CliExpectedError
5. **Validate user input** to prevent runtime errors
6. **Use async/await** for asynchronous operations
7. **Organize complex CLIs** into separate command files
8. **Test your commands** by separating logic from CLI setup
9. **Use environment variables** for sensitive configuration
10. **Follow semantic versioning** for your CLI version

## Troubleshooting

### Issue: Command not found
Ensure your package.json has the correct `bin` field and the file is executable.

### Issue: TypeScript errors
Make sure all props interfaces match the inputs defined in your commands.

### Issue: Prompts not working
Interactive prompts require a TTY. They won't work in non-interactive environments.

### Issue: Options not parsing correctly
Check that option names don't conflict and use proper casing (kebab-case).

## License

MIT