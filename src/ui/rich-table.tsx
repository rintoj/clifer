import { Box, Text } from 'ink'
import React from 'react'
import { theme } from './theme'

export interface RichTableColumn<T> {
  /** Unique key for the column */
  key: string
  /** Header label */
  header: string
  /** Priority: 1 = essential (never dropped), higher = dropped first when narrow */
  priority?: number
  /** Whether this column receives extra space when terminal is wide */
  growable?: boolean
  /** Extract display value from a row item */
  value: (item: T, index: number) => string
  /** Color for the cell value */
  color?: string | ((item: T) => string)
  /** Whether the cell is bold */
  bold?: boolean | ((item: T) => boolean)
}

export interface RichTablePagination {
  total: number
  hasMore: boolean
  limit?: number
  offset?: number
}

interface RichTableProps<T> {
  data: T[]
  columns: RichTableColumn<T>[]
  /** Starting index offset for row numbering */
  startIndex?: number
  /** Pagination info — renders footer with page/total */
  pagination?: RichTablePagination
}

function getTermWidth(): number {
  return (process.stdout.columns || 100) - 8
}

function pad(text: string, width: number): string {
  if (text.length > width) return text.slice(0, width - 1) + '…'
  return text + ' '.repeat(width - text.length)
}

const { dash } = theme.symbols
const bc = theme.colors.border

function hline(widths: number[], left: string, mid: string, right: string): string {
  return (
    left +
    widths.map((w, i) => dash.repeat(w + 2) + (i < widths.length - 1 ? mid : '')).join('') +
    right
  )
}

function Row({
  cells,
  widths,
}: {
  cells: { text: string; color?: string; bold?: boolean }[]
  widths: number[]
}) {
  return (
    <Text>
      {cells.map((cell, i) => (
        <React.Fragment key={i}>
          <Text color={bc}>│</Text>
          <Text color={cell.color} bold={cell.bold}>
            {' '}
            {pad(cell.text, widths[i])}{' '}
          </Text>
        </React.Fragment>
      ))}
      <Text color={bc}>│</Text>
    </Text>
  )
}

function selectColumns<T>(
  data: T[],
  columns: RichTableColumn<T>[],
  startIndex: number,
): { cols: RichTableColumn<T>[]; widths: number[] } {
  const naturalWidths = new Map<string, number>()
  for (const col of columns) {
    const dataWidth = Math.max(
      col.header.length,
      ...data.map((item, i) => col.value(item, startIndex + i).length),
    )
    naturalWidths.set(col.key, dataWidth)
  }

  const termWidth = getTermWidth()
  let activeCols = [...columns]

  const calcTotal = (cols: RichTableColumn<T>[]) => {
    const overhead = cols.length + 1 + cols.length * 2
    return cols.reduce((sum, c) => sum + (naturalWidths.get(c.key) ?? 0), 0) + overhead
  }

  const droppable = [...columns].sort((a, b) => (b.priority ?? 1) - (a.priority ?? 1))
  for (const col of droppable) {
    if (calcTotal(activeCols) <= termWidth) break
    if ((col.priority ?? 1) <= 1) break
    activeCols = activeCols.filter(c => c.key !== col.key)
  }

  const widths = activeCols.map(c => naturalWidths.get(c.key) ?? 0)
  const overhead = activeCols.length + 1 + activeCols.length * 2
  const usedWidth = widths.reduce((a, b) => a + b, 0) + overhead
  const extra = termWidth - usedWidth

  if (extra > 0) {
    const growableIndices = activeCols.map((c, i) => (c.growable ? i : -1)).filter(i => i >= 0)
    if (growableIndices.length > 0) {
      const share = Math.floor(extra / growableIndices.length)
      const remainder = extra % growableIndices.length
      growableIndices.forEach((gi, j) => {
        widths[gi] += share + (j < remainder ? 1 : 0)
      })
    }
  }

  return { cols: activeCols, widths }
}

function Pagination({ total, hasMore, limit, offset }: RichTablePagination) {
  const pageSize = limit ?? total
  const co = offset ?? 0
  const cp = pageSize > 0 ? Math.floor(co / pageSize) + 1 : 1
  const tp = pageSize > 0 ? Math.ceil(total / pageSize) : 1

  return (
    <Box marginTop={1} gap={2}>
      <Text color={theme.colors.muted}>
        Page {cp} of {tp}
      </Text>
      <Text color={theme.colors.dim}>
        {theme.symbols.bullet} {total} total
      </Text>
      {hasMore && (
        <Text color={theme.colors.dim}>
          {theme.symbols.arrow} --offset {co + pageSize} for next page
        </Text>
      )}
    </Box>
  )
}

export function RichTable<T>({ data, columns, startIndex = 0, pagination }: RichTableProps<T>) {
  if (data.length === 0) {
    return (
      <Text color={theme.colors.muted} italic>
        No results
      </Text>
    )
  }

  const { cols, widths } = selectColumns(data, columns, startIndex)

  return (
    <Box flexDirection="column">
      <Text color={bc}>{hline(widths, '┌', '┬', '┐')}</Text>

      <Row
        widths={widths}
        cells={cols.map(c => ({ text: c.header, color: theme.colors.label, bold: true }))}
      />

      <Text color={bc}>{hline(widths, '├', '┼', '┤')}</Text>

      {data.map((item, i) => (
        <Row
          key={i}
          widths={widths}
          cells={cols.map(c => ({
            text: c.value(item, startIndex + i),
            color: typeof c.color === 'function' ? c.color(item) : c.color,
            bold: typeof c.bold === 'function' ? c.bold(item) : c.bold,
          }))}
        />
      ))}

      <Text color={bc}>{hline(widths, '└', '┴', '┘')}</Text>

      {pagination && <Pagination {...pagination} />}
    </Box>
  )
}
