import { useState } from 'react';
import { useAction } from 'convex/react';
import { api } from 'convex/_generated/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Hash,
  MousePointerClick,
  Palette,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ResultCards } from './AIResultCards.jsx';

const TONES = ['professional', 'funny', 'bold', 'informative', 'urgent'];

const TONE_LABELS = {
  professional: 'Professional',
  funny: 'Funny',
  bold: 'Bold',
  informative: 'Informative',
  urgent: 'Urgent',
};

/**
 * AI assistant panel for the post editor.
 * Provides rewrite, hashtag, CTA, and tone generation.
 */
export function AIPanel({ platform, content, onInsert, onInsertHashtags }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(null);
  const [results, setResults] = useState(null);
  const [selectedTone, setSelectedTone] = useState('professional');

  const rewrite = useAction(api.ai.generate.rewriteForPlatform);
  const hashtagAction = useAction(api.ai.generate.suggestHashtags);
  const ctaAction = useAction(api.ai.generateExtras.suggestCTAs);
  const tonesAction = useAction(api.ai.generateExtras.generateMultipleTones);

  const hasContent = content?.trim().length > 0;

  async function handleRewrite() {
    if (!hasContent) return;
    setLoading('rewrite');
    setResults(null);
    const res = await rewrite({ content, fromPlatform: platform, toPlatform: platform, tone: selectedTone });
    setResults(res.error ? { error: res.error } : { type: 'rewrite', items: [res.rewritten] });
    setLoading(null);
  }

  async function handleHashtags() {
    if (!hasContent) return;
    setLoading('hashtags');
    setResults(null);
    const res = await hashtagAction({ content, platform });
    setResults(res.error ? { error: res.error } : { type: 'hashtags', items: res.hashtags });
    setLoading(null);
  }

  async function handleCTAs() {
    if (!hasContent) return;
    setLoading('ctas');
    setResults(null);
    const res = await ctaAction({ content, platform });
    setResults(res.error ? { error: res.error } : { type: 'ctas', items: res.ctas });
    setLoading(null);
  }

  async function handleTones() {
    if (!hasContent) return;
    setLoading('tones');
    setResults(null);
    const res = await tonesAction({ content, platform });
    if (res.error) {
      setResults({ error: res.error });
    } else {
      const items = TONES.map((t) => ({ tone: t, text: res.tones[t] })).filter((i) => i.text);
      setResults({ type: 'tones', items });
    }
    setLoading(null);
  }

  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-primary"
      >
        <span className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          AI Assistant
        </span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 px-4 pb-4">
              <ToneSelector selected={selectedTone} onChange={setSelectedTone} />
              <ActionButtons
                loading={loading}
                hasContent={hasContent}
                onRewrite={handleRewrite}
                onHashtags={handleHashtags}
                onCTAs={handleCTAs}
                onTones={handleTones}
              />
              <ResultCards results={results} onInsert={onInsert} onInsertHashtags={onInsertHashtags} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToneSelector({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {TONES.map((tone) => (
        <button
          key={tone}
          onClick={() => onChange(tone)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            selected === tone
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          {TONE_LABELS[tone]}
        </button>
      ))}
    </div>
  );
}

function ActionButtons({ loading, hasContent, onRewrite, onHashtags, onCTAs, onTones }) {
  const buttons = [
    { key: 'rewrite', label: 'AI Rewrite', icon: Sparkles, action: onRewrite },
    { key: 'hashtags', label: 'Hashtags', icon: Hash, action: onHashtags },
    { key: 'ctas', label: 'CTAs', icon: MousePointerClick, action: onCTAs },
    { key: 'tones', label: 'All Tones', icon: Palette, action: onTones },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {buttons.map(({ key, label, icon: Icon, action }) => (
        <button
          key={key}
          onClick={action}
          disabled={!hasContent || loading !== null}
          className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
        >
          {loading === key ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Icon className="h-3.5 w-3.5" />}
          {label}
        </button>
      ))}
    </div>
  );
}
