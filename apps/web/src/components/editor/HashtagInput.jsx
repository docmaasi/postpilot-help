import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Hash } from 'lucide-react';

/**
 * Pill-style hashtag input. Type a tag, press Enter to add, click X to remove.
 */
export function HashtagInput({ hashtags = [], onChange }) {
  const [value, setValue] = useState('');

  function addTag(raw) {
    const tag = raw.replace(/^#+/, '').trim().toLowerCase();
    if (!tag || hashtags.includes(tag)) return;
    onChange([...hashtags, tag]);
    setValue('');
  }

  function removeTag(tag) {
    onChange(hashtags.filter((t) => t !== tag));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(value);
    }
    if (e.key === 'Backspace' && !value && hashtags.length) {
      removeTag(hashtags[hashtags.length - 1]);
    }
  }

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Hash className="h-3.5 w-3.5" />
        Hashtags
      </label>

      {/* Pill display */}
      <div className="flex flex-wrap gap-1.5">
        <AnimatePresence mode="popLayout">
          {hashtags.map((tag) => (
            <motion.span
              key={tag}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="rounded-full p-0.5 hover:bg-primary/20"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a hashtag and press Enter"
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary/30"
      />
    </div>
  );
}
