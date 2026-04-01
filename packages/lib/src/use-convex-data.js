import { useQuery, useMutation, useAction } from 'convex/react';
import { api } from 'convex/_generated/api';

// ─── User ────────────────────────────────────────────
export function useCurrentUser() {
  return useQuery(api.userProfiles.getCurrent);
}

export function useUpdateProfile() {
  return useMutation(api.userProfiles.upsert);
}

// ─── YouTube Videos ──────────────────────────────────
export function useVideos(args = {}) {
  return useQuery(api.youtubeVideos.list, args);
}

export function useVideo(id) {
  return useQuery(api.youtubeVideos.getById, id ? { id } : 'skip');
}

export function useCreateVideo() {
  return useMutation(api.youtubeVideos.create);
}

export function useUpdateVideo() {
  return useMutation(api.youtubeVideos.update);
}

export function useDeleteVideo() {
  return useMutation(api.youtubeVideos.remove);
}

// ─── Posts ───────────────────────────────────────────
export function usePosts(args = {}) {
  return useQuery(api.posts.list, args);
}

export function usePost(id) {
  return useQuery(api.posts.getById, id ? { id } : 'skip');
}

export function useCreatePost() {
  return useMutation(api.posts.create);
}

export function useUpdatePost() {
  return useMutation(api.posts.update);
}

export function useDuplicatePost() {
  return useMutation(api.posts.duplicate);
}

export function useDeletePost() {
  return useMutation(api.posts.remove);
}

// ─── Media Assets ────────────────────────────────────
export function useMediaAssets(args = {}) {
  return useQuery(api.mediaAssets.list, args);
}

export function useGenerateUploadUrl() {
  return useMutation(api.mediaAssets.generateUploadUrl);
}

export function useCreateMediaAsset() {
  return useMutation(api.mediaAssets.create);
}

export function useDeleteMediaAsset() {
  return useMutation(api.mediaAssets.remove);
}

// ─── Templates ───────────────────────────────────────
export function useTemplates(args = {}) {
  return useQuery(api.templates.list, args);
}

export function useCreateTemplate() {
  return useMutation(api.templates.create);
}

export function useUpdateTemplate() {
  return useMutation(api.templates.update);
}

export function useDeleteTemplate() {
  return useMutation(api.templates.remove);
}

// ─── Campaigns ───────────────────────────────────────
export function useCampaigns(args = {}) {
  return useQuery(api.campaigns.list, args);
}

export function useCreateCampaign() {
  return useMutation(api.campaigns.create);
}

export function useUpdateCampaign() {
  return useMutation(api.campaigns.update);
}

export function useDeleteCampaign() {
  return useMutation(api.campaigns.remove);
}

// ─── Collections ─────────────────────────────────────
export function useCollections(args = {}) {
  return useQuery(api.collections.list, args);
}

export function useCreateCollection() {
  return useMutation(api.collections.create);
}

export function useUpdateCollection() {
  return useMutation(api.collections.update);
}

export function useDeleteCollection() {
  return useMutation(api.collections.remove);
}

// ─── Workspaces (Circles) ───────────────────────────
export function useWorkspace() {
  return useQuery(api.workspaces.getByOwner);
}

export function useWorkspaceMembers(workspaceId) {
  return useQuery(api.workspaces.getMembers, workspaceId ? { workspaceId } : 'skip');
}

export function useCreateWorkspace() {
  return useMutation(api.workspaces.create);
}

export function useAddMember() {
  return useMutation(api.workspaces.addMember);
}

export function useRemoveMember() {
  return useMutation(api.workspaces.removeMember);
}

// ─── Publishing / OAuth ─────────────────────────────
export function useConnectionStatus() {
  return useQuery(api.publishing.oauthHelpers.getConnectionStatus);
}

export function useInitiateOAuth() {
  return useAction(api.publishing.oauth.initiateOAuth);
}

export function usePublishPost() {
  return useAction(api.publishing.publish.publishPost);
}

export function useDisconnectPlatform() {
  return useMutation(api.publishing.oauthHelpers.disconnect);
}

// ─── AI Generation ──────────────────────────────────
export function useGenerateCaption() {
  return useAction(api.ai.generate.summarizeVideo);
}

export function useRewriteForPlatform() {
  return useAction(api.ai.generate.rewriteForPlatform);
}

export function useSuggestHashtags() {
  return useAction(api.ai.generate.suggestHashtags);
}

export function useSuggestCTAs() {
  return useAction(api.ai.generateExtras.suggestCTAs);
}

export function useGenerateTones() {
  return useAction(api.ai.generateExtras.generateMultipleTones);
}
