import { describe, it, expect } from 'vitest'
import { sha1Hash } from '../src/lib/breach/hashPassword'

describe('sha1Hash', () => {
  it('should hash a simple password correctly', async () => {
    const hash = await sha1Hash('password')
    // SHA-1 hash of 'password'
    expect(hash).toBe('5BAA61E4C9B93F3F0682250B6CF8331B7EE68FD8')
  })

  it('should hash an empty string', async () => {
    const hash = await sha1Hash('')
    // SHA-1 hash of empty string
    expect(hash).toBe('DA39A3EE5E6B4B0D3255BFEF95601890AFD80709')
  })

  it('should return uppercase hex', async () => {
    const hash = await sha1Hash('test')
    expect(hash).toMatch(/^[A-F0-9]{40}$/)
  })

  it('should return exactly 40 characters', async () => {
    const hash = await sha1Hash('shanghai')
    expect(hash.length).toBe(40)
  })

  it('should consistently hash the same input', async () => {
    const input = 'consistent'
    const hash1 = await sha1Hash(input)
    const hash2 = await sha1Hash(input)
    expect(hash1).toBe(hash2)
  })

  it('should produce different hashes for different inputs', async () => {
    const hash1 = await sha1Hash('password1')
    const hash2 = await sha1Hash('password2')
    expect(hash1).not.toBe(hash2)
  })

  it('should handle special characters', async () => {
    const hash = await sha1Hash('p@ssw0rd!#$%')
    expect(hash).toMatch(/^[A-F0-9]{40}$/)
  })

  it('should handle unicode characters', async () => {
    const hash = await sha1Hash('pässwörd')
    expect(hash).toMatch(/^[A-F0-9]{40}$/)
  })

  it('should handle long strings', async () => {
    const longPassword = 'a'.repeat(1000)
    const hash = await sha1Hash(longPassword)
    expect(hash.length).toBe(40)
  })
})
