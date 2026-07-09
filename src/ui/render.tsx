import { Box, render } from 'ink'
import React from 'react'

export async function renderOnce(element: React.ReactElement): Promise<void> {
  const wrapped = (
    <Box flexDirection='column' marginTop={1} paddingLeft={1}>
      {element}
    </Box>
  )
  const { unmount, waitUntilExit } = render(wrapped)
  setImmediate(() => unmount())
  await waitUntilExit()
}
