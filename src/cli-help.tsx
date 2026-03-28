import { Box, Text } from 'ink'
import React from 'react'
import { type Command, type Input, InputType, isCommand, isInput, Kind } from './cli-types'
import { renderOnce } from './ui/render'
import { theme } from './ui/theme'

const SPACER = '   '
const NEW_LINE = `\n`
const AVAILABLE_WIDTH =
  typeof jest !== 'undefined' ? 80 : (process?.stdout?.columns ?? 80) - SPACER.length
const COMMON_OPTIONS = ['version', 'help', 'doc', 'json', 'text']

function extractInputs(command: Command<any>, commonOptions = false) {
  return Object.values(command.inputs)
    .filter(i => COMMON_OPTIONS.includes(String(i.name)) === commonOptions)
    .sort((a, b) => {
      if (COMMON_OPTIONS.includes(String(a.name))) return 1
      if (COMMON_OPTIONS.includes(String(b.name))) return -1
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

function generateSpaces(length: number) {
  if (length < 1) return ''
  return new Array(length).fill(' ').join('')
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
    .map((l, i) => generateSpaces(i === 0 ? 0 : padding) + l.padEnd(availableWidth))
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
      .map(value => (Array.isArray(value) ? value.join(NEW_LINE) : value))
      .join(NEW_LINE + NEW_LINE),
    SPACER,
  ].join(NEW_LINE)
}

function toRequired(content: string, isRequired = true) {
  return isRequired ? `<${content}>` : `[${content}]`
}

function toInputHelp(input: Command<any> | Input<any, any>): string[] {
  return [input.name as string, input.description ?? '']
}

function toOptionType(input: Input<any, any>): string {
  if (input.choices?.length) {
    return `=<${input.choices?.join('|')}>${input.isMany ? ',...' : ''}`
  }
  return input.type === InputType.String
    ? `=<string>${input.isMany ? ',...' : ''}`
    : input.type === InputType.Number
      ? '=<number>'
      : ''
}

function toOptionHelp(input: Input<any, any>): string[] {
  return [
    `--${input.name as string}${toOptionType(input)}`,
    `${input.isRequired ? '[Required] ' : ''}${input.description ?? ''}`,
  ]
}

function toInputNames(command: Command<any>) {
  const hasInputs = !!Object.values(command.inputs).length
  return hasInputs
    ? extractInputs(command).map(input => {
        const option = `--${input.name as string}${toOptionType(input)}`
        return input.isRequired ? option : `[${option}]`
      })
    : []
}

function toCommonInputNames(command: Command<any>) {
  const hasInputs = !!Object.values(command.inputs).length
  return hasInputs
    ? extractInputs(command, true).map(input => {
        const option = `--${input.name as string}${toOptionType(input)}`
        return input.isRequired ? option : `[${option}]`
      })
    : []
}

function toInputsHelp(command: Command<any>) {
  const inputs = extractInputs(command)
  const hasInputs = !!inputs.length
  return hasInputs ? [hasInputs ? ['OPTIONS'] : undefined, ...inputs.map(toOptionHelp)] : []
}

function toCommonInputsHelp(command: Command<any>) {
  const hasInputs = !!Object.values(command.inputs).length
  return hasInputs
    ? [hasInputs ? ['COMMON'] : undefined, ...extractInputs(command, true).map(toOptionHelp)]
    : []
}

function toArgumentNames(command: Command<any>) {
  const commandArgs = command.arguments.filter(i => i.kind === Kind.Input) as Input<any, any>[]
  const hasArguments = !!commandArgs.length
  return hasArguments
    ? commandArgs.map(input => toRequired(input.name as string, !!input.isRequired))
    : []
}

function toArgumentsHelp(command: Command<any>) {
  const commandArgs = command.arguments.filter(isInput) as Input<any, any>[]
  const hasArguments = !!commandArgs.length
  return hasArguments
    ? [hasArguments ? ['ARGUMENTS'] : undefined, ...commandArgs.map(toInputHelp)]
    : []
}

function toCommandsHelp(command: Command<any>) {
  const commands = command.arguments.filter(isCommand) as Command<any>[]
  const hasCommands = !!commands.length
  return hasCommands ? [['COMMANDS'], ...commands.map(toInputHelp)] : []
}

function toCommandNames(command: Command<any>) {
  const commands = command.arguments.filter(isCommand) as Command<any>[]
  const hasCommands = !!commands.length
  return hasCommands ? commands.map(command => command.name) : []
}

// --- Plain text help (used by toHelp for documentation and tests) ---

export function toHelp(command: Command<any>, prefix?: string, includeCommonInputs?: boolean) {
  const commands = toCommandsHelp(command)
  const args = toArgumentsHelp(command)
  const inputs = toInputsHelp(command)
  const commonInputs = includeCommonInputs ? toCommonInputsHelp(command) : []

  return formatCommand(
    ...toColumn([
      [
        joinWithSpace(prefix ?? '', command.name ?? ''),
        joinWithSpace(
          commands.length ? toRequired(toCommandNames(command).join('|')) : '',
          args.length ? toArgumentNames(command).join(' ') : '',
          inputs.length ? toInputNames(command).join(' ') : '',
          includeCommonInputs ? toCommonInputNames(command).join(' ') : '',
        ),
      ],
    ]),
    ...toColumn([...commands, ...args, ...inputs, ...commonInputs].filter(i => !!i) as any),
  )
}

// --- Ink-based help rendering ---

function HelpLine({
  left,
  right,
  isSection,
}: {
  left: string
  right?: string
  isSection?: boolean
}) {
  if (isSection) {
    return (
      <Box marginTop={1}>
        <Text color={theme.colors.muted}>{left}</Text>
      </Box>
    )
  }
  return (
    <Box gap={3}>
      <Text color={theme.colors.warning}>{left}</Text>
      {right && <Text>{right}</Text>}
    </Box>
  )
}

function HelpView({
  command,
  prefix,
  includeCommonInputs,
}: {
  command: Command<any>
  prefix?: string
  includeCommonInputs?: boolean
}) {
  const commands = toCommandsHelp(command)
  const args = toArgumentsHelp(command)
  const inputs = toInputsHelp(command)
  const commonInputs = includeCommonInputs ? toCommonInputsHelp(command) : []
  const allLines = [...commands, ...args, ...inputs, ...commonInputs].filter(i => !!i) as string[][]

  const usageParts = joinWithSpace(
    commands.length ? toRequired(toCommandNames(command).join('|')) : '',
    args.length ? toArgumentNames(command).join(' ') : '',
    inputs.length ? toInputNames(command).join(' ') : '',
    includeCommonInputs ? toCommonInputNames(command).join(' ') : '',
  )

  // Calculate consistent column width for alignment
  const dataLines = allLines.filter(
    line =>
      !(line.length === 1 && ['COMMANDS', 'ARGUMENTS', 'OPTIONS', 'COMMON'].includes(line[0])),
  )
  const maxLeftWidth = dataLines.reduce((max, line) => Math.max(max, (line[0] ?? '').length), 0)

  return (
    <Box flexDirection='column' paddingLeft={1}>
      <Box gap={1}>
        <Text color={theme.colors.success} bold>
          {joinWithSpace(prefix ?? '', command.name ?? '')}
        </Text>
        <Text color={theme.colors.warning}>{usageParts}</Text>
      </Box>
      <Box flexDirection='column' marginTop={1}>
        {allLines.map((line, i) => {
          const isSection =
            line.length === 1 && ['COMMANDS', 'ARGUMENTS', 'OPTIONS', 'COMMON'].includes(line[0])
          if (isSection) {
            return <HelpLine key={i} left={line[0]} isSection />
          }
          const isRequired = line[1]?.startsWith('[Required]')
          const paddedLeft = (line[0] ?? '').padEnd(maxLeftWidth)
          return (
            <Box key={i} gap={3}>
              <Text color={theme.colors.warning}>{paddedLeft}</Text>
              <Text>
                {isRequired && <Text color={theme.colors.error}>[Required] </Text>}
                {isRequired ? line[1].replace('[Required] ', '') : (line[1] ?? '')}
              </Text>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

function CliErrorView({ message, commandText }: { message: string; commandText: string }) {
  return (
    <Box flexDirection='column' paddingLeft={1}>
      <Text color={theme.colors.error}>
        {'\n'}Error: {message}
        {'\n'}
      </Text>
      <Text color={theme.colors.warning}>Run &quot;{commandText} --help&quot; to see help</Text>
    </Box>
  )
}

export function showHelp<T>(command: Command<T>, prefix?: string) {
  if (typeof jest !== 'undefined') {
    return toHelp(command, prefix)
  }
  return renderOnce(<HelpView command={command} prefix={prefix} includeCommonInputs />)
}

export function showCliError(message: string, commandText: string) {
  if (typeof jest !== 'undefined') {
    console.error(`\nError: ${message}\n`)
    console.log(`Run "${commandText} --help" to see help`)
    return
  }
  return renderOnce(<CliErrorView message={message} commandText={commandText} />)
}

export function toDocumentation<T>(
  command: Command<T>,
  prefix?: string,
  includeCommonInputs?: boolean,
) {
  const title = [prefix, command.name].join(' ').trim()
  const indentation = title.split(' ').length
  const titleSize = new Array(indentation).fill('#').join('')
  const indent = new Array(Math.max(0, indentation - 2)).fill('>').join('')

  let docs = [
    `${titleSize} ${title}`,
    ...(command.description ? ['', command.description, ''] : []),
    '```sh',
    ...toHelp(command, prefix, includeCommonInputs).split('\n'),
    '```',
    '',
  ].map(i => `${indent}${i}`)
  for (const subcommand of command.arguments.filter(arg => arg.kind === Kind.Command)) {
    docs = docs.concat(
      toDocumentation(subcommand as Command<any>, `${prefix} ${command.name}`.trim(), false),
    )
  }
  return docs
}

export function showDocumentation<T>(command: Command<T>, prefix?: string) {
  const docs = toDocumentation(command, prefix, true).join('\n')
  console.log(docs)
  return docs
}
