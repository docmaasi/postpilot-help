import { Check } from 'lucide-react';

const TONE_LABELS = {
  professional: 'Professional',
  funny: 'Funny',
  bold: 'Bold',
  informative: 'Informative',
  urgent: 'Urgent',
};

export function ResultCards({ results, onInsert, onInsertHashtags }) {
  if (!results) return null;

  if (results.error) {
    return (
      <div className="rounded-lg bg-destructive/10 p-3 text-xs text-destructive">
        {results.error}
      </div>
    );
  }

  if (results.type === 'tones') {
    return (
      <div className="space-y-2">
        {results.items.map((item) => (
          <ResultCard
            key={item.tone}
            label={TONE_LABELS[item.tone]}
            text={item.text}
            onUse={() => onInsert(item.text)}
          />
        ))}
      </div>
    );
  }

  if (results.type === 'hashtags') {
    return <HashtagResults results={results} onInsertHashtags={onInsertHashtags} />;
  }

  return (
    <div className="space-y-2">
      {results.items.map((text, i) => (
        <ResultCard key={i} text={text} onUse={() => onInsert(text)} />
      ))}
    </div>
  );
}

function HashtagResults({ results, onInsertHashtags }) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {results.items.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
          >
            {tag}
          </span>
        ))}
      </div>
      <button
        onClick={() => onInsertHashtags(results.items.map((t) => t.replace('#', '')))}
        className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
      >
        <Check className="h-3 w-3" /> Use All
      </button>
    </div>
  );
}

function ResultCard({ label, text, onUse }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      {label && (
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
      )}
      <p className="mb-2 text-xs leading-relaxed text-foreground">{text}</p>
      <button
        onClick={onUse}
        className="flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary hover:bg-primary/20"
      >
        <Check className="h-3 w-3" /> Use This
      </button>
    </div>
  );
}
