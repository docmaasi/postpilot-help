/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as ai_generate from "../ai/generate.js";
import type * as ai_generateExtras from "../ai/generateExtras.js";
import type * as ai_helpers from "../ai/helpers.js";
import type * as ai_index from "../ai/index.js";
import type * as ai_mutations from "../ai/mutations.js";
import type * as campaigns from "../campaigns.js";
import type * as collections from "../collections.js";
import type * as email_send from "../email/send.js";
import type * as email_templates from "../email/templates.js";
import type * as http_callbacks_oauth from "../http/callbacks/oauth.js";
import type * as http_index from "../http/index.js";
import type * as http_webhooks_stripe from "../http/webhooks/stripe.js";
import type * as lib_auth from "../lib/auth.js";
import type * as lib_entitlements from "../lib/entitlements.js";
import type * as lib_plans from "../lib/plans.js";
import type * as mediaAssets from "../mediaAssets.js";
import type * as payments_packs from "../payments/packs.js";
import type * as payments_stripe from "../payments/stripe.js";
import type * as payments_stripeWebhook from "../payments/stripeWebhook.js";
import type * as payments_subscriptions from "../payments/subscriptions.js";
import type * as posts from "../posts.js";
import type * as publishing_oauth from "../publishing/oauth.js";
import type * as publishing_oauthHelpers from "../publishing/oauthHelpers.js";
import type * as publishing_platformConfig from "../publishing/platformConfig.js";
import type * as publishing_publish from "../publishing/publish.js";
import type * as publishing_publishHelpers from "../publishing/publishHelpers.js";
import type * as templates from "../templates.js";
import type * as userProfiles from "../userProfiles.js";
import type * as workspaces from "../workspaces.js";
import type * as youtubeVideos from "../youtubeVideos.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  "ai/generate": typeof ai_generate;
  "ai/generateExtras": typeof ai_generateExtras;
  "ai/helpers": typeof ai_helpers;
  "ai/index": typeof ai_index;
  "ai/mutations": typeof ai_mutations;
  campaigns: typeof campaigns;
  collections: typeof collections;
  "email/send": typeof email_send;
  "email/templates": typeof email_templates;
  "http/callbacks/oauth": typeof http_callbacks_oauth;
  "http/index": typeof http_index;
  "http/webhooks/stripe": typeof http_webhooks_stripe;
  "lib/auth": typeof lib_auth;
  "lib/entitlements": typeof lib_entitlements;
  "lib/plans": typeof lib_plans;
  mediaAssets: typeof mediaAssets;
  "payments/packs": typeof payments_packs;
  "payments/stripe": typeof payments_stripe;
  "payments/stripeWebhook": typeof payments_stripeWebhook;
  "payments/subscriptions": typeof payments_subscriptions;
  posts: typeof posts;
  "publishing/oauth": typeof publishing_oauth;
  "publishing/oauthHelpers": typeof publishing_oauthHelpers;
  "publishing/platformConfig": typeof publishing_platformConfig;
  "publishing/publish": typeof publishing_publish;
  "publishing/publishHelpers": typeof publishing_publishHelpers;
  templates: typeof templates;
  userProfiles: typeof userProfiles;
  workspaces: typeof workspaces;
  youtubeVideos: typeof youtubeVideos;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
