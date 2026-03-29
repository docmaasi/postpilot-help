import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// ─── Shared validators ───────────────────────────────
const platformValidator = v.union(
  v.literal("twitter"),
  v.literal("instagram"),
  v.literal("facebook"),
  v.literal("linkedin"),
  v.literal("tiktok"),
  v.literal("youtube_community"),
  v.literal("threads")
);

const postStatusValidator = v.union(
  v.literal("draft"),
  v.literal("scheduled"),
  v.literal("published"),
  v.literal("failed"),
  v.literal("archived")
);

// ─── Schema ──────────────────────────────────────────
export default defineSchema({
  // ── USER PROFILES ──────────────────────────────────
  userProfiles: defineTable({
    visitorId: v.string(),
    displayName: v.optional(v.string()),
    email: v.optional(v.string()),
    timezone: v.optional(v.string()),
    plan: v.optional(v.string()),
    stripeCustomerId: v.optional(v.string()),
    referralCode: v.optional(v.string()),
    preferences: v.optional(v.object({
      theme: v.optional(v.string()),
      defaultPlatforms: v.optional(v.array(v.string())),
      emailNotifications: v.optional(v.boolean()),
    })),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_visitorId", ["visitorId"])
    .index("by_stripe_customer", ["stripeCustomerId"])
    .index("by_referralCode", ["referralCode"]),

  // ── YOUTUBE VIDEOS ─────────────────────────────────
  youtubeVideos: defineTable({
    userId: v.string(),
    url: v.string(),
    videoId: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    publishDate: v.optional(v.number()),
    duration: v.optional(v.string()),
    viewCount: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    notes: v.optional(v.string()),
    isFavorite: v.optional(v.boolean()),
    isArchived: v.optional(v.boolean()),
    status: v.union(
      v.literal("imported"),
      v.literal("in_progress"),
      v.literal("repurposed")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_status", ["userId", "status"])
    .index("by_videoId", ["videoId"])
    .index("by_created", ["userId", "createdAt"]),

  // ── POSTS ──────────────────────────────────────────
  posts: defineTable({
    userId: v.string(),
    youtubeVideoId: v.optional(v.id("youtubeVideos")),
    platform: platformValidator,
    content: v.string(),
    hashtags: v.optional(v.array(v.string())),
    mentions: v.optional(v.array(v.string())),
    links: v.optional(v.array(v.string())),
    mediaIds: v.optional(v.array(v.id("mediaAssets"))),
    templateId: v.optional(v.id("templates")),
    status: postStatusValidator,
    scheduledAt: v.optional(v.number()),
    publishedAt: v.optional(v.number()),
    publishResult: v.optional(v.string()),
    campaignId: v.optional(v.id("campaigns")),
    collectionId: v.optional(v.id("collections")),
    tags: v.optional(v.array(v.string())),
    notes: v.optional(v.string()),
    isFavorite: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_platform", ["userId", "platform"])
    .index("by_status", ["userId", "status"])
    .index("by_scheduled", ["userId", "scheduledAt"])
    .index("by_youtube_video", ["youtubeVideoId"])
    .index("by_campaign", ["campaignId"])
    .index("by_created", ["userId", "createdAt"]),

  // ── MEDIA ASSETS ───────────────────────────────────
  mediaAssets: defineTable({
    userId: v.string(),
    fileName: v.string(),
    fileUrl: v.optional(v.string()),
    fileType: v.string(),
    mimeType: v.string(),
    fileSize: v.optional(v.number()),
    storageId: v.optional(v.string()),
    source: v.union(
      v.literal("upload"),
      v.literal("youtube_thumbnail"),
      v.literal("generated")
    ),
    tags: v.optional(v.array(v.string())),
    campaign: v.optional(v.string()),
    project: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_source", ["userId", "source"])
    .index("by_created", ["userId", "createdAt"]),

  // ── TEMPLATES ──────────────────────────────────────
  templates: defineTable({
    userId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    platform: platformValidator,
    content: v.string(),
    hashtags: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    isDefault: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_platform", ["userId", "platform"]),

  // ── CAMPAIGNS ──────────────────────────────────────
  campaigns: defineTable({
    userId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    status: v.union(
      v.literal("active"),
      v.literal("completed"),
      v.literal("archived")
    ),
    tags: v.optional(v.array(v.string())),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_status", ["userId", "status"]),

  // ── COLLECTIONS ────────────────────────────────────
  collections: defineTable({
    userId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
    parentId: v.optional(v.id("collections")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),

  // ── PLATFORM CONNECTIONS ───────────────────────────
  platformConnections: defineTable({
    userId: v.string(),
    platform: v.string(),
    accessToken: v.optional(v.string()),
    refreshToken: v.optional(v.string()),
    expiresAt: v.optional(v.number()),
    accountName: v.optional(v.string()),
    accountId: v.optional(v.string()),
    status: v.union(
      v.literal("connected"),
      v.literal("disconnected"),
      v.literal("error")
    ),
    lastSyncAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_platform", ["userId", "platform"]),

  // ── PUBLISH LOG ────────────────────────────────────
  publishLog: defineTable({
    userId: v.string(),
    postId: v.id("posts"),
    platform: v.string(),
    status: v.union(
      v.literal("success"),
      v.literal("failed"),
      v.literal("pending")
    ),
    response: v.optional(v.string()),
    errorMessage: v.optional(v.string()),
    externalPostId: v.optional(v.string()),
    publishedAt: v.number(),
  })
    .index("by_post", ["postId"])
    .index("by_userId", ["userId", "publishedAt"]),

  // ── POST ANALYTICS ─────────────────────────────────
  postAnalytics: defineTable({
    userId: v.string(),
    postId: v.id("posts"),
    platform: v.string(),
    likes: v.optional(v.number()),
    shares: v.optional(v.number()),
    comments: v.optional(v.number()),
    views: v.optional(v.number()),
    impressions: v.optional(v.number()),
    clicks: v.optional(v.number()),
    fetchedAt: v.number(),
  })
    .index("by_post", ["postId"])
    .index("by_userId", ["userId", "fetchedAt"]),

  // ── CONTENT SCORES ─────────────────────────────────
  contentScores: defineTable({
    userId: v.string(),
    postId: v.id("posts"),
    score: v.number(),
    factors: v.optional(v.object({
      engagementRate: v.optional(v.number()),
      reach: v.optional(v.number()),
      growth: v.optional(v.number()),
    })),
    calculatedAt: v.number(),
  })
    .index("by_post", ["postId"])
    .index("by_userId", ["userId", "calculatedAt"]),

  // ── TRENDING HASHTAGS ──────────────────────────────
  trendingHashtags: defineTable({
    hashtag: v.string(),
    platform: v.string(),
    volume: v.optional(v.number()),
    trend: v.union(
      v.literal("up"),
      v.literal("down"),
      v.literal("stable")
    ),
    category: v.optional(v.string()),
    fetchedAt: v.number(),
  })
    .index("by_platform", ["platform", "fetchedAt"])
    .index("by_hashtag", ["hashtag"]),

  // ── COMMENT MONITOR ────────────────────────────────
  commentMonitor: defineTable({
    userId: v.string(),
    postId: v.id("posts"),
    platform: v.string(),
    commentId: v.string(),
    author: v.optional(v.string()),
    content: v.string(),
    sentiment: v.optional(v.union(
      v.literal("positive"),
      v.literal("negative"),
      v.literal("neutral")
    )),
    isReplied: v.optional(v.boolean()),
    fetchedAt: v.number(),
  })
    .index("by_post", ["postId"])
    .index("by_userId", ["userId", "fetchedAt"]),

  // ── AI GENERATIONS ─────────────────────────────────
  aiGenerations: defineTable({
    userId: v.string(),
    postId: v.optional(v.id("posts")),
    youtubeVideoId: v.optional(v.id("youtubeVideos")),
    prompt: v.string(),
    response: v.string(),
    type: v.union(
      v.literal("caption"),
      v.literal("rewrite"),
      v.literal("hashtags"),
      v.literal("cta"),
      v.literal("summary"),
      v.literal("sentiment"),
      v.literal("score")
    ),
    tone: v.optional(v.union(
      v.literal("professional"),
      v.literal("funny"),
      v.literal("bold"),
      v.literal("informative"),
      v.literal("urgent")
    )),
    model: v.optional(v.string()),
    tokensUsed: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_post", ["postId"])
    .index("by_video", ["youtubeVideoId"]),

  // ── ACTIVITY LOG ───────────────────────────────────
  activityLog: defineTable({
    userId: v.string(),
    action: v.string(),
    entityType: v.string(),
    entityId: v.optional(v.string()),
    details: v.optional(v.string()),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId", "createdAt"])
    .index("by_entity", ["entityType", "entityId"]),

  // ── SUBSCRIPTIONS ──────────────────────────────────
  subscriptions: defineTable({
    userId: v.string(),
    stripeSubscriptionId: v.string(),
    plan: v.union(
      v.literal("free"),
      v.literal("creator"),
      v.literal("pro")
    ),
    status: v.union(
      v.literal("active"),
      v.literal("canceled"),
      v.literal("past_due"),
      v.literal("trialing")
    ),
    currentPeriodEnd: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_stripe_id", ["stripeSubscriptionId"]),

  // ── USAGE LIMITS ───────────────────────────────────
  usageLimits: defineTable({
    userId: v.string(),
    feature: v.string(),
    used: v.number(),
    limit: v.number(),
    resetAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_feature", ["userId", "feature"]),

  // ── WORKSPACES (Circle collaboration) ─────────────
  workspaces: defineTable({
    ownerId: v.string(),
    name: v.string(),
    plan: v.union(
      v.literal("free"),
      v.literal("creator"),
      v.literal("pro")
    ),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_ownerId", ["ownerId"]),

  // ── WORKSPACE MEMBERS (Circle users) ──────────────
  workspaceMembers: defineTable({
    workspaceId: v.id("workspaces"),
    userId: v.string(),
    email: v.string(),
    role: v.union(
      v.literal("owner"),
      v.literal("contributor"),
      v.literal("editor"),
      v.literal("publisher"),
      v.literal("viewer")
    ),
    permissions: v.optional(v.object({
      canCreateDrafts: v.optional(v.boolean()),
      canEditDrafts: v.optional(v.boolean()),
      canUploadMedia: v.optional(v.boolean()),
      canPublish: v.optional(v.boolean()),
      canManageAccounts: v.optional(v.boolean()),
    })),
    status: v.union(
      v.literal("active"),
      v.literal("invited"),
      v.literal("removed")
    ),
    invitedBy: v.string(),
    invitedAt: v.number(),
    joinedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_workspaceId", ["workspaceId"])
    .index("by_userId", ["userId"])
    .index("by_email", ["email"]),

  // ── ADD-ON PURCHASES ──────────────────────────────
  addOnPurchases: defineTable({
    userId: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
    packType: v.union(
      v.literal("content_blitz"),
      v.literal("viral_growth"),
      v.literal("analytics")
    ),
    stripePaymentId: v.optional(v.string()),
    status: v.union(
      v.literal("active"),
      v.literal("consumed"),
      v.literal("refunded")
    ),
    purchasedAt: v.number(),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_workspaceId", ["workspaceId"]),

  // ── PACK BALANCES ─────────────────────────────────
  packBalances: defineTable({
    userId: v.string(),
    aiRewrites: v.number(),
    scheduledPosts: v.number(),
    circleSlots: v.number(),
    analyticsUnlocked: v.optional(v.boolean()),
    viralTemplatesUnlocked: v.optional(v.boolean()),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),

  // ── REFERRALS ─────────────────────────────────────
  referrals: defineTable({
    referrerId: v.string(),
    referralCode: v.string(),
    referredUserId: v.optional(v.string()),
    referredEmail: v.optional(v.string()),
    status: v.union(
      v.literal("invited"),
      v.literal("signed_up"),
      v.literal("subscribed"),
      v.literal("rewarded")
    ),
    rewardType: v.optional(v.string()),
    rewardAmount: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_referrerId", ["referrerId"])
    .index("by_referralCode", ["referralCode"])
    .index("by_referredUserId", ["referredUserId"]),

  // ── INVITE TOKENS ─────────────────────────────────
  inviteTokens: defineTable({
    workspaceId: v.id("workspaces"),
    email: v.string(),
    role: v.string(),
    token: v.string(),
    invitedBy: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("expired"),
      v.literal("revoked")
    ),
    expiresAt: v.number(),
    createdAt: v.number(),
  })
    .index("by_token", ["token"])
    .index("by_workspaceId", ["workspaceId"])
    .index("by_email", ["email"]),
});
