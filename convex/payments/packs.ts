import { internalMutation, query } from "../_generated/server";
import { v } from "convex/values";
import { getAuthUser, getUserId } from "../lib/auth";

// ── Get pack balances for current user ──────────────
export const getBalances = query({
  args: {},
  handler: async (ctx) => {
    const identity = await getAuthUser(ctx);
    if (!identity) return [];

    const userId = getUserId(identity);
    const balance = await ctx.db
      .query("packBalances")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (!balance) return [];

    const items: { label: string; remaining: number }[] = [];
    if (balance.aiRewrites > 0) {
      items.push({ label: "AI Rewrites", remaining: balance.aiRewrites });
    }
    if (balance.scheduledPosts > 0) {
      items.push({ label: "Scheduled Posts", remaining: balance.scheduledPosts });
    }
    if (balance.circleSlots > 0) {
      items.push({ label: "Circle Slots", remaining: balance.circleSlots });
    }
    if (balance.analyticsUnlocked) {
      items.push({ label: "Analytics", remaining: 1 });
    }
    if (balance.viralTemplatesUnlocked) {
      items.push({ label: "Viral Templates", remaining: 1 });
    }
    return items;
  },
});

// ── Pack credit mapping ─────────────────────────────

function getPackCredits(packType: string) {
  const defaults = {
    aiRewrites: 0,
    scheduledPosts: 0,
    circleSlots: 0,
    analyticsUnlocked: false,
    viralTemplatesUnlocked: false,
  };

  switch (packType) {
    case "content_blitz":
      return { ...defaults, aiRewrites: 25, scheduledPosts: 50 };
    case "viral_growth":
      return { ...defaults, circleSlots: 10, viralTemplatesUnlocked: true };
    case "analytics":
      return { ...defaults, analyticsUnlocked: true };
    default:
      return defaults;
  }
}

// ── Fulfill pack purchase ───────────────────────────

export const fulfillPack = internalMutation({
  args: {
    userId: v.string(),
    packType: v.union(
      v.literal("content_blitz"),
      v.literal("viral_growth"),
      v.literal("analytics")
    ),
    stripePaymentId: v.string(),
  },
  handler: async (ctx, { userId, packType, stripePaymentId }) => {
    const now = Date.now();

    // Record purchase
    await ctx.db.insert("addOnPurchases", {
      userId,
      packType,
      stripePaymentId,
      status: "active",
      purchasedAt: now,
      createdAt: now,
    });

    // Add credits to pack balances
    const existing = await ctx.db
      .query("packBalances")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    const credits = getPackCredits(packType);

    if (existing) {
      await ctx.db.patch(existing._id, {
        aiRewrites: existing.aiRewrites + credits.aiRewrites,
        scheduledPosts: existing.scheduledPosts + credits.scheduledPosts,
        circleSlots: existing.circleSlots + credits.circleSlots,
        analyticsUnlocked:
          existing.analyticsUnlocked || credits.analyticsUnlocked,
        viralTemplatesUnlocked:
          existing.viralTemplatesUnlocked || credits.viralTemplatesUnlocked,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("packBalances", {
        userId,
        aiRewrites: credits.aiRewrites,
        scheduledPosts: credits.scheduledPosts,
        circleSlots: credits.circleSlots,
        analyticsUnlocked: credits.analyticsUnlocked,
        viralTemplatesUnlocked: credits.viralTemplatesUnlocked,
        updatedAt: now,
      });
    }
  },
});
