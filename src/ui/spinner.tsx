import { Text } from 'ink'
import React, { useEffect, useState } from 'react'
import { theme } from './theme'

const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

interface SpinnerProps {
  label?: string
}

export function Spinner({ label }: SpinnerProps) {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(prev => (prev + 1) % frames.length)
    }, 80)
    return () => clearInterval(timer)
  }, [])

  return (
    <Text color={theme.colors.primary}>
      {frames[frame]} {label && <Text color={theme.colors.muted}>{label}</Text>}
    </Text>
  )
}
