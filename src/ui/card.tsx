import { Box, Text } from 'ink'
import React from 'react'
import { theme } from './theme'

interface CardProps {
  title?: string
  borderColor?: string
  children: React.ReactNode
}

export function Card({ title, borderColor = theme.colors.primary, children }: CardProps) {
  return (
    <Box flexDirection='column'>
      {title && (
        <Box marginBottom={1}>
          <Text bold color={borderColor}>
            {title}
          </Text>
        </Box>
      )}
      <Box
        flexDirection='column'
        borderStyle='bold'
        borderLeft
        borderRight={false}
        borderTop={false}
        borderBottom={false}
        borderColor={borderColor}
        paddingLeft={1}
        paddingRight={1}
      >
        {children}
      </Box>
    </Box>
  )
}
