import { Box, render } from 'ink'
import React from 'react'

export function renderOnce(element: React.ReactElement) {
  const wrapped = (
    <Box flexDirection='column' marginY={1} marginLeft={4}>
      {element}
    </Box>
  )
  const { unmount, waitUntilExit } = render(wrapped)
  setImmediate(() => unmount())
  return waitUntilExit()
}
