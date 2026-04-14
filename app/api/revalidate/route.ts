import { NextResponse } from "next/server"

import {
  handleMarbleWebhookEvent,
  verifyMarbleSignature,
} from "@/lib/marble/webhook"
import type { MarblePostEventPayload } from "@/types/marble-webhook"

export async function POST(request: Request) {
  const signature = request.headers.get("x-marble-signature")
  const secret = process.env.MARBLE_WEBHOOK_SECRET

  if (!secret || !signature) {
    return NextResponse.json(
      { error: "Secret or signature missing" },
      { status: 400 },
    )
  }

  const bodyText = await request.text()

  if (!verifyMarbleSignature(secret, signature, bodyText)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  let payload: MarblePostEventPayload
  try {
    payload = JSON.parse(bodyText) as MarblePostEventPayload
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  if (!payload.event || !payload.data) {
    return NextResponse.json(
      { error: "Invalid payload structure" },
      { status: 400 },
    )
  }

  try {
    const result = await handleMarbleWebhookEvent(payload)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 },
    )
  }
}
