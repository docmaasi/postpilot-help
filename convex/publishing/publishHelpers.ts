import { internalMutation, internalQuery } from "../_generated/server";
import { v } from "convex/values";

// ─── Get a post by ID (internal) ────────────────────
export const getPost = internalQuery({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.postId);
  },
});

// ─── Get platform connection for user (internal) ────
export const getConnectionForPlatform = internalQuery({
  args: {
    userId: v.string(),
    platform: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("platformConnections")
      .withIndex("by_platform", (q) =>
        q.eq("userId", args.userId).eq("platform", args.platform)
      )
      .first();
  },
});

// ─── Log a publish attempt (internal) ───────────────
export const logPublish = internalMutation({
  args: {
    userId: v.string(),
    postId: v.id("posts"),
    platform: v.string(),
    status: v.union(
      v.literal("success"),
      v.literal("failed"),
      v.literal("pending")
    ),
    errorMessage: v.optional(v.string()),
    externalPostId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("publishLog", {
      userId: args.userId,
      postId: args.postId,
      platform: args.platform,
      status: args.status,
      errorMessage: args.errorMessage,
      externalPostId: args.externalPostId,
      publishedAt: Date.now(),
    });
  },
});

// ─── Update post status after publish (internal) ────
export const updatePostStatus = internalMutation({
  args: {
    postId: v.id("posts"),
    status: v.string(),
    publishResult: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    await ctx.db.patch(args.postId, {
      status: args.status as "published" | "failed",
      publishResult: args.publishResult,
      publishedAt: args.status === "published" ? now : undefined,
      updatedAt: now,
    });
  },
});
