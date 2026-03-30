import { query } from "./_generated/server";

export const checkAuth = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { authenticated: false, message: "No identity found" };
    }
    return {
      authenticated: true,
      subject: identity.subject,
      issuer: identity.issuer,
      email: identity.email,
      name: identity.name,
      tokenIdentifier: identity.tokenIdentifier,
    };
  },
});
