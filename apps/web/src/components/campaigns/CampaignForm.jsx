import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';

const PRESET_COLORS = [
  '#8b5cf6', '#ec4899', '#f97316', '#14b8a6',
  '#3b82f6', '#eab308', '#ef4444', '#22c55e',
];

/**
 * Modal-style form for creating/editing a campaign.
 * Fields: name, description, color (preset picker), start/end dates, status.
 */
export function CampaignForm({ campaign, onSubmit, onClose }) {
  const isEditing = !!campaign;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('active');

  useEffect(() => {
    if (campaign) {
      setName(campaign.name ?? '');
      setDescription(campaign.description ?? '');
      setColor(campaign.color ?? PRESET_COLORS[0]);
      setStartDate(campaign.startDate ? toDateInput(campaign.startDate) : '');
      setEndDate(campaign.endDate ? toDateInput(campaign.endDate) : '');
      setStatus(campaign.status ?? 'active');
    }
  }, [campaign]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...(campaign?._id ? { id: campaign._id } : {}),
      name,
      description: description || undefined,
      color,
      startDate: startDate ? new Date(startDate).getTime() : undefined,
      endDate: endDate ? new Date(endDate).getTime() : undefined,
      status,
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
            <h2 className="text-lg font-bold">{isEditing ? 'Edit' : 'New'} Campaign</h2>
            <button type="button" onClick={onClose} className="rounded-lg p-1 hover:bg-muted">
              <X className="h-4 w-4" />
            </button>
          </div>

          <Field label="Campaign Name">
            <input value={name} onChange={(e) => setName(e.target.value)} required className="input-field" placeholder="e.g. Summer Launch" />
          </Field>

          <Field label="Description">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="input-field resize-none" placeholder="What is this campaign about?" />
          </Field>

          <Field label="Color">
            <div className="flex gap-2">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c} type="button" onClick={() => setColor(c)}
                  className={['h-7 w-7 rounded-full transition-all', color === c ? 'ring-2 ring-offset-2 ring-primary' : ''].join(' ')}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Start Date">
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input-field" />
            </Field>
            <Field label="End Date">
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input-field" />
            </Field>
          </div>

          {isEditing && (
            <Field label="Status">
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="input-field">
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </Field>
          )}

          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" /> {isEditing ? 'Save Changes' : 'Create Campaign'}
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

function toDateInput(ts) {
  return new Date(ts).toISOString().slice(0, 10);
}
