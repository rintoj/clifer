import { Box, render } from 'ink'
import React from 'react'

export async function renderOnce(element: React.ReactElement): Promise<void> {
  const wrapped = (
    <Box flexDirection='column' marginY={1} marginLeft={2}>
      {element}
    </Box>
  )
  const { unmount, waitUntilExit } = render(wrapped)
  setImmediate(() => unmount())
  await waitUntilExit()
}
