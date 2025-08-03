# Clifer API Reference

This document provides a comprehensive API reference for the Clifer library. It is designed to be LLM-friendly and follows the llms.txt standard for easy parsing and understanding.

## Table of Contents

- [Core Functions](#core-functions)
- [Builder Classes](#builder-classes)
- [Input Types](#input-types)
- [Error Handling](#error-handling)
- [Type Definitions](#type-definitions)
- [Advanced Features](#advanced-features)

## Core Functions

### `cli<T>(name: string): CLIBuilder<T>`

Creates a new CLI application builder.

**Parameters:**
- `name` (string): The name of your CLI application

**Returns:** `CLIBuilder<T>` - A chainable CLI builder instance

**Example:**
```typescript
const program = cli<{ verbose?: boolean }>('myapp')
  .version('1.0.0')
  .description('My application')
```

### `command<T>(name: string): CommandBuilder<T>`

Creates a new command that can be added to a CLI or another command.

**Parameters:**
- `name` (string): The name of the command

**Returns:** `CommandBuilder<T>` - A chainable command builder instance

**Example:**
```typescript
const createCommand = command<{ name: string }>('create')
  .description('Create a new item')
  .argument(input('name').string().required())
```

### `input<T>(name: string): InputBuilder<T>`

Creates a new input (argument or option) builder.

**Parameters:**
- `name` (string): The name of the input parameter

**Returns:** `InputBuilder<T>` - A chainable input builder instance

**Example:**
```typescript
const nameInput = input('name')
  .description('Your name')
  .string()
  .required()
```

### `prompt<T>(...inputs: InputBuilder<any>[]): Promise<T>`

Prompts the user for multiple inputs interactively.

**Parameters:**
- `...inputs` (InputBuilder[]): Variable number of input builders

**Returns:** `Promise<T>` - Promise resolving to an object with all input values

**Example:**
```typescript
const answers = await prompt(
  input('name').prompt('Your name?').string().required(),
  input('age').prompt('Your age?').number()
)
```

### `runCli<T>(program: CLIBuilder<T>): Promise<void>`

Executes the CLI program with process arguments.

**Parameters:**
- `program` (CLIBuilder<T>): The CLI program to run

**Returns:** `Promise<void>`

**Example:**
```typescript
runCli(program).catch(console.error)
```

## Builder Classes

### CLIBuilder<T>

The main CLI application builder with chainable methods.

#### Methods

##### `.version(version: string): CLIBuilder<T>`
Sets the version of your CLI application.

**Parameters:**
- `version` (string): Version string (e.g., "1.0.0")

**Returns:** `CLIBuilder<T>` - The CLI builder for chaining

##### `.description(description: string): CLIBuilder<T>`
Sets the description of your CLI application.

**Parameters:**
- `description` (string): Description text

**Returns:** `CLIBuilder<T>` - The CLI builder for chaining

##### `.argument(input: InputBuilder<any>): CLIBuilder<T>`
Adds a positional argument to the CLI.

**Parameters:**
- `input` (InputBuilder): The input builder for the argument

**Returns:** `CLIBuilder<T>` - The CLI builder for chaining

##### `.option(input: InputBuilder<any>): CLIBuilder<T>`
Adds an option to the CLI.

**Parameters:**
- `input` (InputBuilder): The input builder for the option

**Returns:** `CLIBuilder<T>` - The CLI builder for chaining

##### `.command(command: CommandBuilder<any>): CLIBuilder<T>`
Adds a subcommand to the CLI.

**Parameters:**
- `command` (CommandBuilder): The command builder

**Returns:** `CLIBuilder<T>` - The CLI builder for chaining

##### `.handle(handler: (props: T) => void | Promise<void>): CLIBuilder<T>`
Sets the handler function for the CLI.

**Parameters:**
- `handler` (Function): Function to execute when the CLI runs

**Returns:** `CLIBuilder<T>` - The CLI builder for chaining

##### `.load(loader: (props: Partial<T>) => Promise<Partial<T>>): CLIBuilder<T>`
Sets a loader function to load configuration before parsing arguments.

**Parameters:**
- `loader` (Function): Async function to load configuration

**Returns:** `CLIBuilder<T>` - The CLI builder for chaining

##### `.help(formatter: () => string): CLIBuilder<T>`
Sets a custom help formatter.

**Parameters:**
- `formatter` (Function): Function that returns help text

**Returns:** `CLIBuilder<T>` - The CLI builder for chaining

### CommandBuilder<T>

Builder for creating commands with chainable methods.

#### Methods

##### `.description(description: string): CommandBuilder<T>`
Sets the description of the command.

**Parameters:**
- `description` (string): Description text

**Returns:** `CommandBuilder<T>` - The command builder for chaining

##### `.argument(input: InputBuilder<any>): CommandBuilder<T>`
Adds a positional argument to the command.

**Parameters:**
- `input` (InputBuilder): The input builder for the argument

**Returns:** `CommandBuilder<T>` - The command builder for chaining

##### `.option(input: InputBuilder<any>): CommandBuilder<T>`
Adds an option to the command.

**Parameters:**
- `input` (InputBuilder): The input builder for the option

**Returns:** `CommandBuilder<T>` - The command builder for chaining

##### `.command(command: CommandBuilder<any>): CommandBuilder<T>`
Adds a subcommand to this command.

**Parameters:**
- `command` (CommandBuilder): The subcommand builder

**Returns:** `CommandBuilder<T>` - The command builder for chaining

##### `.handle(handler: (props: T) => void | Promise<void>): CommandBuilder<T>`
Sets the handler function for the command.

**Parameters:**
- `handler` (Function): Function to execute when the command runs

**Returns:** `CommandBuilder<T>` - The command builder for chaining

### InputBuilder<T>

Builder for creating inputs (arguments and options) with chainable methods.

#### Methods

##### `.description(description: string): InputBuilder<T>`
Sets the description of the input.

**Parameters:**
- `description` (string): Description text

**Returns:** `InputBuilder<T>` - The input builder for chaining

##### `.string(): InputBuilder<string>`
Defines the input as a string type.

**Returns:** `InputBuilder<string>` - The input builder with string type

##### `.number(): InputBuilder<number>`
Defines the input as a number type.

**Returns:** `InputBuilder<number>` - The input builder with number type

##### `.boolean(): InputBuilder<boolean>`
Defines the input as a boolean type.

**Returns:** `InputBuilder<boolean>` - The input builder with boolean type

##### `.required(): InputBuilder<T>`
Marks the input as required.

**Returns:** `InputBuilder<T>` - The input builder for chaining

##### `.default(value: T): InputBuilder<T>`
Sets a default value for the input.

**Parameters:**
- `value` (T): The default value

**Returns:** `InputBuilder<T>` - The input builder for chaining

##### `.choices(choices: T[]): InputBuilder<T>`
Limits the input to specific choices.

**Parameters:**
- `choices` (T[]): Array of allowed values

**Returns:** `InputBuilder<T>` - The input builder for chaining

##### `.prompt(message?: string): InputBuilder<T>`
Enables interactive prompting for this input.

**Parameters:**
- `message` (string, optional): Custom prompt message

**Returns:** `InputBuilder<T>` - The input builder for chaining

##### `.validate(validator: (value: T) => T): InputBuilder<T>`
Adds a custom validation function.

**Parameters:**
- `validator` (Function): Function that validates and returns the value

**Returns:** `InputBuilder<T>` - The input builder for chaining

##### `.alias(alias: string): InputBuilder<T>`
Adds an alias for the option (e.g., -v for --verbose).

**Parameters:**
- `alias` (string): Single character alias

**Returns:** `InputBuilder<T>` - The input builder for chaining

## Error Handling

### CliExpectedError

A special error class for expected errors that should be displayed cleanly to users.

**Constructor:**
```typescript
new CliExpectedError(message: string)
```

**Parameters:**
- `message` (string): The error message to display

**Example:**
```typescript
throw new CliExpectedError('Invalid configuration file')
```

## Type Definitions

### InputType

Enum defining the types of inputs:

```typescript
enum InputType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean'
}
```

### InputDefinition

Interface for input configuration:

```typescript
interface InputDefinition<T> {
  name: string
  type: InputType
  description?: string
  required?: boolean
  default?: T
  choices?: T[]
  prompt?: string | boolean
  validate?: (value: T) => T
  alias?: string
}
```

### CommandDefinition

Interface for command configuration:

```typescript
interface CommandDefinition<T> {
  name: string
  description?: string
  arguments: InputDefinition<any>[]
  options: InputDefinition<any>[]
  commands: CommandDefinition<any>[]
  handler?: (props: T) => void | Promise<void>
}
```

### CLIDefinition

Interface for CLI configuration:

```typescript
interface CLIDefinition<T> {
  name: string
  version?: string
  description?: string
  arguments: InputDefinition<any>[]
  options: InputDefinition<any>[]
  commands: CommandDefinition<any>[]
  handler?: (props: T) => void | Promise<void>
  loader?: (props: Partial<T>) => Promise<Partial<T>>
  help?: () => string
}
```

## Advanced Features

### Configuration Loading

The `.load()` method allows you to load configuration from external sources before parsing command-line arguments:

```typescript
const program = cli<Config>('myapp')
  .load(async (initialProps) => {
    // Load from file, environment, etc.
    const config = await loadConfigFile()
    return { ...initialProps, ...config }
  })
```

### Custom Help Formatting

Override the default help output with custom formatting:

```typescript
const program = cli('myapp')
  .help(() => {
    return `
My Custom Help
==============

Usage: myapp [options] [command]

Options:
  --help     Show help
  --version  Show version
    `
  })
```

### Input Validation

Add custom validation logic to inputs:

```typescript
const emailInput = input('email')
  .string()
  .required()
  .validate((value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      throw new Error('Invalid email format')
    }
    return value
  })
```

### Async Handlers

All handlers support async operations:

```typescript
const program = cli('fetch')
  .argument(input('url').string().required())
  .handle(async ({ url }) => {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
  })
```

### Nested Command Access

Access parent command properties in nested commands:

```typescript
interface ParentProps {
  verbose?: boolean
}

interface ChildProps extends ParentProps {
  name: string
}

const childCommand = command<ChildProps>('child')
  .argument(input('name').string().required())
  .handle(async (props) => {
    // props includes both parent and child properties
    if (props.verbose) {
      console.log('Verbose mode enabled')
    }
    console.log(`Processing ${props.name}`)
  })

const program = cli<ParentProps>('parent')
  .option(input('verbose'))
  .command(childCommand)
```

## Best Practices

1. **Type Safety**: Always define interfaces for your props
2. **Error Handling**: Use `CliExpectedError` for user-facing errors
3. **Descriptions**: Provide clear descriptions for all inputs and commands
4. **Validation**: Add validation for critical inputs
5. **Async Operations**: Handle async operations properly with try/catch
6. **Modular Design**: Split complex CLIs into separate command files

## Version Compatibility

- Node.js: >= 14.0.0
- TypeScript: >= 4.0.0
- Zero runtime dependencies

## License

MIT License - see LICENSE file for details.