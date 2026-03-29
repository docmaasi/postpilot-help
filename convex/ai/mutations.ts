import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

const toneValidator = v.optional(
  v.union(
    v.literal("professional"),
    v.literal("funny"),
    v.literal("bold"),
    v.literal("informative"),
    v.literal("urgent"),
  ),
);

const typeValidator = v.union(
  v.literal("caption"),
  v.literal("rewrite"),
  v.literal("hashtags"),
  v.literal("cta"),
  v.literal("summary"),
  v.literal("sentiment"),
  v.literal("score"),
);

export const saveAiGeneration = internalMutation({
  args: {
    userId: v.string(),
    prompt: v.string(),
    response: v.string(),
    type: typeValidator,
    tone: toneValidator,
    model: v.optional(v.string()),
    tokensUsed: v.optional(v.number()),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("aiGenerations", {
      userId: args.userId,
      prompt: args.prompt,
      response: args.response,
      type: args.type,
      tone: args.tone,
      model: args.model,
      tokensUsed: args.tokensUsed,
      createdAt: args.createdAt,
    });
  },
});
