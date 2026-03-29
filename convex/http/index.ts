import { httpRouter } from "convex/server";
import { httpAction } from "../_generated/server";
import { stripeWebhookHandler } from "./webhooks/stripe";
import { oauthCallbackHandler } from "./callbacks/oauth";

const http = httpRouter();

// Health check
const healthHandler = httpAction(async () => {
  return new Response(JSON.stringify({ status: "ok" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});

http.route({ path: "/health", method: "GET", handler: healthHandler });

// Stripe webhook
http.route({ path: "/stripe-webhook", method: "POST", handler: stripeWebhookHandler });

// OAuth callback
http.route({ path: "/oauth/callback", method: "GET", handler: oauthCallbackHandler });

export default http;
