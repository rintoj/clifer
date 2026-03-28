import { Text } from 'ink'
import React from 'react'
import { theme } from './theme'

const statusColors: Record<string, string> = {
  active: theme.colors.success,
  inactive: theme.colors.muted,
  archived: theme.colors.warning,
  completed: theme.colors.primary,
  error: theme.colors.error,
  draft: theme.colors.muted,
  published: theme.colors.success,
}

interface StatusBadgeProps {
  status: string
}

function formatStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const color = statusColors[status.toLowerCase()] ?? theme.colors.label
  return (
    <Text color={color}>
      {theme.symbols.bullet} {formatStatus(status)}
    </Text>
  )
}
