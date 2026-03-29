import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { PLATFORM_ORDER, getPlatform } from '../../lib/platforms.js';

/**
 * Modal-style form for creating/editing a template.
 * Handles name, platform, content, hashtags (comma-separated), and category.
 */
export function TemplateForm({ template, onSubmit, onClose }) {
  const isEditing = !!template;
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('twitter');
  const [content, setContent] = useState('');
  const [hashtagInput, setHashtagInput] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (template) {
      setName(template.name ?? '');
      setPlatform(template.platform ?? 'twitter');
      setContent(template.content ?? '');
      setHashtagInput((template.hashtags ?? []).join(', '));
      setCategory(template.category ?? '');
    }
  }, [template]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hashtags = hashtagInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);
    onSubmit({
      ...(template?._id ? { id: template._id } : {}),
      name,
      platform,
      content,
      hashtags,
      category: category || undefined,
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        onClick={onClose}
      >
        <motion.form
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit}
          className="w-full max-w-lg space-y-4 rounded-xl border border-border bg-card p-6 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">{isEditing ? 'Edit' : 'New'} Template</h2>
            <button type="button" onClick={onClose} className="rounded-lg p-1 hover:bg-muted">
              <X className="h-4 w-4" />
            </button>
          </div>

          <Field label="Name">
            <input value={name} onChange={(e) => setName(e.target.value)} required className="input-field" placeholder="e.g. Product Launch Tweet" />
          </Field>

          <Field label="Platform">
            <div className="flex flex-wrap gap-1.5">
              {PLATFORM_ORDER.map((key) => {
                const p = getPlatform(key);
                return (
                  <button key={key} type="button" onClick={() => setPlatform(key)}
                    className={['rounded-lg px-2.5 py-1 text-xs font-medium transition-all', platform === key ? 'text-white shadow-sm' : 'bg-muted text-muted-foreground'].join(' ')}
                    style={platform === key ? { backgroundColor: p.color } : {}}
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Content">
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={4} className="input-field resize-none" placeholder="Write your template content..." />
          </Field>

          <Field label="Hashtags (comma-separated)">
            <input value={hashtagInput} onChange={(e) => setHashtagInput(e.target.value)} className="input-field" placeholder="marketing, social, growth" />
          </Field>

          <Field label="Category (optional)">
            <input value={category} onChange={(e) => setCategory(e.target.value)} className="input-field" placeholder="e.g. Promotional" />
          </Field>

          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" /> {isEditing ? 'Save Changes' : 'Create Template'}
          </button>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({ label, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
