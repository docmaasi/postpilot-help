/**
 * Auth helpers for Clerk + Convex.
 *
 * With Clerk, ctx.auth.getUserIdentity() returns the Clerk user identity
 * including subject (user ID), email, name, etc.
 */

/**
 * Safely get the authenticated user identity.
 * Returns null instead of throwing if not authenticated.
 */
export async function getAuthUser(ctx: { auth: any }) {
  const identity = await ctx.auth.getUserIdentity();
  return identity ?? null;
}

/**
 * Get the Clerk user ID from the identity.
 * This is the `subject` field on the JWT token.
 */
export function getUserId(identity: any): string {
  return identity?.subject ?? "";
}

/**
 * Require authentication — throws if not logged in.
 */
export async function requireAuth(ctx: { auth: any }) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated");
  }
  return identity;
}
