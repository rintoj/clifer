# Clifer

Clifer is a lightweight and powerful library for building beautiful, modern, and user-friendly
command-line interface (CLI) applications with Node.js.

## ✨ Features

- **Simple & Intuitive API**: A fluent, chainable API that makes defining commands, arguments, and
  options a breeze.
- **Automatic Help Generation**: Get beautifully formatted help messages for your CLI and its
  commands without any extra work.
- **Powerful Input Handling**: Supports positional arguments, options, flags, and various data types
  (string, number).
- **Interactive Prompts**: Easily prompt users for input, including confirmations, text, and choices
  with auto-completion.
- **Type-Safe**: Written in TypeScript to provide excellent autocompletion and catch errors at
  compile time.
- **Zero Dependencies**: A lean library that doesn't bloat your project.

## 📦 Installation

You can install Clifer using either Yarn or NPM:

### Yarn

```bash
yarn add clifer
```

### NPM

```bash
npm install clifer
```

## 🚀 Getting Started: Your First CLI

Clifer provides a handy initializer to get your project up and running in seconds.

Make sure you have Bun installed, then run:

```bash
bunx clifer init your-project-name
```

This command creates a new directory (`your-project-name`) with a basic project structure, ready for
you to start building.

For more complex tools, you can structure your application with nested commands.

### Adding Commands with the CLI

You can quickly scaffold new commands and subcommands using the Clifer CLI:

Add a top-level command:

```bash
bunx clifer command add [command-name]
```

Add a subcommand:

```bash
bunx clifer command add [parent-command]/[subcommand-name]
```

## 📖 Usage Guide

Here’s how to use Clifer to build a command. Create a file, for example `src/cli.ts`:

```typescript
import { cli, input, runCli } from 'clifer'

// Use an enum for type-safe choices
enum Type {
  api = 'api',
  subscriber = 'subscriber',
}

// Define the properties your command will accept
interface Props {
  name: string
  service: string
  instances?: number
  type?: Type
  dryRun?: boolean
}

// This is where your command's logic goes
function run(props: Props) {
  console.log('Running with the following properties:')
  console.log({ props })
}

// Define your CLI program
const program = cli<Props>('create-model')
  // Set the version of your CLI, which adds a --version flag
  .version('1.0.0')

  // Add a required positional argument for the model's name
  .argument(input('name').description('Name of the model').string().required().prompt())

  // Add a required --service option
  .option(input('service').description('Name of the service').string().required())

  // Add an optional --instances option with a default value
  .option(input('instances').description('Number of instances').number().default(2))

  // Add an option with a predefined set of choices
  .option(
    input('type').description('Type of the model').string().options([Type.api, Type.subscriber]),
  )

  // Add a boolean flag, --dry-run
  .option(input('dryRun').description('Perform a dry run'))

  // Define the function to execute when the command is run
  .handle(run)

// Run the CLI and catch any potential errors
runCli(program).catch(e => console.error(e))
```

### Auto-Generated Help

Clifer automatically generates a helpful guide for your users. Running `your-command --help` will
display all arguments, options, and descriptions.

### Defining Commands in Code

Here is how you can define a `create` command with multiple subcommands (`model`, `repository`,
`schema`):

```typescript
import { cli, command, input, runCli } from 'clifer'

// Define interfaces for props
interface Props {
  dryRun?: boolean
}
interface CreateCommandProps {
  name: string
  type?: 'ts' | 'js'
}

// Define a "model" subcommand
const createModel = command<CreateCommandProps>('model')
  .description('Create a new model file')
  .argument(input('name').description('Name of the model').string().required())
  .option(input('type').description('File type').string().options(['ts', 'js']))
  .handle((props: CreateCommandProps) => {
    console.log('Creating model:', props)
  })

// Define a "repository" subcommand
const createRepository = command<CreateCommandProps>('repository')
  .description('Create a new repository file')
  // ... similar arguments and options ...
  .handle((props: CreateCommandProps) => {
    console.log('Creating repository:', props)
  })

// Group subcommands under a main "create" command
const createCommand = command('create')
  .description('Create backend modules')
  .command(createModel)
  .command(createRepository)

// Build the main program
const program = cli<Props>('builder')
  .version('1.0.0')
  .command(createCommand) // Add the "create" command
  .option(input('dryRun').description('Execute a sample run'))

runCli(program).catch((e: any) => console.error(e))
```

Now you can run commands like `builder create model my-user-model --type ts`.

## 💬 Interactive Prompts

Clifer can prompt the user for information if it's not provided as an argument or option. You can
also use the `prompt` function for fully interactive scripts.

```typescript
import { input, prompt } from 'clifer'

async function runPrompts() {
  // Simple Yes/No confirmation
  const { overwrite } = await prompt(
    input('overwrite').description('Overwrite existing files?').prompt('Should overwrite?'),
  )
  console.log({ overwrite })

  // Prompt for a string with auto-complete suggestions
  const { environment } = await prompt(
    input('environment')
      .description('Environment')
      .string()
      .prompt('Enter environment')
      .choices(['local', 'dev', 'prod']),
  )
  console.log({ environment })

  // Prompt for multiple inputs at once
  const personalInfo = await prompt(
    input('firstName').description('First name').string().prompt(),
    input('lastName').description('Last name').string().prompt(),
    input('gender').description('Gender').string().choices(['Male', 'Female']).prompt(),
  )
  console.log(personalInfo)
}

runPrompts()
```

## 🚨 Error Handling

For expected errors, like invalid user input or configuration issues, throw a `CliExpectedError`.
This will display a clean error message to the user without a scary stack trace.

```typescript
import { CliExpectedError } from 'clifer'

function someAction(props: { arg?: string }) {
  if (!props.arg) {
    throw new CliExpectedError('Missing a required argument "--arg". Please provide a value.')
  }
  // ...
}
```

## 📦 Publishing Your CLI

> This is already setup for you if you have used "init" command.

To make your CLI tool available as an executable npm package, follow these steps:

### Step 1: Add a `bin` Field to `package.json`

This field tells npm which file to run for your command.

```json
{
  "name": "your-cli-tool",
  "version": "1.0.0",
  "bin": {
    "your-command": "bin/cli"
  }
}
```

### Step 2: Create the Executable File

Create the file `bin/cli` and add a shebang (`#!`) at the top. This line ensures the script is run
with Node.js.

```javascript
#!/usr/bin/env node

// This script ensures that your compiled TypeScript code is executed.
const { spawn } = require('child_process')
const { resolve } = require('path')

// Path to your main compiled JS file
const cli = resolve(__dirname, '..', 'dist', 'index.js')
const args = process.argv.slice(2)

const child = spawn('node', [cli, ...args], {
  stdio: 'inherit',
})

child.on('exit', function (code) {
  process.exit(code)
})
```

### Step 3: Make the File Executable

Run this command in your terminal to give the file execute permissions:

```bash
chmod +x bin/cli
```

### Step 4: Test Your Command Locally

Before publishing, you can test your command locally.

```bash
# This creates a symbolic link to your local package
npm link

# Now you can run your command anywhere on your system
your-command --help
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and
create. Any contributions you make are greatly appreciated.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

### 📜 License

This project is distributed under the MIT License. See the `LICENSE` file for more information.

### 💖 Code of Conduct

To ensure a welcoming and inclusive environment, please read and follow our Code of Conduct.

### 📋 Changelog

See the Changelog for a detailed history of changes to the project.

### 🤔 FAQ

**Q: How do I handle asynchronous operations in a command?**

A: Simply make your `.handle()` function `async`. Clifer will `await` its completion.

```typescript
.handle(async (props) => {
  const data = await fetch('https://api.example.com/data');
  console.log(await data.json());
})
```

**Q: Can I load configuration from a file?**

A: Yes\! Use the `.load()` method to asynchronously load properties from an external source before
parsing arguments.

```typescript
.load(async (props) => {
  // Load from a JSON file, environment variables, etc.
  return readJSONAsync('./env.json');
})
```
