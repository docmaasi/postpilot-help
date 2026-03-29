"use node";

import { internalAction } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import Stripe from "stripe";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  return new Stripe(key, { apiVersion: "2024-12-18.acacia" as any });
}

export const processWebhook = internalAction({
  args: { body: v.string(), signature: v.string() },
  handler: async (ctx, { body, signature }) => {
    const stripe = getStripe();
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET not configured");

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckout(ctx, event);
        break;
      case "customer.subscription.updated":
        await handleSubUpdate(ctx, event);
        break;
      case "customer.subscription.deleted":
        await handleSubDeleted(ctx, event);
        break;
      case "invoice.payment_failed":
        await handlePaymentFailed(ctx, event);
        break;
      default:
        console.log(`Unhandled event: ${event.type}`);
    }

    return { received: true };
  },
});

async function handleCheckout(ctx: any, event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session.metadata?.convexUserId;
  if (!userId) return;

  if (session.mode === "subscription" && session.subscription) {
    const stripe = getStripe();
    const sub = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    const plan = session.metadata?.plan ?? "creator";
    await ctx.runMutation(internal.payments.subscriptions.updatePlan, {
      userId,
      stripeSubscriptionId: sub.id,
      plan,
      status: "active",
      currentPeriodEnd: sub.current_period_end * 1000,
    });
  } else if (session.mode === "payment") {
    const packType = session.metadata?.packType;
    if (packType) {
      await ctx.runMutation(internal.payments.packs.fulfillPack, {
        userId,
        packType,
        stripePaymentId: session.payment_intent as string,
      });
    }
  }
}

async function handleSubUpdate(ctx: any, event: Stripe.Event) {
  const sub = event.data.object as Stripe.Subscription;
  const userId = sub.metadata?.convexUserId;
  if (!userId) return;

  const plan = sub.metadata?.plan ?? "creator";
  const status = sub.status === "active" ? "active"
    : sub.status === "past_due" ? "past_due"
    : sub.status === "canceled" ? "canceled"
    : "active";

  await ctx.runMutation(internal.payments.subscriptions.updatePlan, {
    userId,
    stripeSubscriptionId: sub.id,
    plan,
    status,
    currentPeriodEnd: sub.current_period_end * 1000,
  });
}

async function handleSubDeleted(ctx: any, event: Stripe.Event) {
  const sub = event.data.object as Stripe.Subscription;
  const userId = sub.metadata?.convexUserId;
  if (!userId) return;

  await ctx.runMutation(internal.payments.subscriptions.updatePlan, {
    userId,
    stripeSubscriptionId: sub.id,
    plan: "free",
    status: "canceled",
    currentPeriodEnd: Date.now(),
  });
}

async function handlePaymentFailed(ctx: any, event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice;
  const sub = invoice.subscription;
  if (!sub || typeof sub !== "string") return;

  const userId = invoice.metadata?.convexUserId;
  if (!userId) return;

  await ctx.runMutation(internal.payments.subscriptions.updatePlan, {
    userId,
    stripeSubscriptionId: sub,
    plan: invoice.metadata?.plan ?? "creator",
    status: "past_due",
    currentPeriodEnd: Date.now(),
  });
}
