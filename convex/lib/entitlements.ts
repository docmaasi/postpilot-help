/**
 * Central entitlement calculator.
 * Combines plan limits + pack bonuses to determine what a user can do.
 */

import { PLANS, type PlanId } from "./plans";

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
  youtubeImportsUsed: number;
}

export interface Entitlements {
  /* Counts */
  maxSocialAccounts: number;
  maxScheduledPosts: number;
  maxAiRewrites: number;
  maxCircleSlots: number;
  maxYoutubeImports: number;
  aiTones: number;
  competitorTrackingSlots: number;
  remainingScheduledPosts: number;
  remainingAiRewrites: number;
  remainingYoutubeImports: number;
  /* Free plan flags */
  hasWatermark: boolean;
  /* Creator+ features */
  hasTemplates: boolean;
  /* Pro-only features */
  hasBulkSchedule: boolean;
  hasAdvancedAI: boolean;
  hasAnalytics: boolean;
  hasPriorityProcessing: boolean;
  hasAutoPublish: boolean;
  hasABTesting: boolean;
  hasEvergreenRecycling: boolean;
  hasRSSImport: boolean;
  hasVideoSummarizer: boolean;
  hasThreadGenerator: boolean;
  hasImageCaption: boolean;
  hasCompetitorTracking: boolean;
  hasBestTimeAI: boolean;
  hasContentScoring: boolean;
  hasWeeklyReport: boolean;
  hasApprovalWorkflows: boolean;
  hasTeamActivityLog: boolean;
  hasClientWorkspaces: boolean;
  hasCustomBranding: boolean;
  hasWhiteLabelReports: boolean;
  hasPrioritySupport: boolean;
  /* Pack bonuses */
  hasViralTemplates: boolean;
}

const DEFAULT_PACK: PackBalances = {
  aiRewrites: 0, scheduledPosts: 0, circleSlots: 0,
  analyticsUnlocked: false, viralTemplatesUnlocked: false,
};

const DEFAULT_USAGE: UsageCounters = {
  scheduledPostsUsed: 0, aiRewritesUsed: 0, youtubeImportsUsed: 0,
};

function addBonus(limit: number, bonus: number): number {
  return limit === -1 ? -1 : limit + bonus;
}

function remaining(limit: number, used: number): number {
  return limit === -1 ? -1 : Math.max(0, limit - used);
}

export function calculateEntitlements(
  plan: PlanId,
  packBalances?: PackBalances | null,
  usageCounters?: UsageCounters | null
): Entitlements {
  const p = PLANS[plan];
  const packs = packBalances ?? DEFAULT_PACK;
  const usage = usageCounters ?? DEFAULT_USAGE;

  const maxScheduled = addBonus(p.scheduledPostsPerMonth, packs.scheduledPosts);
  const maxAi = addBonus(p.aiRewritesPerMonth, packs.aiRewrites);
  const maxCircle = p.circleSlots + packs.circleSlots;
  const competitors = typeof p.hasCompetitorTracking === "number"
    ? p.hasCompetitorTracking : 0;

  return {
    maxSocialAccounts: p.socialAccounts,
    maxScheduledPosts: maxScheduled,
    maxAiRewrites: maxAi,
    maxCircleSlots: maxCircle,
    maxYoutubeImports: p.youtubeImportsPerMonth,
    aiTones: p.aiTones,
    competitorTrackingSlots: competitors,
    remainingScheduledPosts: remaining(maxScheduled, usage.scheduledPostsUsed),
    remainingAiRewrites: remaining(maxAi, usage.aiRewritesUsed),
    remainingYoutubeImports: remaining(p.youtubeImportsPerMonth, usage.youtubeImportsUsed),
    hasWatermark: p.hasWatermark,
    hasTemplates: p.hasTemplates,
    hasBulkSchedule: p.hasBulkSchedule,
    hasAdvancedAI: p.hasAdvancedAI,
    hasAnalytics: p.hasAnalytics || !!packs.analyticsUnlocked,
    hasPriorityProcessing: p.hasPriorityProcessing,
    hasAutoPublish: p.hasAutoPublish,
    hasABTesting: p.hasABTesting,
    hasEvergreenRecycling: p.hasEvergreenRecycling,
    hasRSSImport: p.hasRSSImport,
    hasVideoSummarizer: p.hasVideoSummarizer,
    hasThreadGenerator: p.hasThreadGenerator,
    hasImageCaption: p.hasImageCaption,
    hasCompetitorTracking: competitors > 0,
    hasBestTimeAI: p.hasBestTimeAI,
    hasContentScoring: p.hasContentScoring,
    hasWeeklyReport: p.hasWeeklyReport,
    hasApprovalWorkflows: p.hasApprovalWorkflows,
    hasTeamActivityLog: p.hasTeamActivityLog,
    hasClientWorkspaces: p.hasClientWorkspaces,
    hasCustomBranding: p.hasCustomBranding,
    hasWhiteLabelReports: p.hasWhiteLabelReports,
    hasPrioritySupport: p.hasPrioritySupport,
    hasViralTemplates: !!packs.viralTemplatesUnlocked,
  };
}

type BooleanFeature = Extract<keyof Entitlements, `has${string}`>;
type CountFeature = "remainingScheduledPosts" | "remainingAiRewrites" | "remainingYoutubeImports";
type ActionKey = BooleanFeature | CountFeature;

export function canPerformAction(ent: Entitlements, action: ActionKey): boolean {
  const v = ent[action];
  if (typeof v === "boolean") return v;
  return v === -1 || v > 0;
}

export function getRemainingUsage(ent: Entitlements, feature: CountFeature): number {
  return ent[feature];
}
