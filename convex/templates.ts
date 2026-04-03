import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUser, getUserId } from "./lib/auth";

const platformValidator = v.union(
  v.literal("twitter"),
  v.literal("instagram"),
  v.literal("facebook"),
  v.literal("linkedin"),
  v.literal("tiktok"),
  v.literal("youtube_community"),
  v.literal("threads")
);

export const list = query({
  args: { platform: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const identity = await getAuthUser(ctx);
    if (!identity) return [];

    const userId = getUserId(identity);

    let templates = await ctx.db
      .query("templates")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    if (args.platform) {
      templates = templates.filter((t) => t.platform === args.platform);
    }

    return templates.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    platform: platformValidator,
    content: v.string(),
    hashtags: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await getAuthUser(ctx);
    if (!identity) throw new Error("Not authenticated");

    const userId = getUserId(identity);
    const now = Date.now();

    return await ctx.db.insert("templates", {
      userId,
      ...args,
      isDefault: false,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("templates"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    content: v.optional(v.string()),
    hashtags: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    isDefault: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await getAuthUser(ctx);
    if (!identity) throw new Error("Not authenticated");

    const template = await ctx.db.get(args.id);
    if (!template || template.userId !== getUserId(identity)) {
      throw new Error("Template not found");
    }

    const { id, ...updates } = args;
    await ctx.db.patch(id, { ...updates, updatedAt: Date.now() });
  },
});

export const remove = mutation({
  args: { id: v.id("templates") },
  handler: async (ctx, args) => {
    const identity = await getAuthUser(ctx);
    if (!identity) throw new Error("Not authenticated");

    const template = await ctx.db.get(args.id);
    if (!template || template.userId !== getUserId(identity)) {
      throw new Error("Template not found");
    }

    await ctx.db.delete(args.id);
  },
});
