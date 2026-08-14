/**
 * Computes a SHA-1 digest of the given input using the browser's native
 * Web Crypto API (crypto.subtle). No external library is required.
 *
 * This runs entirely client-side. The result is uppercase hex, matching
 * the format the Have I Been Pwned API expects.
 */
export async function sha1Hash(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-1', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  return hashArray
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
}