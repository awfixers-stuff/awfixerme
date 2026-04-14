import { Marble } from "@usemarble/sdk"

let cached: Marble | null | undefined

/**
 * Server-only Marble API client. Returns null when `MARBLE_API_KEY` is unset.
 */
export function getMarble(): Marble | null {
  if (cached !== undefined) {
    return cached
  }
  const key = process.env.MARBLE_API_KEY?.trim()
  if (!key) {
    cached = null
    return null
  }
  cached = new Marble({ apiKey: key })
  return cached
}
