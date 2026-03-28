import { Box } from 'ink'
import React from 'react'
import { Card } from './card'
import { LabelValue } from './label-value'

interface KeyValueTableProps {
  data: Record<string, unknown>
  title?: string
  borderColor?: string
}

export function KeyValueTable({ data, title, borderColor }: KeyValueTableProps) {
  const entries = Object.entries(data).filter(([, v]) => v !== undefined)
  const maxKeyLen = Math.max(...entries.map(([k]) => k.length))

  return (
    <Card title={title} borderColor={borderColor}>
      <Box flexDirection="column">
        {entries.map(([key, value]) => (
          <LabelValue
            key={key}
            label={key}
            value={value as string | number | null | undefined}
            labelWidth={maxKeyLen + 2}
          />
        ))}
      </Box>
    </Card>
  )
}
