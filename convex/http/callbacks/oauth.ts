import { httpAction } from "../../_generated/server";
import { internal } from "../../_generated/api";

/**
 * OAuth callback handler.
 * Receives the authorization code from the platform,
 * exchanges it for tokens, then redirects to the app.
 */
export const oauthCallbackHandler = httpAction(async (ctx, request) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const stateParam = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  // Base URL for redirects (fall back to localhost in dev)
  const appUrl = process.env.VITE_WEB_URL ?? "http://localhost:3000";

  // Handle user-denied or error from platform
  if (error) {
    const redirectUrl = `${appUrl}/connections?error=${encodeURIComponent(error)}`;
    return Response.redirect(redirectUrl, 302);
  }

  // Validate required params
  if (!code || !stateParam) {
    const redirectUrl = `${appUrl}/connections?error=missing_params`;
    return Response.redirect(redirectUrl, 302);
  }

  // Parse state (format: "platform:userId:randomState")
  const parts = stateParam.split(":");
  if (parts.length < 3) {
    const redirectUrl = `${appUrl}/connections?error=invalid_state`;
    return Response.redirect(redirectUrl, 302);
  }

  const platform = parts[0];
  const userId = parts[1];
  const convexUrl = process.env.CONVEX_SITE_URL ?? "";
  const redirectUri = `${convexUrl}/oauth/callback`;

  // For Twitter (PKCE), redirect to client with code so it can use stored codeVerifier
  if (platform === "twitter") {
    const clientCallbackUrl = `${appUrl}/connections?oauth_code=${encodeURIComponent(code)}&platform=${platform}&state=${encodeURIComponent(stateParam)}`;
    return Response.redirect(clientCallbackUrl, 302);
  }

  try {
    await ctx.runAction(internal.publishing.oauth.handleCallbackInternal, {
      userId,
      platform,
      code,
      redirectUri,
    });

    const successUrl = `${appUrl}/connections?connected=${platform}`;
    return Response.redirect(successUrl, 302);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    const failUrl = `${appUrl}/connections?error=${encodeURIComponent(msg)}`;
    return Response.redirect(failUrl, 302);
  }
});
