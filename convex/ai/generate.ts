"use node";

import { v } from "convex/values";
import { action } from "../_generated/server";
import { callClaude, saveGeneration, formatError } from "./helpers";

// ─── Summarize YouTube Video → Caption ───────────────
export const summarizeVideo = action({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    platform: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const systemPrompt =
      `You are a social media expert. Generate a compelling ${args.platform} ` +
      `caption from this YouTube video. Follow platform best practices ` +
      `and character limits.`;
    let userMsg = `Video title: ${args.title}`;
    if (args.description) userMsg += `\nDescription: ${args.description}`;

    try {
      const { text, tokensUsed } = await callClaude(systemPrompt, userMsg);
      await saveGeneration(ctx, identity.subject, {
        prompt: userMsg,
        response: text,
        type: "caption",
        model: "claude-haiku-4-5-20251001",
        tokensUsed,
      });
      return { caption: text };
    } catch (error) {
      return { error: formatError(error) };
    }
  },
});

// ─── Rewrite for Platform ────────────────────────────
export const rewriteForPlatform = action({
  args: {
    content: v.string(),
    fromPlatform: v.string(),
    toPlatform: v.string(),
    tone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const tone = args.tone ?? "professional";
    const systemPrompt =
      `Rewrite this social media post for ${args.toPlatform}. ` +
      `Original platform: ${args.fromPlatform}. Tone: ${tone}. ` +
      `Follow character limits and best practices.`;

    try {
      const { text, tokensUsed } = await callClaude(
        systemPrompt,
        args.content,
      );
      await saveGeneration(ctx, identity.subject, {
        prompt: args.content,
        response: text,
        type: "rewrite",
        tone: tone as any,
        model: "claude-haiku-4-5-20251001",
        tokensUsed,
      });
      return { rewritten: text };
    } catch (error) {
      return { error: formatError(error) };
    }
  },
});

// ─── Suggest Hashtags ────────────────────────────────
export const suggestHashtags = action({
  args: {
    content: v.string(),
    platform: v.string(),
    count: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const count = args.count ?? 10;
    const systemPrompt =
      `Suggest ${count} relevant hashtags for this ${args.platform} post. ` +
      `Return only the hashtags, one per line, with # prefix.`;

    try {
      const { text, tokensUsed } = await callClaude(
        systemPrompt,
        args.content,
      );
      const hashtags = text
        .split("\n")
        .map((h) => h.trim())
        .filter((h) => h.startsWith("#"));

      await saveGeneration(ctx, identity.subject, {
        prompt: args.content,
        response: text,
        type: "hashtags",
        model: "claude-haiku-4-5-20251001",
        tokensUsed,
      });
      return { hashtags };
    } catch (error) {
      return { error: formatError(error) };
    }
  },
});
