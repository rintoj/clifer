import { Text } from 'ink'
import React from 'react'
import { theme } from './theme'

type MessageType = 'success' | 'error' | 'info' | 'warning'

const typeConfig: Record<MessageType, { color: string; symbol: string }> = {
  success: { color: theme.colors.success, symbol: theme.symbols.check },
  error: { color: theme.colors.error, symbol: theme.symbols.cross },
  info: { color: theme.colors.primary, symbol: theme.symbols.bullet },
  warning: { color: theme.colors.warning, symbol: theme.symbols.bullet },
}

interface MessageProps {
  type?: MessageType
  children: React.ReactNode
}

export function Message({ type = 'info', children }: MessageProps) {
  const { color, symbol } = typeConfig[type]
  return (
    <Text color={color}>
      {symbol} {children}
    </Text>
  )
}
