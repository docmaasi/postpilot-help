/**
 * Centralized plan configuration — single source of truth
 * for plan limits, pack contents, and referral rewards.
 *
 * Use -1 to mean "unlimited".
 */

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    socialAccounts: 3,
    scheduledPostsPerMonth: 15,
    aiRewritesPerMonth: 5,
    circleSlots: 0,
    youtubeImportsPerMonth: 10,
    hasWatermark: true,
    hasTemplates: false,
    hasBulkSchedule: false,
    hasAdvancedAI: false,
    hasAnalytics: false,
    hasPriorityProcessing: false,
  },
  creator: {
    name: "Creator",
    price: 12,
    socialAccounts: 10,
    scheduledPostsPerMonth: -1,
    aiRewritesPerMonth: 50,
    circleSlots: 5,
    youtubeImportsPerMonth: -1,
    hasWatermark: false,
    hasTemplates: true,
    hasBulkSchedule: false,
    hasAdvancedAI: false,
    hasAnalytics: false,
    hasPriorityProcessing: false,
  },
  pro: {
    name: "Pro",
    price: 24,
    socialAccounts: 100,
    scheduledPostsPerMonth: -1,
    aiRewritesPerMonth: -1,
    circleSlots: 15,
    youtubeImportsPerMonth: -1,
    hasWatermark: false,
    hasTemplates: true,
    hasBulkSchedule: true,
    hasAdvancedAI: true,
    hasAnalytics: true,
    hasPriorityProcessing: true,
  },
} as const;

export const PACKS = {
  content_blitz: {
    name: "Content Blitz Pack",
    price: 9.99,
    aiRewrites: 25,
    scheduledPosts: 50,
    circleSlots: 0,
  },
  viral_growth: {
    name: "Viral Growth Pack",
    price: 14.99,
    aiRewrites: 0,
    scheduledPosts: 0,
    circleSlots: 10,
    viralTemplates: true,
  },
  analytics: {
    name: "Analytics Pack",
    price: 19.99,
    aiRewrites: 0,
    scheduledPosts: 0,
    circleSlots: 0,
    analyticsUnlock: true,
  },
} as const;

export const REFERRAL_REWARDS = {
  signup: { scheduledPosts: 10, aiRewrites: 5 },
  subscription: {
    scheduledPosts: 50,
    aiRewrites: 25,
    circleSlots: 2,
  },
} as const;

export type PlanId = keyof typeof PLANS;
export type PackId = keyof typeof PACKS;
