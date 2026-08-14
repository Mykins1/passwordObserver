import { ZxcvbnFactory } from '@zxcvbn-ts/core'
import type { EntropyResult } from '../types'

const zxcvbn = new ZxcvbnFactory()

/**
 * Runs the zxcvbn pattern-decomposition engine against a raw password.
 *
 * This is the Entropy Pipeline from the system architecture: it executes
 * synchronously, entirely client-side, on every keystroke. The password
 * never leaves the browser at any point in this pipeline.
 */
export function analyzePassword(password: string): EntropyResult | null {
  if (!password) return null

  const result = zxcvbn.check(password)

  return {
    score: result.score as EntropyResult['score'],
    guesses: result.guesses,
    crackTimeDisplay: String(
      result.crackTimes.onlineThrottlingXPerHour.display
    ),
    warning: result.feedback.warning || '',
    suggestions: result.feedback.suggestions,
  }
}