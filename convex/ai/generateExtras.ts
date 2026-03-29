"use node";

import { v } from "convex/values";
import { action } from "../_generated/server";
import { callClaude, saveGeneration, formatError } from "./helpers";

const TONES = [
  "professional",
  "funny",
  "bold",
  "informative",
  "urgent",
] as const;

// ─── Suggest CTAs ────────────────────────────────────
export const suggestCTAs = action({
  args: {
    content: v.string(),
    platform: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const systemPrompt =
      `Suggest 3 compelling call-to-action phrases for this ` +
      `${args.platform} post. Return each on a new line.`;

    try {
      const { text, tokensUsed } = await callClaude(
        systemPrompt,
        args.content,
      );
      const ctas = text
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      await saveGeneration(ctx, identity.subject, {
        prompt: args.content,
        response: text,
        type: "cta",
        model: "claude-haiku-4-5-20251001",
        tokensUsed,
      });
      return { ctas };
    } catch (error) {
      return { error: formatError(error) };
    }
  },
});

// ─── Generate Multiple Tones ─────────────────────────
export const generateMultipleTones = action({
  args: {
    content: v.string(),
    platform: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    try {
      const results: Record<string, string> = {};

      for (const tone of TONES) {
        const prompt =
          `Rewrite this ${args.platform} post in a ${tone} tone. ` +
          `Keep it appropriate for the platform. ` +
          `Return only the rewritten text.`;
        const { text } = await callClaude(prompt, args.content);
        results[tone] = text;
      }

      for (const tone of TONES) {
        if (results[tone]) {
          await saveGeneration(ctx, identity.subject, {
            prompt: args.content,
            response: results[tone],
            type: "rewrite",
            tone,
            model: "claude-haiku-4-5-20251001",
            tokensUsed: 0,
          });
        }
      }

      return { tones: results };
    } catch (error) {
      return { error: formatError(error) };
    }
  },
});
