"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import Stripe from "stripe";
import { api, internal } from "../_generated/api";

// ── Stripe Price IDs ───────────────────────────────

const SUBSCRIPTION_PRICES: Record<string, string> = {
  creator: "price_1TGK2pDw3DaD2xXn2hxEmYbI",
  pro: "price_1TGK7MDw3DaD2xXnrVsjzq31",
};

const PACK_PRICES: Record<string, string> = {
  content_blitz: "price_1TGK98Dw3DaD2xXnEEwX5ySJ",
  viral_growth: "price_1TGKArDw3DaD2xXnAUhS0GYL",
  analytics: "price_1TGKCMDw3DaD2xXnz6avRrQF",
};

// ── Stripe client ───────────────────────────────────

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  return new Stripe(key, { apiVersion: "2024-12-18.acacia" as any });
}

// ── Get or create Stripe customer ───────────────────

async function getOrCreateCustomer(
  stripe: Stripe,
  ctx: any,
  userId: string,
  email?: string
): Promise<string> {
  const profile = await ctx.runQuery(api.userProfiles.getCurrent);
  if (profile?.stripeCustomerId) return profile.stripeCustomerId;

  const customer = await stripe.customers.create({
    email: email ?? undefined,
    metadata: { convexUserId: userId },
  });

  await ctx.runMutation(internal.payments.subscriptions.setStripeCustomerId, {
    userId,
    stripeCustomerId: customer.id,
  });

  return customer.id;
}

// ── Create checkout for subscription ────────────────

export const createCheckoutSession = action({
  args: {
    plan: v.union(v.literal("creator"), v.literal("pro")),
    successUrl: v.string(),
    cancelUrl: v.string(),
  },
  handler: async (ctx, { plan, successUrl, cancelUrl }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;
    const email = identity.email ?? undefined;
    const stripe = getStripe();
    const customerId = await getOrCreateCustomer(stripe, ctx, userId, email);
    const priceId = SUBSCRIPTION_PRICES[plan];

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        metadata: { plan, convexUserId: userId },
      },
      metadata: { plan, convexUserId: userId },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return session.url;
  },
});

// ── Create checkout for one-time pack ───────────────

export const createPackCheckoutSession = action({
  args: {
    packType: v.union(
      v.literal("content_blitz"),
      v.literal("viral_growth"),
      v.literal("analytics")
    ),
    successUrl: v.string(),
    cancelUrl: v.string(),
  },
  handler: async (ctx, { packType, successUrl, cancelUrl }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;
    const email = identity.email ?? undefined;
    const stripe = getStripe();
    const customerId = await getOrCreateCustomer(stripe, ctx, userId, email);
    const priceId = PACK_PRICES[packType];

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { packType, convexUserId: userId },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return session.url;
  },
});

// ── Customer portal session ─────────────────────────

export const createCustomerPortalSession = action({
  args: { returnUrl: v.string() },
  handler: async (ctx, { returnUrl }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const profile = await ctx.runQuery(api.userProfiles.getCurrent);
    if (!profile?.stripeCustomerId) {
      throw new Error("No Stripe customer found. Subscribe first.");
    }

    const stripe = getStripe();
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripeCustomerId,
      return_url: returnUrl,
    });

    return session.url;
  },
});
