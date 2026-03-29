import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUser, getUserId } from "./lib/auth";

export const list = query({
  args: {
    status: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await getAuthUser(ctx);
    if (!identity) return [];

    const userId = getUserId(identity);

    let videos;
    if (args.status) {
      videos = await ctx.db
        .query("youtubeVideos")
        .withIndex("by_status", (q) =>
          q.eq("userId", userId).eq("status", args.status as any)
        )
        .collect();
    } else {
      videos = await ctx.db
        .query("youtubeVideos")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .collect();
    }

    // Client-side search filter
    if (args.search) {
      const term = args.search.toLowerCase();
      videos = videos.filter(
        (v) =>
          v.title.toLowerCase().includes(term) ||
          v.description?.toLowerCase().includes(term) ||
          v.tags?.some((t) => t.toLowerCase().includes(term))
      );
    }

    return videos.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const getById = query({
  args: { id: v.id("youtubeVideos") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    url: v.string(),
    videoId: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    publishDate: v.optional(v.number()),
    duration: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await getAuthUser(ctx);
    if (!identity) throw new Error("Not authenticated");

    const userId = getUserId(identity);
    const now = Date.now();

    return await ctx.db.insert("youtubeVideos", {
      userId,
      ...args,
      status: "imported",
      isFavorite: false,
      isArchived: false,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("youtubeVideos"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    notes: v.optional(v.string()),
    isFavorite: v.optional(v.boolean()),
    isArchived: v.optional(v.boolean()),
    status: v.optional(v.union(
      v.literal("imported"),
      v.literal("in_progress"),
      v.literal("repurposed")
    )),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, { ...updates, updatedAt: Date.now() });
  },
});

export const remove = mutation({
  args: { id: v.id("youtubeVideos") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      isArchived: true,
      updatedAt: Date.now(),
    });
  },
});
