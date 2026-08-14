import { useEffect, useMemo, useState } from 'react'
import { analyzePassword } from '../lib/entropy/analysePassword'
import { checkHIBP } from '../lib/breach/checkHIBP'
import { debounce } from '../lib/breach/debounce'
import type { PasswordAnalysis } from '../lib/types'

const DEBOUNCE_MS = 300

/**
 * Orchestrates the dual-pipeline data flow from the system architecture:
 * the Entropy Pipeline runs synchronously on every keystroke, while the
 * Breach Pipeline is debounced (300ms) since it involves a network call.
 */
export function usePasswordAnalysis(password: string): PasswordAnalysis {
  const [breach, setBreach] = useState<PasswordAnalysis['breach']>({
    status: 'idle',
    count: 0,
  })

  // Compute entropy synchronously in a memo - no state needed
  const entropy = useMemo(
    () => analyzePassword(password),
    [password]
  )

  const debouncedBreachCheck = useMemo(
    () =>
      debounce(async (value: string) => {
        // Handle empty password case
        if (!value) {
          setBreach({ status: 'idle', count: 0 })
          return
        }
        setBreach({ status: 'checking', count: 0 })
        const result = await checkHIBP(value)
        setBreach(result)
      }, DEBOUNCE_MS),
    []
  )

  useEffect(() => {
    // Breach Pipeline: debounced, asynchronous.
    debouncedBreachCheck(password)
  }, [password, debouncedBreachCheck])

  return { entropy, breach }
}