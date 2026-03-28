declare module 'cardinal' {
  const cardinal: {
    highlight: (code: string, options?: any) => string
  }
  export default cardinal
}

declare module 'markdown-it' {
  const markdownIt: () => any
  export default markdownIt
}

declare module 'markdown-it-terminal' {
  const terminal: any
  export default terminal
}
