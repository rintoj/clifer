import { green, yellow, gray } from 'chalk'
import { Command, Input, InputType, isInput, Kind, isCommand } from './cli-types'

const SPACER = '   '
const NEW_LINE = `\n`
const AVAILABLE_WIDTH =
  typeof jest !== 'undefined' ? 80 : (process?.stdout?.columns ?? 80) - SPACER.length

function extractInputs(command: Command<any>) {
  return Object.values(command.inputs).sort((a, b) => {
    if (a.name === 'version' || a.name === 'help') return 1
    if (b.name === 'version' || b.name === 'help') return -1
    if (a === b) return 0
    return 1
  })
}

function maxNumberOfColumns(...lines: Array<string[]>) {
  return lines.reduce((line, currentLine) => {
    return line.length < currentLine?.length ? currentLine : line
  }, []).length
}

function calculateColumnWidth(noOfColumns: number, ...lines: Array<string[]>) {
  const widths = lines.reduce((width, cols) => {
    return width.map((w, index) => Math.max(w, cols?.[index]?.length ?? 0))
  }, new Array<number>(noOfColumns).fill(0))

  let availableWidth = AVAILABLE_WIDTH - SPACER.length * noOfColumns
  return widths.map(w => {
    const possibleWidth = Math.min(availableWidth, w)
    availableWidth -= possibleWidth
    return possibleWidth
  })
}

function fitToColumn(content: string, widths: number[], index: number) {
  const availableWidth = widths[index]
  const padding = widths.reduce((a, w, i) => a + (i < index ? w : 0), -SPACER.length * 2 - 1)
  const lines = []
  let currentLine = ''
  for (const word of content.split(' ')) {
    const nextLine = [currentLine, word].filter(i => i !== '').join(' ')
    if (nextLine.length < availableWidth) {
      currentLine = nextLine
    } else {
      lines.push(nextLine)
      currentLine = ''
    }
  }
  if (currentLine !== '') lines.push(currentLine)
  return lines
    .map((l, i) => new Array(i === 0 ? 0 : padding).fill(' ').join('') + l.padEnd(availableWidth))
    .join(NEW_LINE)
}

function toColumn(lines: Array<string[]>) {
  const noOfColumns = maxNumberOfColumns(...lines)
  const widths = calculateColumnWidth(noOfColumns, ...lines)
  return lines.map(column => {
    return column.map((content, index) => fitToColumn(content, widths, index)).join(SPACER)
  })
}

function joinWithSpace(...lines: string[]) {
  return lines.filter(i => !!i).join(' ')
}

function formatCommand(...lines: Array<string | string[]>) {
  return [
    SPACER,
    lines
      .map(value => (value instanceof Array ? value.join(NEW_LINE) : value))
      .join(NEW_LINE + NEW_LINE),
    SPACER,
  ].join(NEW_LINE)
}

function toRequired(content: string, isRequired = true) {
  return isRequired ? `<${content}>` : `[${content}]`
}

function toInputHelp(input: Command<any> | Input<any>): string[] {
  return [yellow(input.name), input.description ?? '']
}

function toOptionType(input: Input<any>): string {
  if (input.options?.length) {
    return `=<${input.options?.join('|')}>`
  }
  return input.type === InputType.String
    ? '=<string>'
    : input.type === InputType.Number
    ? '=<number>'
    : ''
}

function toOptionHelp(input: Input<any>): string[] {
  return [yellow(`--${input.name}${toOptionType(input)}`), input.description ?? '']
}

function toInputNames(command: Command<any>) {
  const hasInputs = !!Object.values(command.inputs).length
  return hasInputs
    ? extractInputs(command).map(input => yellow(`[--${input.name}${toOptionType(input)}]`))
    : []
}

function toInputsHelp(command: Command<any>) {
  const hasInputs = !!Object.values(command.inputs).length
  return hasInputs
    ? [hasInputs ? [gray('OPTIONS')] : undefined, ...extractInputs(command).map(toOptionHelp)]
    : []
}

function toArgumentNames(command: Command<any>) {
  const commandArgs = command.arguments.filter(i => i.kind === Kind.Input) as Input<any>[]
  const hasArguments = !!commandArgs.length
  return hasArguments
    ? commandArgs.map(input => yellow(toRequired(input.name, !!input.isRequired)))
    : []
}

function toArgumentsHelp(command: Command<any>) {
  const commandArgs = command.arguments.filter(isInput) as Input<any>[]
  const hasArguments = !!commandArgs.length
  return hasArguments
    ? [hasArguments ? [gray('ARGUMENTS')] : undefined, ...commandArgs.map(toInputHelp)]
    : []
}

function toCommandsHelp(command: Command<any>) {
  const commands = command.arguments.filter(isCommand) as Command<any>[]
  const hasCommands = !!commands.length
  return hasCommands ? [[gray('COMMANDS')], ...commands.map(toInputHelp)] : []
}

function toCommandNames(command: Command<any>) {
  const commands = command.arguments.filter(isCommand) as Command<any>[]
  const hasCommands = !!commands.length
  return hasCommands ? commands.map(command => command.name) : []
}

export function toHelp(command: Command<any>, prefix?: string) {
  const commands = toCommandsHelp(command)
  const args = toArgumentsHelp(command)
  const inputs = toInputsHelp(command)

  return formatCommand(
    ...toColumn([
      [
        joinWithSpace(prefix ? green(prefix) : '', command.name ? green(command.name) : ''),
        joinWithSpace(
          commands.length ? toRequired(toCommandNames(command).join('|')) : '',
          args.length ? toArgumentNames(command).join(' ') : '',
          inputs.length ? toInputNames(command).join(' ') : '',
        ),
      ],
    ]),
    ...toColumn([...commands, ...args, ...inputs].filter(i => !!i) as any),
  )
}

export function showHelp<T>(command: Command<T>, prefix?: string) {
  const help = toHelp(command, prefix)
  console.log(help)
  return help
}
