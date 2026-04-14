/** Payload for Marble `post.*` webhook events (subset used for revalidation). */
export type MarblePostEventPayload = {
  event: string
  data: {
    id: string
    slug: string
    title?: string
    userId?: string
  }
}
