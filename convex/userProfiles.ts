import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUser, getUserId } from "./lib/auth";

function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await getAuthUser(ctx);
    if (!identity) return null;

    const userId = getUserId(identity);
    if (!userId) return null;

    return await ctx.db
      .query("userProfiles")
      .withIndex("by_visitorId", (q) => q.eq("visitorId", userId))
      .first();
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
    // Flat convenience fields (wrapped into preferences)
    theme: v.optional(v.string()),
    defaultPlatforms: v.optional(v.array(v.string())),
    emailNotifications: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await getAuthUser(ctx);
    if (!identity) throw new Error("Not authenticated");

    const userId = getUserId(identity);
    const now = Date.now();

    // Build preferences from flat fields or nested object
    const prefs = args.preferences ?? {};
    if (args.theme !== undefined) prefs.theme = args.theme;
    if (args.defaultPlatforms !== undefined) prefs.defaultPlatforms = args.defaultPlatforms;
    if (args.emailNotifications !== undefined) prefs.emailNotifications = args.emailNotifications;

    const updateData: Record<string, any> = { updatedAt: now };
    if (args.displayName !== undefined) updateData.displayName = args.displayName;
    if (args.email !== undefined) updateData.email = args.email;
    if (args.timezone !== undefined) updateData.timezone = args.timezone;
    if (Object.keys(prefs).length > 0) updateData.preferences = prefs;

    const existing = await ctx.db
      .query("userProfiles")
      .withIndex("by_visitorId", (q) => q.eq("visitorId", userId))
      .first();

    if (existing) {
      // Merge existing preferences with new ones
      if (updateData.preferences && existing.preferences) {
        updateData.preferences = { ...existing.preferences, ...updateData.preferences };
      }
      await ctx.db.patch(existing._id, updateData);
      return existing._id;
    }

    return await ctx.db.insert("userProfiles", {
      visitorId: userId,
      displayName: args.displayName,
      email: args.email ?? identity.email ?? undefined,
      timezone: args.timezone,
      preferences: Object.keys(prefs).length > 0 ? prefs : undefined,
      plan: "free",
      referralCode: generateReferralCode(),
      createdAt: now,
      updatedAt: now,
    });
  },
});
