export interface EntropyResult {
  score: 0 | 1 | 2 | 3 | 4
  guesses: number
  crackTimeDisplay: string
  warning: string
  suggestions: string[]
}

export type BreachStatus = 'idle' | 'checking' | 'safe' | 'breached' | 'error'

export interface BreachResult {
  status: BreachStatus
  count: number
}

export interface PasswordAnalysis {
  entropy: EntropyResult | null
  breach: BreachResult
}