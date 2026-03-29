import { httpAction } from "../../_generated/server";
import { internal } from "../../_generated/api";

/**
 * Stripe webhook HTTP handler.
 * This runs in Convex's default runtime (not Node.js).
 * It forwards the raw body + signature to a Node action for verification.
 */
export const stripeWebhookHandler = httpAction(async (ctx, request) => {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  try {
    const result = await ctx.runAction(
      internal.payments.stripeWebhook.processWebhook,
      { body, signature }
    );
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Stripe webhook error:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
});
