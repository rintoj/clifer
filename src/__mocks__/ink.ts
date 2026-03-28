export const Box = ({ children }: any) => children
export const Text = ({ children }: any) => children

export function render(_element: any) {
  return {
    unmount: () => {},
    waitUntilExit: () => Promise.resolve(),
  }
}
