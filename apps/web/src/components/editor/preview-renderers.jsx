import { Heart, MessageCircle, Repeat2, Share, ThumbsUp, Send, Bookmark } from 'lucide-react';

/* ─── Shared bits ─────────────────────────────────────── */
function Avatar() {
  return <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-primary to-accent" />;
}

function PreviewText({ text }) {
  return (
    <p className="whitespace-pre-wrap text-sm leading-relaxed">
      {text || <span className="italic text-muted-foreground/40">Start typing to see your preview...</span>}
    </p>
  );
}

/* ─── Per-platform renderers ─────────────────────────── */
function TwitterPreview({ content }) {
  return (
    <div className="rounded-xl border border-[#2f3336] bg-[#16181c] p-4 text-[#e7e9ea]">
      <div className="mb-3 flex items-center gap-3">
        <Avatar />
        <div>
          <p className="text-sm font-bold">Your Name</p>
          <p className="text-xs text-[#71767b]">@yourhandle</p>
        </div>
      </div>
      <PreviewText text={content} />
      <div className="mt-4 flex gap-10 text-[#71767b]">
        <MessageCircle className="h-4 w-4" />
        <Repeat2 className="h-4 w-4" />
        <Heart className="h-4 w-4" />
        <Share className="h-4 w-4" />
      </div>
    </div>
  );
}

function InstagramPreview({ content }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white text-black">
      <div className="flex items-center gap-2 px-3 py-2">
        <Avatar />
        <p className="text-sm font-semibold">yourhandle</p>
      </div>
      <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200">
        <span className="text-sm text-black/40">Image preview</span>
      </div>
      <div className="space-y-1 px-3 py-2">
        <div className="flex gap-4">
          <Heart className="h-5 w-5" />
          <MessageCircle className="h-5 w-5" />
          <Send className="h-5 w-5" />
          <Bookmark className="ml-auto h-5 w-5" />
        </div>
        <PreviewText text={content} />
      </div>
    </div>
  );
}

function FacebookPreview({ content }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 text-black">
      <div className="mb-3 flex items-center gap-3">
        <Avatar />
        <div>
          <p className="text-sm font-semibold">Your Name</p>
          <p className="text-xs text-gray-500">Just now - Public</p>
        </div>
      </div>
      <PreviewText text={content} />
      <div className="mt-4 flex border-t border-gray-200 pt-2 text-xs text-gray-500">
        <button className="flex flex-1 items-center justify-center gap-1 py-1">
          <ThumbsUp className="h-4 w-4" /> Like
        </button>
        <button className="flex flex-1 items-center justify-center gap-1 py-1">
          <MessageCircle className="h-4 w-4" /> Comment
        </button>
        <button className="flex flex-1 items-center justify-center gap-1 py-1">
          <Share className="h-4 w-4" /> Share
        </button>
      </div>
    </div>
  );
}

function LinkedinPreview({ content }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 text-black">
      <div className="mb-3 flex items-center gap-3">
        <Avatar />
        <div>
          <p className="text-sm font-semibold">Your Name</p>
          <p className="text-xs text-gray-500">Content Creator</p>
        </div>
      </div>
      <PreviewText text={content} />
      <div className="mt-4 flex border-t border-gray-200 pt-2 text-xs text-gray-500">
        <button className="flex flex-1 items-center justify-center gap-1 py-1">
          <ThumbsUp className="h-4 w-4" /> Like
        </button>
        <button className="flex flex-1 items-center justify-center gap-1 py-1">
          <MessageCircle className="h-4 w-4" /> Comment
        </button>
        <button className="flex flex-1 items-center justify-center gap-1 py-1">
          <Repeat2 className="h-4 w-4" /> Repost
        </button>
        <button className="flex flex-1 items-center justify-center gap-1 py-1">
          <Send className="h-4 w-4" /> Send
        </button>
      </div>
    </div>
  );
}

function TiktokPreview({ content }) {
  return (
    <div className="mx-auto max-w-[260px] overflow-hidden rounded-2xl border-2 border-border bg-black text-white">
      <div className="flex aspect-[9/14] flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className="mb-1 text-sm font-bold">@yourhandle</p>
        <PreviewText text={content} />
      </div>
    </div>
  );
}

function YoutubePreview({ content }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 text-black">
      <div className="mb-3 flex items-center gap-3">
        <Avatar />
        <p className="text-sm font-semibold">Your Channel</p>
      </div>
      <PreviewText text={content} />
      <div className="mt-3 flex gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" /> Like</span>
        <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> Comment</span>
      </div>
    </div>
  );
}

function ThreadsPreview({ content }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 text-black">
      <div className="mb-2 flex items-center gap-3">
        <Avatar />
        <p className="text-sm font-bold">yourhandle</p>
        <span className="text-xs text-gray-400">now</span>
      </div>
      <PreviewText text={content} />
      <div className="mt-3 flex gap-6 text-gray-400">
        <Heart className="h-4 w-4" />
        <MessageCircle className="h-4 w-4" />
        <Repeat2 className="h-4 w-4" />
        <Share className="h-4 w-4" />
      </div>
    </div>
  );
}

function GenericPreview({ content, platform }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="mb-2 text-xs font-semibold" style={{ color: platform.color }}>
        {platform.name}
      </p>
      <PreviewText text={content} />
    </div>
  );
}

/** Map of platform key -> renderer component */
export const RENDERERS = {
  twitter: TwitterPreview,
  instagram: InstagramPreview,
  facebook: FacebookPreview,
  linkedin: LinkedinPreview,
  tiktok: TiktokPreview,
  youtube_community: YoutubePreview,
  threads: ThreadsPreview,
  _generic: GenericPreview,
};
