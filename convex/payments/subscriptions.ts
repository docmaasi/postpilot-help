import {
  query,
  internalMutation,
} from "../_generated/server";
import { v } from "convex/values";
import { getAuthUser, getUserId } from "../lib/auth";

// ── Queries ─────────────────────────────────────────

export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await getAuthUser(ctx);
    if (!identity) return null;

    const userId = getUserId(identity);
    return ctx.db
      .query("subscriptions")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
  },
});

export const getUsage = query({
  args: {},
  handler: async (ctx) => {
    const identity = await getAuthUser(ctx);
    if (!identity) return null;

    const userId = getUserId(identity);
    return ctx.db
      .query("usageLimits")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
  },
});

// ── Internal mutations (called by webhook) ──────────

export const setStripeCustomerId = internalMutation({
  args: {
    userId: v.string(),
    stripeCustomerId: v.string(),
  },
  handler: async (ctx, { userId, stripeCustomerId }) => {
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_visitorId", (q) => q.eq("visitorId", userId))
      .first();
    if (!profile) return;

    await ctx.db.patch(profile._id, {
      stripeCustomerId,
      updatedAt: Date.now(),
    });
  },
});

export const updatePlan = internalMutation({
  args: {
    userId: v.string(),
    plan: v.union(
      v.literal("free"),
      v.literal("creator"),
      v.literal("pro")
    ),
    stripeSubscriptionId: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("canceled"),
      v.literal("past_due"),
      v.literal("trialing")
    ),
    currentPeriodEnd: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_visitorId", (q) => q.eq("visitorId", args.userId))
      .first();
    if (profile) {
      await ctx.db.patch(profile._id, {
        plan: args.plan,
        updatedAt: now,
      });
    }

    const existing = await ctx.db
      .query("subscriptions")
      .withIndex("by_stripe_id", (q) =>
        q.eq("stripeSubscriptionId", args.stripeSubscriptionId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        plan: args.plan,
        status: args.status,
        currentPeriodEnd: args.currentPeriodEnd,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("subscriptions", {
        userId: args.userId,
        stripeSubscriptionId: args.stripeSubscriptionId,
        plan: args.plan,
        status: args.status,
        currentPeriodEnd: args.currentPeriodEnd,
        createdAt: now,
        updatedAt: now,
      });
    }
  },
});

export const logWebhookEvent = internalMutation({
  args: {
    userId: v.string(),
    action: v.string(),
    entityType: v.string(),
    entityId: v.optional(v.string()),
    details: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("activityLog", {
      userId: args.userId,
      action: args.action,
      entityType: args.entityType,
      entityId: args.entityId,
      details: args.details,
      createdAt: Date.now(),
    });
  },
});
