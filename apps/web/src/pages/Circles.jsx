import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { MemberList } from '../components/circles/MemberList.jsx';
import { InviteForm } from '../components/circles/InviteForm.jsx';
import { CircleCapacity } from '../components/circles/CircleCapacity.jsx';
import { RoleExplainer } from '../components/circles/RoleExplainer.jsx';

const MEMBERS = [
  { id: '1', name: 'Alex Rivera', email: 'alex@studio.co', role: 'editor', status: 'active', joined: '2025-11-12' },
  { id: '2', name: 'Sam Chen', email: 'sam@creator.io', role: 'contributor', status: 'active', joined: '2025-12-01' },
  { id: '3', name: 'Jordan Lee', email: 'jordan@example.com', role: 'viewer', status: 'invited', joined: null },
];

export default function Circles() {
  const [showInvite, setShowInvite] = useState(false);
  const [showRoles, setShowRoles] = useState(false);

  const activeCount = MEMBERS.filter((m) => m.status === 'active').length;
  const maxSlots = 5;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="social-bg rounded-2xl bg-card p-8 text-center"
      >
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl stat-gradient-violet">
          <Users className="h-7 w-7 text-violet-500" />
        </div>
        <h1 className="text-3xl font-bold gradient-text">PostPilot Circles</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Invite collaborators to help manage your content. Assign roles so
          everyone knows what they can do.
        </p>
        <button
          onClick={() => setShowInvite(!showInvite)}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Invite Member
        </button>
      </motion.div>

      {/* Invite Form */}
      <AnimatePresence>
        {showInvite && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <InviteForm onClose={() => setShowInvite(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Capacity Bar */}
      <CircleCapacity used={activeCount} max={maxSlots} />

      {/* Members */}
      <MemberList members={MEMBERS} />

      {/* Role Explainer */}
      <div>
        <button
          onClick={() => setShowRoles(!showRoles)}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {showRoles ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          What can each role do?
        </button>
        <AnimatePresence>
          {showRoles && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3"
            >
              <RoleExplainer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
