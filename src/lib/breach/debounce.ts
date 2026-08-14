/**
 * Generic debounce utility. Delays invoking `fn` until `delay` ms have
 * passed without a new call. Used to limit HIBP requests to one per
 * 300ms of typing inactivity, per the Breach Pipeline design.
 */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number
): (...args: Args) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return (...args: Args) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}