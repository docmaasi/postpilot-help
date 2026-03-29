"use node";

import Anthropic from "@anthropic-ai/sdk";
import { internal } from "../_generated/api";

function getClient() {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("ANTHROPIC_API_KEY not configured");
  return new Anthropic({ apiKey: key });
}

export async function callClaude(
  systemPrompt: string,
  userMessage: string,
  maxTokens = 512,
) {
  const client = getClient();
  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  const block = response.content[0];
  const text = block.type === "text" ? block.text : "";
  const inputTokens = response.usage?.input_tokens ?? 0;
  const outputTokens = response.usage?.output_tokens ?? 0;

  return { text, tokensUsed: inputTokens + outputTokens };
}

type GenerationType =
  | "caption" | "rewrite" | "hashtags" | "cta"
  | "summary" | "sentiment" | "score";

type ToneType =
  | "professional" | "funny" | "bold" | "informative" | "urgent";

export async function saveGeneration(
  ctx: any,
  userId: string,
  data: {
    prompt: string;
    response: string;
    type: GenerationType;
    tone?: ToneType;
    model: string;
    tokensUsed: number;
  },
) {
  await ctx.runMutation(internal.ai.mutations.saveAiGeneration, {
    userId,
    ...data,
    createdAt: Date.now(),
  });
}

export function formatError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred";
}
