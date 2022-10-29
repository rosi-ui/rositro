export function onnext(fn: () => void) {
  if (typeof fn === 'function') {
    fn()
  }
}
