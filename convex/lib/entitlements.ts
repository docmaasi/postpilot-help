/**
 * Central entitlement calculator.
 *
 * Combines plan limits + pack bonuses to determine
 * what a user is allowed to do and how much they have left.
 */

import { PLANS, type PlanId } from "./plans";

// ── Types ────────────────────────────────────────────

export interface PackBalances {
  aiRewrites: number;
  scheduledPosts: number;
  circleSlots: number;
  analyticsUnlocked?: boolean;
  viralTemplatesUnlocked?: boolean;
}

export interface UsageCounters {
  scheduledPostsUsed: number;
  aiRewritesUsed: number;
}

export interface Entitlements {
  maxSocialAccounts: number;
  maxScheduledPosts: number;
  maxAiRewrites: number;
  maxCircleSlots: number;
  maxYoutubeImports: number;
  remainingScheduledPosts: number;
  remainingAiRewrites: number;
  hasWatermark: boolean;
  hasTemplates: boolean;
  hasBulkSchedule: boolean;
  hasAdvancedAI: boolean;
  hasAnalytics: boolean;
  hasPriorityProcessing: boolean;
  hasViralTemplates: boolean;
}

// ── Helpers ──────────────────────────────────────────

const DEFAULT_PACK: PackBalances = {
  aiRewrites: 0,
  scheduledPosts: 0,
  circleSlots: 0,
  analyticsUnlocked: false,
  viralTemplatesUnlocked: false,
};

const DEFAULT_USAGE: UsageCounters = {
  scheduledPostsUsed: 0,
  aiRewritesUsed: 0,
};

/** Add bonus on top of a plan limit. -1 means unlimited. */
function addBonus(planLimit: number, bonus: number): number {
  if (planLimit === -1) return -1;
  return planLimit + bonus;
}

/** Subtract usage from a limit. -1 means unlimited. */
function remaining(limit: number, used: number): number {
  if (limit === -1) return -1;
  return Math.max(0, limit - used);
}

// ── Main calculator ──────────────────────────────────

export function calculateEntitlements(
  plan: PlanId,
  packBalances?: PackBalances | null,
  usageCounters?: UsageCounters | null
): Entitlements {
  const p = PLANS[plan];
  const packs = packBalances ?? DEFAULT_PACK;
  const usage = usageCounters ?? DEFAULT_USAGE;

  const maxScheduledPosts = addBonus(
    p.scheduledPostsPerMonth,
    packs.scheduledPosts
  );
  const maxAiRewrites = addBonus(
    p.aiRewritesPerMonth,
    packs.aiRewrites
  );
  const maxCircleSlots = p.circleSlots + packs.circleSlots;

  return {
    maxSocialAccounts: p.socialAccounts,
    maxScheduledPosts,
    maxAiRewrites,
    maxCircleSlots,
    maxYoutubeImports: p.youtubeImportsPerMonth,
    remainingScheduledPosts: remaining(
      maxScheduledPosts,
      usage.scheduledPostsUsed
    ),
    remainingAiRewrites: remaining(
      maxAiRewrites,
      usage.aiRewritesUsed
    ),
    hasWatermark: p.hasWatermark,
    hasTemplates: p.hasTemplates,
    hasBulkSchedule: p.hasBulkSchedule,
    hasAdvancedAI: p.hasAdvancedAI,
    hasAnalytics: p.hasAnalytics || !!packs.analyticsUnlocked,
    hasPriorityProcessing: p.hasPriorityProcessing,
    hasViralTemplates: !!packs.viralTemplatesUnlocked,
  };
}

// ── Action checkers ──────────────────────────────────

type BooleanFeature =
  | "hasTemplates"
  | "hasBulkSchedule"
  | "hasAdvancedAI"
  | "hasAnalytics"
  | "hasPriorityProcessing"
  | "hasViralTemplates";

type CountFeature =
  | "remainingScheduledPosts"
  | "remainingAiRewrites";

type ActionKey = BooleanFeature | CountFeature;

export function canPerformAction(
  entitlements: Entitlements,
  action: ActionKey
): boolean {
  const value = entitlements[action];
  if (typeof value === "boolean") return value;
  // -1 means unlimited, otherwise must be > 0
  return value === -1 || value > 0;
}

export function getRemainingUsage(
  entitlements: Entitlements,
  feature: CountFeature
): number {
  return entitlements[feature];
}
