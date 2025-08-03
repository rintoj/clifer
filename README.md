# Clifer

[![npm version](https://img.shields.io/npm/v/clifer.svg)](https://www.npmjs.com/package/clifer)
[![npm downloads](https://img.shields.io/npm/dm/clifer.svg)](https://www.npmjs.com/package/clifer)
[![license](https://img.shields.io/npm/l/clifer.svg)](https://github.com/rintoj/clifer/blob/master/LICENSE)

A lightweight, type-safe TypeScript library for building beautiful command-line interfaces with zero dependencies.

## ✨ Features

- 🎯 **Type-Safe**: Full TypeScript support with compile-time type checking
- 🔗 **Fluent API**: Chainable, intuitive interface for building CLIs
- 📦 **Zero Dependencies**: Lightweight with no external dependencies
- 🎨 **Interactive Prompts**: Built-in support for user input and confirmations
- 📚 **Auto-Generated Help**: Beautiful help messages without extra configuration
- 🏗️ **Modular Architecture**: Easy organization for complex CLI applications
- ⚡ **Fast & Lightweight**: Minimal overhead for maximum performance

## 📦 Installation

```bash
npm install clifer
# or
yarn add clifer
# or
pnpm add clifer
# or
bun add clifer
```

## 🚀 Quick Start

### Create a Simple CLI

```typescript
import { cli, input, runCli } from 'clifer'

interface Props {
  name: string
  greeting?: string
}

const program = cli<Props>('greet')
  .version('1.0.0')
  .description('A friendly greeting CLI')
  .argument(input('name').description('Your name').string().required())
  .option(input('greeting').description('Custom greeting').string())
  .handle(async (props) => {
    const greeting = props.greeting || 'Hello'
    console.log(`${greeting}, ${props.name}!`)
  })

runCli(program).catch(console.error)
```

### Using the Clifer CLI Tool

Clifer includes a CLI tool to help scaffold new projects:

```bash
# Create a new CLI project
npx clifer init my-cli-app

# Add a new command to existing project
npx clifer command add my-command

# Add a subcommand
npx clifer command add parent/subcommand

# Remove a command
npx clifer command remove my-command
```

## 📖 Core Concepts

### Basic Command Structure

```typescript
import { cli, input, runCli } from 'clifer'

interface Props {
  name: string
  verbose?: boolean
}

const program = cli<Props>('mycli')
  .version('1.0.0')
  .description('My CLI application')
  .argument(input('name').description('Name parameter').string().required())
  .option(input('verbose').description('Enable verbose output'))
  .handle(async (props) => {
    if (props.verbose) {
      console.log('Verbose mode enabled')
    }
    console.log(`Hello, ${props.name}!`)
  })

runCli(program)
```

### Input Types

Clifer supports various input types with full TypeScript inference:

```typescript
// String input
.option(input('name').description('Your name').string())

// Number input
.option(input('port').description('Port number').number().default(3000))

// Boolean flag
.option(input('force').description('Force operation'))

// Choice input
.option(input('env').string().choices(['dev', 'staging', 'prod']))

// Required argument
.argument(input('file').string().required())

// With validation
.option(input('email').string().validate(value => {
  if (!value.includes('@')) throw new Error('Invalid email')
  return value
}))
```

### Nested Commands

Build complex CLIs with nested command structures:

```typescript
import { cli, command, input, runCli } from 'clifer'

// Subcommands
const addUser = command<{ name: string; email: string }>('add')
  .description('Add a new user')
  .argument(input('name').string().required())
  .argument(input('email').string().required())
  .handle(async ({ name, email }) => {
    console.log(`Adding user: ${name} (${email})`)
  })

const listUsers = command('list')
  .description('List all users')
  .option(input('format').string().choices(['json', 'table']).default('table'))
  .handle(async ({ format }) => {
    console.log(`Listing users in ${format} format`)
  })

// Parent command
const userCommand = command('user')
  .description('User management')
  .command(addUser)
  .command(listUsers)

// Main CLI
const program = cli('myapp')
  .version('1.0.0')
  .description('My application')
  .command(userCommand)

runCli(program)
```

Usage:
```bash
myapp user add "John Doe" john@example.com
myapp user list --format json
```

### Interactive Prompts

Create interactive CLI experiences with built-in prompts:

```typescript
import { cli, input, prompt, runCli } from 'clifer'

const program = cli('setup')
  .description('Interactive setup wizard')
  .handle(async () => {
    // Prompt for multiple values
    const config = await prompt(
      input('projectName').prompt('Project name?').string().required(),
      input('description').prompt('Description?').string(),
      input('typescript').prompt('Use TypeScript?').boolean(),
      input('framework')
        .prompt('Choose framework:')
        .string()
        .choices(['express', 'fastify', 'koa'])
    )
    
    console.log('Configuration:', config)
  })

runCli(program)
```

You can also make arguments and options prompt when missing:

```typescript
const program = cli('deploy')
  .argument(
    input('environment')
      .string()
      .required()
      .prompt('Which environment?')
      .choices(['dev', 'staging', 'prod'])
  )
  .option(
    input('force')
      .prompt('Skip confirmation?')
  )
  .handle(async (props) => {
    console.log(`Deploying to ${props.environment}...`)
  })
```

## 🛠️ API Reference

### `cli(name: string)`
Creates a new CLI program with the specified name.

### `command(name: string)`
Creates a new command that can be added to a CLI or another command.

### `input(name: string)`
Creates a new input (argument or option) with the following methods:
- `.description(text: string)`: Set description
- `.string()`: Define as string type
- `.number()`: Define as number type
- `.boolean()`: Define as boolean type
- `.required()`: Mark as required
- `.default(value)`: Set default value
- `.choices(array)`: Limit to specific choices
- `.prompt(text?)`: Enable interactive prompt
- `.validate(fn)`: Add custom validation

### `prompt(...inputs)`
Prompts for multiple inputs interactively.

### `runCli(program)`
Executes the CLI program with process arguments.

## 🚨 Error Handling

Handle errors gracefully with `CliExpectedError`:

```typescript
import { CliExpectedError, cli, runCli } from 'clifer'

const program = cli('deploy')
  .argument(input('environment').string().required())
  .handle(async ({ environment }) => {
    if (!['dev', 'staging', 'prod'].includes(environment)) {
      throw new CliExpectedError(
        `Invalid environment "${environment}". Use: dev, staging, or prod`
      )
    }
    
    // Deploy logic...
  })

runCli(program).catch(error => {
  if (error instanceof CliExpectedError) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
  throw error
})
```

## 🏗️ Advanced Examples

### Loading Configuration

```typescript
import { cli, input, runCli } from 'clifer'
import { readFile } from 'fs/promises'

interface Config {
  apiUrl: string
  timeout: number
}

const program = cli<{ config?: string }>('myapp')
  .option(input('config').description('Config file path').string())
  .load(async (props) => {
    // Load configuration before parsing other arguments
    if (props.config) {
      const content = await readFile(props.config, 'utf-8')
      return JSON.parse(content) as Partial<Config>
    }
    return {}
  })
  .handle(async (props) => {
    console.log('Configuration loaded:', props)
  })

runCli(program)
```

### Custom Help Formatting

```typescript
const program = cli('myapp')
  .version('1.0.0')
  .description('My application')
  .help(() => {
    return `
Custom Help Message
===================

Usage: myapp [options]

This is a custom help message with your own formatting.

Options:
  --help     Show this help message
  --version  Show version number
    `
  })
```

### Async Command Handlers

```typescript
const program = cli('fetch')
  .argument(input('url').string().required())
  .option(input('timeout').number().default(5000))
  .handle(async ({ url, timeout }) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    
    try {
      const response = await fetch(url, { signal: controller.signal })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new CliExpectedError(`Request timed out after ${timeout}ms`)
      }
      throw error
    } finally {
      clearTimeout(timeoutId)
    }
  })
```

## 📚 Examples

### Complete TODO CLI Example

```typescript
import { cli, command, input, runCli, CliExpectedError } from 'clifer'
import { readFileSync, writeFileSync, existsSync } from 'fs'

interface Todo {
  id: number
  text: string
  done: boolean
}

const TODO_FILE = './todos.json'

const loadTodos = (): Todo[] => {
  if (!existsSync(TODO_FILE)) return []
  return JSON.parse(readFileSync(TODO_FILE, 'utf-8'))
}

const saveTodos = (todos: Todo[]) => {
  writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2))
}

const addCommand = command<{ text: string }>('add')
  .description('Add a new todo')
  .argument(input('text').string().required())
  .handle(({ text }) => {
    const todos = loadTodos()
    const newTodo: Todo = {
      id: Date.now(),
      text,
      done: false
    }
    todos.push(newTodo)
    saveTodos(todos)
    console.log(`✅ Added: "${text}"`)
  })

const listCommand = command<{ all?: boolean }>('list')
  .description('List todos')
  .option(input('all').description('Show completed todos'))
  .handle(({ all }) => {
    const todos = loadTodos()
    const filtered = all ? todos : todos.filter(t => !t.done)
    
    if (filtered.length === 0) {
      console.log('No todos found.')
      return
    }
    
    filtered.forEach(todo => {
      const status = todo.done ? '✓' : '○'
      console.log(`${status} [${todo.id}] ${todo.text}`)
    })
  })

const doneCommand = command<{ id: number }>('done')
  .description('Mark todo as done')
  .argument(input('id').number().required())
  .handle(({ id }) => {
    const todos = loadTodos()
    const todo = todos.find(t => t.id === id)
    
    if (!todo) {
      throw new CliExpectedError(`Todo with id ${id} not found`)
    }
    
    todo.done = true
    saveTodos(todos)
    console.log(`✅ Marked as done: "${todo.text}"`)
  })

const program = cli('todo')
  .version('1.0.0')
  .description('Simple TODO manager')
  .command(addCommand)
  .command(listCommand)
  .command(doneCommand)

runCli(program).catch(console.error)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with TypeScript
- Zero dependencies for maximum performance
- Inspired by popular CLI frameworks but designed to be simpler and more type-safe

## 📖 Links

- [GitHub Repository](https://github.com/rintoj/clifer)
- [npm Package](https://www.npmjs.com/package/clifer)
- [Issue Tracker](https://github.com/rintoj/clifer/issues)
