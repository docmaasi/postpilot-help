"use node";

import { action, internalAction } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { PLATFORM_CONFIG } from "./platformConfig";

// ─── Generate a random state token ──────────────────
function generateState(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ─── Initiate OAuth ─────────────────────────────────
export const initiateOAuth = action({
  args: {
    platform: v.string(),
    redirectUri: v.string(),
  },
  handler: async (_ctx, args) => {
    const config = PLATFORM_CONFIG[args.platform];
    if (!config) {
      throw new Error(`Unsupported platform: ${args.platform}`);
    }

    const clientId = process.env[config.clientIdEnv];
    if (!clientId) {
      throw new Error(`Missing env var: ${config.clientIdEnv}`);
    }

    const state = generateState();
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: args.redirectUri,
      response_type: "code",
      scope: config.scopes,
      state: `${args.platform}:${state}`,
    });

    // Twitter uses PKCE — add code_challenge
    if (args.platform === "twitter") {
      params.set("code_challenge", "challenge");
      params.set("code_challenge_method", "plain");
    }

    // TikTok uses client_key instead of client_id
    if (args.platform === "tiktok") {
      params.delete("client_id");
      params.set("client_key", clientId);
    }

    const authorizationUrl = `${config.authUrl}?${params.toString()}`;
    return { authorizationUrl, state };
  },
});

// ─── Exchange code for tokens ───────────────────────
export const handleCallback = action({
  args: {
    platform: v.string(),
    code: v.string(),
    state: v.string(),
    redirectUri: v.string(),
  },
  handler: async (ctx, args) => {
    const config = PLATFORM_CONFIG[args.platform];
    if (!config) {
      throw new Error(`Unsupported platform: ${args.platform}`);
    }

    const clientId = process.env[config.clientIdEnv];
    const clientSecret = process.env[config.clientSecretEnv];
    if (!clientId || !clientSecret) {
      throw new Error(`Missing OAuth credentials for ${args.platform}`);
    }

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: args.code,
      redirect_uri: args.redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    // Twitter uses PKCE code_verifier
    if (args.platform === "twitter") {
      body.set("code_verifier", "challenge");
    }

    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Token exchange failed: ${errorText}`);
    }

    const tokens = await response.json();

    // Store connection via internal mutation
    await ctx.runMutation(internal.publishing.oauthHelpers.storeConnection, {
      platform: args.platform,
      accessToken: tokens.access_token ?? "",
      refreshToken: tokens.refresh_token ?? "",
      expiresIn: tokens.expires_in ?? 3600,
    });

    return { success: true };
  },
});

// ─── Refresh expired token ──────────────────────────
export const refreshToken = internalAction({
  args: { connectionId: v.id("platformConnections") },
  handler: async (ctx, args) => {
    const connection = await ctx.runQuery(
      internal.publishing.oauthHelpers.getConnection,
      { connectionId: args.connectionId }
    );
    if (!connection) throw new Error("Connection not found");

    const config = PLATFORM_CONFIG[connection.platform];
    if (!config) throw new Error("Unsupported platform");

    const clientId = process.env[config.clientIdEnv];
    const clientSecret = process.env[config.clientSecretEnv];
    if (!clientId || !clientSecret) {
      throw new Error("Missing OAuth credentials");
    }

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: connection.refreshToken ?? "",
      client_id: clientId,
      client_secret: clientSecret,
    });

    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    const tokens = await response.json();

    await ctx.runMutation(internal.publishing.oauthHelpers.updateTokens, {
      connectionId: args.connectionId,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token ?? connection.refreshToken ?? "",
      expiresIn: tokens.expires_in ?? 3600,
    });

    return { success: true };
  },
});
