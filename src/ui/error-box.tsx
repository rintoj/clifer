import { Box, Text } from 'ink'
import React from 'react'
import { theme } from './theme'

interface ErrorBoxProps {
  message: string
}

export function ErrorBox({ message }: ErrorBoxProps) {
  return (
    <Box paddingLeft={1}>
      <Text color={theme.colors.error}>
        {theme.symbols.cross} {message}
      </Text>
    </Box>
  )
}
