import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUser, getUserId, requireAuth } from "./lib/auth";

// ── Queries ──────────────────────────────────────────

export const getByOwner = query({
  args: {},
  handler: async (ctx) => {
    const identity = await getAuthUser(ctx);
    if (!identity) return null;

    const userId = getUserId(identity);
    if (!userId) return null;

    return await ctx.db
      .query("workspaces")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", userId))
      .first();
  },
});

export const getById = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const identity = await getAuthUser(ctx);
    if (!identity) return null;

    return await ctx.db.get(workspaceId);
  },
});

// ── Mutations ────────────────────────────────────────

export const create = mutation({
  args: {
    name: v.string(),
    plan: v.union(
      v.literal("free"),
      v.literal("creator"),
      v.literal("pro")
    ),
  },
  handler: async (ctx, { name, plan }) => {
    const identity = await requireAuth(ctx);
    const userId = getUserId(identity);
    const now = Date.now();

    const workspaceId = await ctx.db.insert("workspaces", {
      ownerId: userId,
      name,
      plan,
      createdAt: now,
      updatedAt: now,
    });

    // Add the owner as first member
    await ctx.db.insert("workspaceMembers", {
      workspaceId,
      userId,
      email: identity.email ?? "",
      role: "owner",
      status: "active",
      invitedBy: userId,
      invitedAt: now,
      joinedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    return workspaceId;
  },
});

export const addMember = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    email: v.string(),
    role: v.union(
      v.literal("contributor"),
      v.literal("editor"),
      v.literal("publisher"),
      v.literal("viewer")
    ),
  },
  handler: async (ctx, { workspaceId, email, role }) => {
    const identity = await requireAuth(ctx);
    const userId = getUserId(identity);
    const now = Date.now();

    // Verify caller owns the workspace
    const workspace = await ctx.db.get(workspaceId);
    if (!workspace || workspace.ownerId !== userId) {
      throw new Error("Only the workspace owner can add members");
    }

    // Check for existing member with same email
    const existing = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_workspaceId", (q) =>
        q.eq("workspaceId", workspaceId)
      )
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    if (existing && existing.status !== "removed") {
      throw new Error("This person is already a member");
    }

    const memberId = await ctx.db.insert("workspaceMembers", {
      workspaceId,
      userId: "",
      email,
      role,
      status: "invited",
      invitedBy: userId,
      invitedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    return memberId;
  },
});

export const removeMember = mutation({
  args: {
    memberId: v.id("workspaceMembers"),
  },
  handler: async (ctx, { memberId }) => {
    const identity = await requireAuth(ctx);
    const userId = getUserId(identity);
    const now = Date.now();

    const member = await ctx.db.get(memberId);
    if (!member) throw new Error("Member not found");

    // Verify caller owns the workspace
    const workspace = await ctx.db.get(member.workspaceId);
    if (!workspace || workspace.ownerId !== userId) {
      throw new Error("Only the workspace owner can remove members");
    }

    if (member.role === "owner") {
      throw new Error("Cannot remove the workspace owner");
    }

    await ctx.db.patch(memberId, {
      status: "removed",
      updatedAt: now,
    });
  },
});

export const updateMemberRole = mutation({
  args: {
    memberId: v.id("workspaceMembers"),
    role: v.union(
      v.literal("contributor"),
      v.literal("editor"),
      v.literal("publisher"),
      v.literal("viewer")
    ),
  },
  handler: async (ctx, { memberId, role }) => {
    const identity = await requireAuth(ctx);
    const userId = getUserId(identity);
    const now = Date.now();

    const member = await ctx.db.get(memberId);
    if (!member) throw new Error("Member not found");

    const workspace = await ctx.db.get(member.workspaceId);
    if (!workspace || workspace.ownerId !== userId) {
      throw new Error("Only the workspace owner can change roles");
    }

    if (member.role === "owner") {
      throw new Error("Cannot change the owner's role");
    }

    await ctx.db.patch(memberId, { role, updatedAt: now });
  },
});
