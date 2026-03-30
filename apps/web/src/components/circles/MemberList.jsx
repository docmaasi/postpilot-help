import { motion } from 'framer-motion';
import { MoreHorizontal, UserPlus } from 'lucide-react';

const ROLE_COLORS = {
  contributor: 'bg-blue-500/10 text-blue-500',
  editor: 'bg-violet-500/10 text-violet-500',
  publisher: 'bg-green-500/10 text-green-500',
  viewer: 'bg-gray-500/10 text-gray-400',
};

const STATUS_BADGE = {
  active: 'bg-green-500/10 text-green-500',
  invited: 'bg-yellow-500/10 text-yellow-500',
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } };

export function MemberList({ members }) {
  if (!members.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-dashed border-border bg-card p-10 text-center"
      >
        <UserPlus className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm font-semibold text-foreground">No Circle members yet</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Invite your first collaborator using the button above.
        </p>
      </motion.div>
    );
  }

  const active = members.filter((m) => m.status === 'active');
  const pending = members.filter((m) => m.status === 'invited');

  return (
    <div className="space-y-6">
      {active.length > 0 && (
        <Section title="Active Members" members={active} />
      )}
      {pending.length > 0 && (
        <Section title="Pending Invites" members={pending} />
      )}
    </div>
  );
}

function Section({ title, members }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        {title}
      </h3>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-2"
      >
        {members.map((member) => (
          <motion.div
            key={member.id}
            variants={item}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 glow-card"
          >
            <Avatar name={member.name} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{member.name}</p>
              <p className="text-xs text-muted-foreground truncate">{member.email}</p>
            </div>
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${ROLE_COLORS[member.role]}`}>
              {member.role}
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${STATUS_BADGE[member.status]}`}>
              {member.status}
            </span>
            <button className="p-1 rounded hover:bg-muted transition-colors">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function Avatar({ name }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
      {initials}
    </div>
  );
}
