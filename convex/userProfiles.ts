import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUser, getUserId } from "./lib/auth";
import { isAdminEmail } from "./lib/admin-emails";

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

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_visitorId", (q) => q.eq("visitorId", userId))
      .first();

    if (!profile) return null;

    // Admin emails always get Pro access
    const email = profile.email || identity.email;
    if (isAdminEmail(email) && profile.plan !== "pro") {
      return { ...profile, plan: "pro" };
    }

    return profile;
  },
});

export const upsert = mutation({
  args: {
    displayName: v.optional(v.string()),
    email: v.optional(v.string()),
    timezone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await getAuthUser(ctx);
    if (!identity) throw new Error("Not authenticated");

    const userId = getUserId(identity);
    if (!userId) throw new Error("No user ID found");
    const now = Date.now();

    const existing = await ctx.db
      .query("userProfiles")
      .withIndex("by_visitorId", (q) => q.eq("visitorId", userId))
      .first();

    if (existing) {
      const patch: Record<string, any> = { updatedAt: now };
      if (args.displayName !== undefined) patch.displayName = args.displayName;
      if (args.email !== undefined) patch.email = args.email;
      if (args.timezone !== undefined) patch.timezone = args.timezone;
      // Ensure admin emails always have Pro access in the database
      const effectiveEmail = args.email || existing.email || identity.email;
      if (isAdminEmail(effectiveEmail) && existing.plan !== "pro") {
        patch.plan = "pro";
      }
      await ctx.db.patch(existing._id, patch);
      return existing._id;
    }

    const effectiveEmail = args.email || identity.email;
    const initialPlan = isAdminEmail(effectiveEmail) ? "pro" : "free";
    return await ctx.db.insert("userProfiles", {
      visitorId: userId,
      displayName: args.displayName,
      email: args.email,
      timezone: args.timezone,
      plan: initialPlan,
      referralCode: generateReferralCode(),
      createdAt: now,
      updatedAt: now,
    });
  },
});
