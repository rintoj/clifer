import { Box, Text } from 'ink'
import React from 'react'
import { theme } from './theme'

interface ErrorBoxProps {
  message?: string
  children?: React.ReactNode
}

export function ErrorBox({ message, children }: ErrorBoxProps) {
  return (
    <Box paddingLeft={1}>
      <Text color={theme.colors.error}>
        {theme.symbols.cross} {message ?? children}
      </Text>
    </Box>
  )
}
