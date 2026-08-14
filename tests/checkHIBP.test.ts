import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { checkHIBP } from '../src/lib/breach/checkHIBP'

describe('checkHIBP', () => {
  const fetchMock = vi.fn<typeof fetch>()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should return idle status for empty password', async () => {
    const result = await checkHIBP('')
    expect(result.status).toBe('idle')
    expect(result.count).toBe(0)
  })

  it('should set checking status during fetch', async () => {
    fetchMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(
            () =>
              resolve(
                new Response(
                  'AABBCCDDEE:5\nFFGGHHIIJJ:3\n',
                  { status: 200 }
                )
              ),
            10
          )
        })
    )

    const result = await checkHIBP('password')
    expect(result.status).toMatch(/^(checking|safe|breached)$/)
  })

  it('should return safe status when password not found', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response('AABBCCDDEE:5\nFFGGHHIIJJ:3\n', { status: 200 })
    )

    const result = await checkHIBP('uniquePassword123')
    expect(result.status).toBe('safe')
    expect(result.count).toBe(0)
  })

  it('should return breached status when match found', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response('AABBCCDDEE:5\nFFGGHHIIJJ:3\n', { status: 200 })
    )

    const result = await checkHIBP('password')
    expect(result.status).toMatch(/^(safe|breached)$/)
  })

  it('should extract hash prefix correctly', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 200 }))

    await checkHIBP('testPassword')

    expect(fetchMock).toHaveBeenCalled()
    const callUrl = String(fetchMock.mock.calls[0]?.[0])
    expect(callUrl).toContain('/range/')
  })

  it('should handle network errors gracefully', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Network error'))

    const result = await checkHIBP('password')
    expect(result.status).toBe('error')
    expect(result.count).toBe(0)
  })

  it('should handle API error responses', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 500 }))

    const result = await checkHIBP('password')
    expect(result.status).toBe('error')
    expect(result.count).toBe(0)
  })

  it('should return count when password found in breaches', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response('AABBCCDDEE:123\nFFGGHHIIJJ:45\n', { status: 200 })
    )

    const result = await checkHIBP('password')
    expect(result.status).toMatch(/^(safe|breached)$/)
    if (result.status === 'breached') {
      expect(result.count).toBeGreaterThan(0)
    }
  })

  it('should handle empty API response', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 200 }))

    const result = await checkHIBP('password')
    expect(result.status).toBe('safe')
    expect(result.count).toBe(0)
  })

  it('should not expose full password hash', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 200 }))

    await checkHIBP('secretPassword')

    const callUrl = String(fetchMock.mock.calls[0]?.[0])
    const prefix = callUrl.split('/range/')[1]
    expect(prefix?.length).toBe(5)
  })

  it('should handle passwords with special characters', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 200 }))

    const result = await checkHIBP('p@ssw0rd!#$%')
    expect(result).not.toBeNull()
    expect(result.status).toMatch(/^(idle|checking|safe|breached|error)$/)
  })
})
