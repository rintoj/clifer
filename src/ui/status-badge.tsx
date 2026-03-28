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
  label?: string
  status?: string
  value?: string
}

function formatStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
}

export function StatusBadge({ label, status, value }: StatusBadgeProps) {
  const effectiveStatus = status ?? value ?? 'inactive'
  const color = statusColors[effectiveStatus.toLowerCase()] ?? theme.colors.label
  return (
    <Text>
      {label && <Text color={theme.colors.label}>{label} </Text>}
      <Text color={color}>
        {theme.symbols.bullet} {formatStatus(effectiveStatus)}
      </Text>
    </Text>
  )
}
