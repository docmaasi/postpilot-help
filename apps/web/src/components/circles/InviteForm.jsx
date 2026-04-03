import { useState } from 'react';
import { Send, X, Loader2 } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';

const ROLES = [
  { value: 'viewer', label: 'Viewer' },
  { value: 'contributor', label: 'Contributor' },
  { value: 'editor', label: 'Editor' },
  { value: 'publisher', label: 'Publisher' },
];

export function InviteForm({ workspaceId, onClose }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('contributor');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const addMember = useMutation(api.workspaces.addMember);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!workspaceId) {
      setError('No workspace found. Please create a Circle first.');
      return;
    }
    setSending(true);
    setError('');
    try {
      await addMember({ workspaceId, email, role });
      setEmail('');
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to send invite');
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Invite a Collaborator</h3>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="collaborator@email.com"
          required
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {sending ? 'Sending...' : 'Send Invite'}
        </button>
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </form>
  );
}
