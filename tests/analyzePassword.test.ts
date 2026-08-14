import { describe, it, expect } from 'vitest'
import { analyzePassword } from '../src/lib/entropy/analysePassword'

describe('analyzePassword', () => {
  it('should return null for empty password', () => {
    const result = analyzePassword('')
    expect(result).toBeNull()
  })

  it('should return null for undefined-like empty strings', () => {
    const result = analyzePassword('   '.replace(/\s/g, ''))
    expect(result).toBeNull()
  })

  it('should analyze a weak password', () => {
    const result = analyzePassword('123')
    expect(result).not.toBeNull()
    expect(result?.score).toBeLessThan(2)
    expect(result?.guesses).toBeGreaterThan(0)
  })

  it('should analyze a dictionary word', () => {
    const result = analyzePassword('shanghai')
    expect(result).not.toBeNull()
    expect(result?.score).toBeLessThan(3)
    expect(result?.warning).toBeDefined()
  })

  it('should have crackTimeDisplay for weak passwords', () => {
    const result = analyzePassword('password')
    expect(result?.crackTimeDisplay).toBeDefined()
    expect(typeof result?.crackTimeDisplay).toBe('string')
  })

  it('should return suggestions array', () => {
    const result = analyzePassword('weak')
    expect(Array.isArray(result?.suggestions)).toBe(true)
  })

  it('should give higher score to stronger passwords', () => {
    const weak = analyzePassword('password')
    const strong = analyzePassword('P@ssw0rd!Str0ngPassword123!@#')

    expect(weak).not.toBeNull()
    expect(strong).not.toBeNull()
    expect(weak!.score).toBeLessThan(strong!.score)
  })

  it('should handle very long passwords', () => {
    const longPassword = 'aB1!' + 'x'.repeat(200)
    const result = analyzePassword(longPassword)
    expect(result).not.toBeNull()
    expect(result?.score).toBeGreaterThanOrEqual(2)
  })

  it('should identify pattern-based passwords', () => {
    const sequential = analyzePassword('123456')
    expect(sequential?.warning).toBeDefined()
  })

  it('should detect common patterns', () => {
    const result = analyzePassword('qwerty')
    expect(result?.warning).toBeDefined()
  })

  it('score should always be 0-4', () => {
    const passwords = ['a', 'abc', 'password', 'P@ssw0rd!', 'P@ssw0rd!Str0ng123!@#$%^&*()']
    
    passwords.forEach(pwd => {
      const result = analyzePassword(pwd)
      expect(result?.score).toBeGreaterThanOrEqual(0)
      expect(result?.score).toBeLessThanOrEqual(4)
    })
  })

  it('should return positive guesses estimate', () => {
    const result = analyzePassword('password')
    expect(result?.guesses).toBeGreaterThan(0)
  })

  it('should handle special characters', () => {
    const result = analyzePassword('p@ssw0rd!#$%^&*()')
    expect(result).not.toBeNull()
    expect(result?.score).toBeGreaterThanOrEqual(0)
  })

  it('should handle unicode characters', () => {
    const result = analyzePassword('pässwörd123!')
    expect(result).not.toBeNull()
    expect(result?.score).toBeGreaterThanOrEqual(0)
  })
})
