import { createHmac, timingSafeEqual } from "node:crypto"

import { revalidatePath } from "next/cache"

import type { MarblePostEventPayload } from "@/types/marble-webhook"

export function verifyMarbleSignature(
  secret: string,
  signatureHeader: string,
  bodyText: string,
): boolean {
  const expectedHex = signatureHeader.replace(/^sha256=/, "")
  const computedHex = createHmac("sha256", secret)
    .update(bodyText)
    .digest("hex")
  const expected = Buffer.from(expectedHex, "hex")
  const computed = Buffer.from(computedHex, "hex")
  if (expected.length !== computed.length) {
    return false
  }
  return timingSafeEqual(expected, computed)
}

export async function handleMarbleWebhookEvent(payload: MarblePostEventPayload) {
  const { event, data } = payload
  if (!event.startsWith("post") || !data?.slug) {
    return {
      revalidated: false,
      now: Date.now(),
      message: "Event ignored",
    }
  }

  revalidatePath("/blog")
  revalidatePath(`/blog/${data.slug}`)

  return {
    revalidated: true,
    now: Date.now(),
    message: "Post event handled",
  }
}
