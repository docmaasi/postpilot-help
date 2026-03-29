"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";

// ─── Publish a post to its connected platform ──────
export const publishPost = action({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    // Get the post
    const post = await ctx.runQuery(
      internal.publishing.publishHelpers.getPost,
      { postId: args.postId }
    );
    if (!post) throw new Error("Post not found");

    // Get the platform connection
    const connection = await ctx.runQuery(
      internal.publishing.publishHelpers.getConnectionForPlatform,
      { userId: post.userId, platform: post.platform }
    );
    if (!connection || connection.status !== "connected") {
      await ctx.runMutation(
        internal.publishing.publishHelpers.logPublish,
        {
          userId: post.userId,
          postId: args.postId,
          platform: post.platform,
          status: "failed",
          errorMessage: `${post.platform} is not connected`,
        }
      );
      return { success: false, error: "Platform not connected" };
    }

    // Check if token is expired
    if (connection.expiresAt && connection.expiresAt < Date.now()) {
      try {
        await ctx.runAction(
          internal.publishing.oauth.refreshToken,
          { connectionId: connection._id }
        );
      } catch {
        await ctx.runMutation(
          internal.publishing.publishHelpers.logPublish,
          {
            userId: post.userId,
            postId: args.postId,
            platform: post.platform,
            status: "failed",
            errorMessage: "Token expired and refresh failed",
          }
        );
        return { success: false, error: "Token refresh failed" };
      }
    }

    // Skeleton for platform API calls (not yet implemented)
    const result = await publishToPlatform(
      post.platform,
      post.content,
      connection.accessToken ?? ""
    );

    // Log the result
    await ctx.runMutation(
      internal.publishing.publishHelpers.logPublish,
      {
        userId: post.userId,
        postId: args.postId,
        platform: post.platform,
        status: result.success ? "success" : "failed",
        errorMessage: result.error,
        externalPostId: result.externalPostId,
      }
    );

    // Update post status
    await ctx.runMutation(
      internal.publishing.publishHelpers.updatePostStatus,
      {
        postId: args.postId,
        status: result.success ? "published" : "failed",
        publishResult: result.error ?? result.externalPostId ?? "",
      }
    );

    return result;
  },
});

// ─── Platform API stubs ─────────────────────────────
async function publishToPlatform(
  platform: string,
  _content: string,
  _accessToken: string
): Promise<{ success: boolean; error?: string; externalPostId?: string }> {
  // Each platform will have its own API integration
  // For now, return a placeholder message
  const platformNames: Record<string, string> = {
    twitter: "Twitter/X",
    facebook: "Facebook",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    tiktok: "TikTok",
    youtube_community: "YouTube Community",
    threads: "Threads",
  };

  const name = platformNames[platform] ?? platform;
  return {
    success: false,
    error: `${name} API publishing not yet implemented`,
  };
}
