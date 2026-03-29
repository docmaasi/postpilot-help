import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUser, getUserId } from "./lib/auth";

export const list = query({
  args: {
    source: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await getAuthUser(ctx);
    if (!identity) return [];

    const userId = getUserId(identity);

    let assets = await ctx.db
      .query("mediaAssets")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    if (args.source) {
      assets = assets.filter((a) => a.source === args.source);
    }

    if (args.search) {
      const term = args.search.toLowerCase();
      assets = assets.filter(
        (a) =>
          a.fileName.toLowerCase().includes(term) ||
          a.tags?.some((t) => t.toLowerCase().includes(term))
      );
    }

    return assets.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const create = mutation({
  args: {
    fileName: v.string(),
    fileType: v.string(),
    mimeType: v.string(),
    fileSize: v.optional(v.number()),
    storageId: v.optional(v.string()),
    source: v.union(
      v.literal("upload"),
      v.literal("youtube_thumbnail"),
      v.literal("generated")
    ),
    tags: v.optional(v.array(v.string())),
    campaign: v.optional(v.string()),
    project: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await getAuthUser(ctx);
    if (!identity) throw new Error("Not authenticated");

    const userId = getUserId(identity);
    const now = Date.now();

    let fileUrl;
    if (args.storageId) {
      fileUrl = await ctx.storage.getUrl(args.storageId);
    }

    return await ctx.db.insert("mediaAssets", {
      userId,
      ...args,
      fileUrl: fileUrl ?? undefined,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("mediaAssets") },
  handler: async (ctx, args) => {
    const asset = await ctx.db.get(args.id);
    if (asset?.storageId) {
      await ctx.storage.delete(asset.storageId);
    }
    await ctx.db.delete(args.id);
  },
});
