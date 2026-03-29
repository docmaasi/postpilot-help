import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Smile } from 'lucide-react';
import { CharacterCounter } from './CharacterCounter.jsx';
import { HashtagInput } from './HashtagInput.jsx';
import { getPlatform } from '@/lib/platforms.js';

const QUICK_EMOJIS = ['🔥', '📱', '💡', '🎯', '✨', '🚀', '💪', '🎬', '📸', '🎉'];

const PLATFORM_TIPS = {
  twitter: 'X/Twitter: Keep it punchy. 280 chars max.',
  instagram: 'Instagram: Lead with a hook. Hashtags drive discovery.',
  facebook: 'Facebook: Tell a story. Longer posts can work well.',
  linkedin: 'LinkedIn: Professional tone. Add value for your network.',
  tiktok: 'TikTok: Match the energy of your video. Use trending tags.',
  youtube_community: 'YouTube: Engage your subscribers. Ask a question.',
  threads: 'Threads: Short, conversational, authentic.',
};

const HASHTAG_SUGGESTIONS = [
  'marketing', 'contentcreator', 'socialmedia', 'growthhacking',
  'entrepreneur', 'digitalmarketing', 'viral', 'trending',
  'motivation', 'business', 'creator', 'reels',
];

/**
 * Main content editor: auto-resize textarea, character counter,
 * emoji quick-insert, hashtag helper, and platform tip.
 */
export function ContentEditor({ platform, content, onContentChange, hashtags, onHashtagsChange }) {
  const textareaRef = useRef(null);
  const [showHashtagHint, setShowHashtagHint] = useState(false);
  const p = getPlatform(platform);

  /** Auto-resize textarea to fit content */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.max(el.scrollHeight, 160)}px`;
  }, [content]);

  /** Detect # at the end of content to show suggestions */
  useEffect(() => {
    const lastWord = content.split(/\s/).pop() || '';
    setShowHashtagHint(lastWord.startsWith('#') && lastWord.length >= 2);
  }, [content]);

  function insertEmoji(emoji) {
    onContentChange(content + emoji);
    textareaRef.current?.focus();
  }

  function insertHashtag(tag) {
    const words = content.split(/\s/);
    words[words.length - 1] = `#${tag} `;
    onContentChange(words.join(' '));
    setShowHashtagHint(false);
    textareaRef.current?.focus();
  }

  return (
    <div className="space-y-4">
      {/* Platform tip */}
      <p className="text-xs italic text-muted-foreground">
        {PLATFORM_TIPS[platform] || 'Write your post below.'}
      </p>

      {/* Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="What do you want to say?"
          className="w-full resize-none rounded-xl border border-border bg-background p-4 text-sm leading-relaxed outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
          style={{ minHeight: 160 }}
        />

        {/* Inline hashtag suggestions */}
        <AnimatePresence>
          {showHashtagHint && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1 rounded-lg border border-border bg-card p-2 shadow-lg"
            >
              {HASHTAG_SUGGESTIONS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => insertHashtag(tag)}
                  className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary hover:bg-primary/20"
                >
                  #{tag}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Character counter */}
      <CharacterCounter content={content} charLimit={p.charLimit} />

      {/* Toolbar: emoji row + link button */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-0.5">
          <Smile className="mr-1 h-4 w-4 text-muted-foreground" />
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => insertEmoji(emoji)}
              className="rounded p-1 text-base hover:bg-muted"
              title={`Insert ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <button
          onClick={() => onContentChange(content + ' https://')}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Link className="h-3.5 w-3.5" />
          Add Link
        </button>
      </div>

      {/* Hashtag pill input */}
      <HashtagInput hashtags={hashtags} onChange={onHashtagsChange} />
    </div>
  );
}
