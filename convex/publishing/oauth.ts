"use node";

import { action, internalAction } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { PLATFORM_CONFIG } from "./platformConfig";
import crypto from "crypto";

// ─── Generate a random state token ──────────────────
function generateState(): string {
  return crypto.randomBytes(32).toString("base64url");
}

// ─── Generate a PKCE code verifier (43-128 chars) ───
function generateCodeVerifier(): string {
  return crypto.randomBytes(32).toString("base64url");
}

// ─── Initiate OAuth ─────────────────────────────────
export const initiateOAuth = action({
  args: {
    platform: v.string(),
    redirectUri: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const config = PLATFORM_CONFIG[args.platform];
    if (!config) {
      throw new Error(`Unsupported platform: ${args.platform}`);
    }

    const clientId = process.env[config.clientIdEnv];
    if (!clientId) {
      throw new Error(`Missing env var: ${config.clientIdEnv}`);
    }

    const state = generateState();
    // Encode platform:userId:randomState so the HTTP callback can extract userId
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: args.redirectUri,
      response_type: "code",
      scope: config.scopes,
      state: `${args.platform}:${identity.subject}:${state}`,
    });

    // Twitter uses PKCE — add code_challenge (plain method)
    const codeVerifier = generateCodeVerifier();
    if (args.platform === "twitter") {
      params.set("code_challenge", codeVerifier);
      params.set("code_challenge_method", "plain");
    }

    // TikTok uses client_key instead of client_id
    if (args.platform === "tiktok") {
      params.delete("client_id");
      params.set("client_key", clientId);
    }

    const authorizationUrl = `${config.authUrl}?${params.toString()}`;
    return {
      authorizationUrl,
      state,
      codeVerifier: args.platform === "twitter" ? codeVerifier : undefined,
    };
  },
});

// ─── Shared token exchange logic ────────────────────
async function exchangeCodeForTokens(
  ctx: any,
  args: {
    userId: string;
    platform: string;
    code: string;
    redirectUri: string;
    codeVerifier?: string;
  },
) {
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
  if (args.platform === "twitter" && args.codeVerifier) {
    body.set("code_verifier", args.codeVerifier);
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

  // Store connection via internal mutation (pass userId explicitly)
  await ctx.runMutation(internal.publishing.oauthHelpers.storeConnection, {
    userId: args.userId,
    platform: args.platform,
    accessToken: tokens.access_token ?? "",
    refreshToken: tokens.refresh_token ?? "",
    expiresIn: tokens.expires_in ?? 3600,
  });

  return { success: true };
}

// ─── Exchange code for tokens (client-side, authenticated) ──
export const handleCallback = action({
  args: {
    platform: v.string(),
    code: v.string(),
    state: v.string(),
    redirectUri: v.string(),
    codeVerifier: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    return exchangeCodeForTokens(ctx, {
      userId: identity.subject,
      platform: args.platform,
      code: args.code,
      redirectUri: args.redirectUri,
      codeVerifier: args.codeVerifier,
    });
  },
});

// ─── Exchange code for tokens (server-side HTTP callback, no JWT) ──
export const handleCallbackInternal = internalAction({
  args: {
    userId: v.string(),
    platform: v.string(),
    code: v.string(),
    redirectUri: v.string(),
    codeVerifier: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return exchangeCodeForTokens(ctx, args);
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
