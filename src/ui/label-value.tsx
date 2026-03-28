import { Box, Text } from 'ink'
import React from 'react'
import { theme } from './theme'

interface LabelValueProps {
  label: string
  value: string | number | null | undefined
  labelWidth?: number
}

export function LabelValue({ label, value, labelWidth }: LabelValueProps) {
  const display = value === null || value === undefined ? '—' : String(value)
  return (
    <Box gap={1}>
      <Text color={theme.colors.label}>{labelWidth ? label.padEnd(labelWidth) : label}</Text>
      <Text color={theme.colors.value}>{display}</Text>
    </Box>
  )
}
