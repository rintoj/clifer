// Test-environment sniff: `typeof jest !== 'undefined'` is used to switch to
// plain-text rendering under the test runner. Declared here so the guard
// type-checks; `jest` is absent at runtime outside tests (typeof is safe).
declare const jest: undefined | Record<string, unknown>

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
