import { httpRouter } from "convex/server";
import { stripeWebhookHandler } from "./webhooks/stripe";
import { oauthCallbackHandler } from "./callbacks/oauth";

const http = httpRouter();

// Health check
http.route({
  path: "/health",
  method: "GET",
  handler: async () => {
    return new Response(JSON.stringify({ status: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  },
});

// Stripe webhook
http.route({
  path: "/stripe-webhook",
  method: "POST",
  handler: stripeWebhookHandler,
});

// OAuth callback — all platforms share a single endpoint
http.route({
  path: "/oauth/callback",
  method: "GET",
  handler: oauthCallbackHandler,
});

export default http;
