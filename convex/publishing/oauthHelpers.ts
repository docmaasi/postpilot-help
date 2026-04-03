import { internalMutation, internalQuery } from "../_generated/server";
import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { requireAuth } from "../lib/auth";

// ─── Get connection (internal) ──────────────────────
export const getConnection = internalQuery({
  args: { connectionId: v.id("platformConnections") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.connectionId);
  },
});

// ─── Update tokens (internal) ───────────────────────
export const updateTokens = internalMutation({
  args: {
    connectionId: v.id("platformConnections"),
    accessToken: v.string(),
    refreshToken: v.string(),
    expiresIn: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    await ctx.db.patch(args.connectionId, {
      accessToken: args.accessToken,
      refreshToken: args.refreshToken,
      expiresAt: now + args.expiresIn * 1000,
      status: "connected",
      lastSyncAt: now,
      updatedAt: now,
    });
  },
});

// ─── Store connection (internal) ────────────────────
export const storeConnection = internalMutation({
  args: {
    userId: v.string(),
    platform: v.string(),
    accessToken: v.string(),
    refreshToken: v.string(),
    expiresIn: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = args.userId;
    const now = Date.now();

    const existing = await ctx.db
      .query("platformConnections")
      .withIndex("by_platform", (q) =>
        q.eq("userId", userId).eq("platform", args.platform)
      )
      .first();

    const data = {
      userId,
      platform: args.platform,
      accessToken: args.accessToken,
      refreshToken: args.refreshToken,
      expiresAt: now + args.expiresIn * 1000,
      status: "connected" as const,
      lastSyncAt: now,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, data);
    } else {
      await ctx.db.insert("platformConnections", {
        ...data,
        createdAt: now,
      });
    }
  },
});

// ─── Disconnect platform ────────────────────────────
export const disconnect = mutation({
  args: { connectionId: v.id("platformConnections") },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);
    const userId = identity.subject;

    const connection = await ctx.db.get(args.connectionId);
    if (!connection || connection.userId !== userId) {
      throw new Error("Connection not found");
    }

    const now = Date.now();
    await ctx.db.patch(args.connectionId, {
      status: "disconnected",
      accessToken: "",
      refreshToken: "",
      updatedAt: now,
    });
    return { success: true };
  },
});

// ─── Get connection statuses for current user ───────
export const getConnectionStatus = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const userId = identity.subject;
    const connections = await ctx.db
      .query("platformConnections")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    return connections.map((c) => ({
      _id: c._id,
      platform: c.platform,
      status: c.status,
      accountName: c.accountName ?? null,
      lastSyncAt: c.lastSyncAt ?? null,
    }));
  },
});
