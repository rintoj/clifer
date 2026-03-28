import { Box, Text } from 'ink'
import React from 'react'
import { theme } from './theme'

interface HeadingProps {
  children: string
}

export function Heading({ children }: HeadingProps) {
  return (
    <Box>
      <Text bold color={theme.colors.primary}>
        {children}
      </Text>
    </Box>
  )
}
