import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUser, getUserId } from "./lib/auth";

export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await getAuthUser(ctx);
    if (!identity) return null;

    const userId = getUserId(identity);
    if (!userId) return null;

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_visitorId", (q) => q.eq("visitorId", userId))
      .first();

    return profile;
  },
});

export const upsert = mutation({
  args: {
    displayName: v.optional(v.string()),
    email: v.optional(v.string()),
    timezone: v.optional(v.string()),
    preferences: v.optional(v.object({
      theme: v.optional(v.string()),
      defaultPlatforms: v.optional(v.array(v.string())),
      emailNotifications: v.optional(v.boolean()),
    })),
  },
  handler: async (ctx, args) => {
    const identity = await getAuthUser(ctx);
    if (!identity) throw new Error("Not authenticated");

    const userId = getUserId(identity);
    const now = Date.now();

    const existing = await ctx.db
      .query("userProfiles")
      .withIndex("by_visitorId", (q) => q.eq("visitorId", userId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("userProfiles", {
      visitorId: userId,
      ...args,
      plan: "free",
      createdAt: now,
      updatedAt: now,
    });
  },
});
