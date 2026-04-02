import cardinal from 'cardinal'
import markdown from 'markdown-it'
import terminal from 'markdown-it-terminal'
import type React from 'react'
import type { OutputFormat } from './cli-types'
import { renderOnce } from './ui/render'

export type RichRenderer<T> = (data: T) => React.ReactElement

// --- Markdown rendering ---

const markd = markdown()
markd.use(terminal, {
  styleOptions: {},
  highlight: cardinal.highlight,
  unescape: true,
  indent: '  ',
})

// Fix markdown-it-terminal broken rules
markd.renderer.rules.blockquote_open = () => '\n\u001b[34m> \u001b[39m'
markd.renderer.rules.blockquote_close = () => '\n\n'
markd.renderer.rules.bullet_list_open = () => ''
markd.renderer.rules.strong_open = () => '\u001b[1m'
markd.renderer.rules.strong_close = () => '\u001b[22m'
markd.renderer.rules.em_open = () => '\u001b[3m'
markd.renderer.rules.em_close = () => '\u001b[23m'
markd.renderer.rules.s_open = () => '\u001b[9m'
markd.renderer.rules.s_close = () => '\u001b[29m'

// --- Helpers ---

export function stripAnsi(str: string) {
  return str.replace(/\u001b\[[0-9;]*m/g, '')
}

export function getTerminalWidth() {
  return process.stdout.columns || 100
}

export function wrapText(text: string, maxWidth: number): string[] {
  if (stripAnsi(text).length <= maxWidth) return [text]
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (stripAnsi(test).length > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines.length > 0 ? lines : ['']
}

export function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '\u001b[1m$1\u001b[22m')
    .replace(/\*(.+?)\*/g, '\u001b[3m$1\u001b[23m')
    .replace(/`(.+?)`/g, '\u001b[36m$1\u001b[39m')
}

// --- Markdown table rendering ---

function renderMarkdownTable(tableLines: string[]) {
  const rows: string[][] = []
  for (const line of tableLines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('|') && !trimmed.match(/^\|[\s:]*[-]+[\s:]*\|/)) {
      const cells = trimmed
        .split('|')
        .slice(1, -1)
        .map(c => renderInline(c.trim()))
      rows.push(cells)
    }
  }
  if (rows.length === 0) return tableLines.join('\n')

  const colCount = Math.max(...rows.map(r => r.length))
  const termWidth = getTerminalWidth()
  const overhead = 2 + (colCount - 1) * 3 + colCount * 2
  const availableWidth = termWidth - overhead

  const naturalWidths = Array(colCount).fill(0)
  for (const row of rows) {
    for (let i = 0; i < row.length; i++) {
      naturalWidths[i] = Math.max(naturalWidths[i], stripAnsi(row[i] ?? '').length)
    }
  }

  const totalNatural = naturalWidths.reduce((a: number, b: number) => a + b, 0)
  let colWidths: number[]

  if (totalNatural <= availableWidth) {
    colWidths = naturalWidths
  } else {
    const minWidths = Array(colCount).fill(0)
    for (const row of rows) {
      for (let i = 0; i < row.length; i++) {
        const words = stripAnsi(row[i] ?? '').split(' ')
        const longest = Math.max(...words.map(w => w.length))
        minWidths[i] = Math.max(minWidths[i], longest)
      }
    }

    const totalMin = minWidths.reduce((a: number, b: number) => a + b, 0)
    const remaining = Math.max(0, availableWidth - totalMin)
    const totalExcess = naturalWidths.reduce(
      (sum: number, w: number, i: number) => sum + Math.max(0, w - minWidths[i]),
      0,
    )

    colWidths = naturalWidths.map((w: number, i: number) => {
      const excess = Math.max(0, w - minWidths[i])
      const extra = totalExcess > 0 ? Math.floor((excess / totalExcess) * remaining) : 0
      return minWidths[i] + extra
    })
  }

  const dim = '\u001b[2m'
  const reset = '\u001b[0m'
  const bold = '\u001b[1m'
  const topBorder = `${dim}  ┌${colWidths.map((w: number) => '─'.repeat(w + 2)).join('┬')}┐${reset}`
  const midBorder = `${dim}  ├${colWidths.map((w: number) => '─'.repeat(w + 2)).join('┼')}┤${reset}`
  const bottomBorder = `${dim}  └${colWidths.map((w: number) => '─'.repeat(w + 2)).join('┴')}┘${reset}`

  const lines: string[] = [topBorder]
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r]
    const isHeaderRow = r === 0 && rows.length > 1
    const prefix = isHeaderRow ? bold : ''
    const suffix = isHeaderRow ? reset : ''

    const wrappedCells = colWidths.map((w: number, i: number) => wrapText(row[i] ?? '', w))
    const maxLines = Math.max(...wrappedCells.map(c => c.length))

    for (let l = 0; l < maxLines; l++) {
      const cells = colWidths.map((w: number, i: number) => {
        const cell = wrappedCells[i][l] ?? ''
        const padLen = w - stripAnsi(cell).length
        return ` ${cell}${' '.repeat(Math.max(0, padLen) + 1)}`
      })
      lines.push(
        '  ' +
          dim +
          '│' +
          reset +
          prefix +
          cells.join(`${dim}│${reset}`) +
          dim +
          '│' +
          reset +
          suffix,
      )
    }

    if (r === 0 && rows.length > 1) {
      lines.push(midBorder)
    }
  }

  lines.push(bottomBorder)
  return lines.join('\n')
}

function renderWithTables(content: string) {
  const lines = content.split('\n')
  const segments: string[] = []
  let tableBuffer: string[] = []
  let nonTableBuffer: string[] = []

  const flushTable = () => {
    if (tableBuffer.length > 0) {
      if (nonTableBuffer.length > 0) {
        segments.push(markd.render(nonTableBuffer.join('\n')))
        nonTableBuffer = []
      }
      segments.push(renderMarkdownTable(tableBuffer))
      tableBuffer = []
    }
  }

  const flushNonTable = () => {
    if (nonTableBuffer.length > 0) {
      segments.push(markd.render(nonTableBuffer.join('\n')))
      nonTableBuffer = []
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      tableBuffer.push(line)
    } else {
      if (tableBuffer.length > 0) {
        flushTable()
      }
      nonTableBuffer.push(line)
    }
  }

  flushTable()
  flushNonTable()

  return segments.join('\n')
}

// --- Print functions ---

export function printJson(data: any): void {
  console.log(JSON.stringify(data, null, 2))
}

export function printMarkdown(content: string): void {
  console.log(renderWithTables(content))
}

export function printTextList(items: Record<string, any>[], fields?: string[]): void {
  if (items.length === 0) return
  const keys = fields ?? Object.keys(items[0])
  const widths = keys.map(k =>
    Math.max(k.length, ...items.map(item => String(item[k] ?? '—').length)),
  )
  console.log(keys.map((k, i) => k.padEnd(widths[i] + 2)).join(''))
  for (const item of items) {
    console.log(keys.map((k, i) => String(item[k] ?? '—').padEnd(widths[i] + 2)).join(''))
  }
}

export function printText(data: Record<string, any>): void {
  const entries = Object.entries(data).filter(([, v]) => v !== undefined)
  const maxKeyLen = Math.max(...entries.map(([k]) => k.length))
  const indent = maxKeyLen + 2
  const padStr = ''.padEnd(indent)
  const termWidth = getTerminalWidth()
  for (const [key, value] of entries) {
    if (Array.isArray(value)) {
      value.forEach((item, i) => {
        const label = i === 0 ? key.padEnd(indent) : padStr
        const contentWidth = termWidth - indent
        const wrapped =
          contentWidth <= 20 || String(item).length <= contentWidth
            ? String(item)
            : wrapText(String(item), contentWidth).join(`\n${padStr}`)
        console.log(`${label}${wrapped}`)
      })
    } else {
      const display = value === null ? '—' : String(value)
      const contentWidth = termWidth - indent
      const wrapped =
        contentWidth <= 20 || display.length <= contentWidth
          ? display
          : wrapText(display, contentWidth).join(`\n${padStr}`)
      console.log(`${key.padEnd(indent)}${wrapped}`)
    }
  }
}

// --- String formatters ---

export function formatAsTable(data: Record<string, any>): string {
  const entries = Object.entries(data).filter(([, v]) => v !== undefined)
  const lines = ['| Field | Value |', '| --- | --- |']
  for (const [key, value] of entries) {
    const display = value === null ? '-' : String(value)
    lines.push(`| **${key}** | ${display} |`)
  }
  return lines.join('\n')
}

export function formatAsList(items: any[], fields?: string[]): string {
  if (items.length === 0) return '_No results_'
  const keys = fields ?? Object.keys(items[0])
  const header = `| ${keys.join(' | ')} |`
  const separator = `| ${keys.map(() => '---').join(' | ')} |`
  const rows = items.map(item => `| ${keys.map(k => item[k] ?? '-').join(' | ')} |`)
  return [header, separator, ...rows].join('\n')
}

// --- Unified renderUI() dispatcher ---

export function renderUI<T>(
  data: T,
  format: OutputFormat,
  richFn: RichRenderer<T>,
): void | Promise<void> {
  // --json: highest priority
  if (format === 'json') return printJson(data)

  // --text: plain, no colors, pipe-friendly
  if (format === 'text') {
    if (Array.isArray(data)) return printTextList(data)
    if (typeof data === 'object' && data !== null) return printText(data as Record<string, any>)
    console.log(String(data))
    return
  }

  // default (rich): call the rich renderer, render via Ink
  return renderOnce(richFn(data))
}
