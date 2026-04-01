import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Admin mutation to set a user's plan.
 * Internal only — not exposed to the client.
 */
export const setUserPlan = internalMutation({
  args: {
    visitorId: v.optional(v.string()),
    email: v.optional(v.string()),
    plan: v.union(v.literal("free"), v.literal("creator"), v.literal("pro")),
  },
  handler: async (ctx, args) => {
    let profile = null;

    if (args.visitorId) {
      profile = await ctx.db
        .query("userProfiles")
        .withIndex("by_visitorId", (q) => q.eq("visitorId", args.visitorId!))
        .first();
    }

    if (!profile && args.email) {
      // Search all profiles for matching email
      const all = await ctx.db.query("userProfiles").collect();
      profile = all.find((p) => p.email === args.email);
    }

    if (!profile) {
      // List all profiles so we can find the right one
      const all = await ctx.db.query("userProfiles").collect();
      console.log("All profiles:", JSON.stringify(all.map((p) => ({
        id: p._id,
        visitorId: p.visitorId,
        email: p.email,
        displayName: p.displayName,
        plan: p.plan,
      }))));
      throw new Error(`No profile found. Check logs for all profiles.`);
    }

    await ctx.db.patch(profile._id, { plan: args.plan, updatedAt: Date.now() });
    return { updated: true, profileId: profile._id, plan: args.plan };
  },
});
