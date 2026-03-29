/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as campaigns from "../campaigns.js";
import type * as collections from "../collections.js";
import type * as http_index from "../http/index.js";
import type * as lib_auth from "../lib/auth.js";
import type * as mediaAssets from "../mediaAssets.js";
import type * as posts from "../posts.js";
import type * as templates from "../templates.js";
import type * as userProfiles from "../userProfiles.js";
import type * as youtubeVideos from "../youtubeVideos.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  campaigns: typeof campaigns;
  collections: typeof collections;
  "http/index": typeof http_index;
  "lib/auth": typeof lib_auth;
  mediaAssets: typeof mediaAssets;
  posts: typeof posts;
  templates: typeof templates;
  userProfiles: typeof userProfiles;
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
