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

const statusValidator = v.union(
  v.literal("draft"),
  v.literal("scheduled"),
  v.literal("published"),
  v.literal("failed"),
  v.literal("archived")
);

export const list = query({
  args: {
    platform: v.optional(v.string()),
    status: v.optional(v.string()),
    campaignId: v.optional(v.id("campaigns")),
    youtubeVideoId: v.optional(v.id("youtubeVideos")),
  },
  handler: async (ctx, args) => {
    const identity = await getAuthUser(ctx);
    if (!identity) return [];

    const userId = getUserId(identity);

    let posts = await ctx.db
      .query("posts")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    if (args.platform) {
      posts = posts.filter((p) => p.platform === args.platform);
    }
    if (args.status) {
      posts = posts.filter((p) => p.status === args.status);
    }
    if (args.campaignId) {
      posts = posts.filter((p) => p.campaignId === args.campaignId);
    }
    if (args.youtubeVideoId) {
      posts = posts.filter((p) => p.youtubeVideoId === args.youtubeVideoId);
    }

    return posts.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const getById = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    youtubeVideoId: v.optional(v.id("youtubeVideos")),
    platform: platformValidator,
    content: v.string(),
    hashtags: v.optional(v.array(v.string())),
    mentions: v.optional(v.array(v.string())),
    links: v.optional(v.array(v.string())),
    mediaIds: v.optional(v.array(v.id("mediaAssets"))),
    templateId: v.optional(v.id("templates")),
    status: v.optional(statusValidator),
    scheduledAt: v.optional(v.number()),
    campaignId: v.optional(v.id("campaigns")),
    collectionId: v.optional(v.id("collections")),
    tags: v.optional(v.array(v.string())),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await getAuthUser(ctx);
    if (!identity) throw new Error("Not authenticated");

    const userId = getUserId(identity);
    const now = Date.now();

    return await ctx.db.insert("posts", {
      userId,
      ...args,
      status: args.status ?? "draft",
      isFavorite: false,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("posts"),
    content: v.optional(v.string()),
    hashtags: v.optional(v.array(v.string())),
    mentions: v.optional(v.array(v.string())),
    links: v.optional(v.array(v.string())),
    mediaIds: v.optional(v.array(v.id("mediaAssets"))),
    status: v.optional(statusValidator),
    scheduledAt: v.optional(v.number()),
    publishedAt: v.optional(v.number()),
    publishResult: v.optional(v.string()),
    campaignId: v.optional(v.id("campaigns")),
    collectionId: v.optional(v.id("collections")),
    tags: v.optional(v.array(v.string())),
    notes: v.optional(v.string()),
    isFavorite: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, { ...updates, updatedAt: Date.now() });
  },
});

export const duplicate = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const original = await ctx.db.get(args.id);
    if (!original) throw new Error("Post not found");

    const now = Date.now();
    const { _id, _creationTime, ...rest } = original;

    return await ctx.db.insert("posts", {
      ...rest,
      status: "draft",
      scheduledAt: undefined,
      publishedAt: undefined,
      publishResult: undefined,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "archived",
      updatedAt: Date.now(),
    });
  },
});
