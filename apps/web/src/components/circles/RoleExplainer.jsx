import { Eye, Pencil, Send, Upload } from 'lucide-react';

const ROLES = [
  {
    name: 'Viewer',
    icon: Eye,
    color: 'text-gray-400',
    abilities: ['View posts and analytics', 'Leave comments'],
  },
  {
    name: 'Contributor',
    icon: Pencil,
    color: 'text-blue-500',
    abilities: ['Create draft posts', 'Upload media', 'Cannot publish'],
  },
  {
    name: 'Editor',
    icon: Send,
    color: 'text-violet-500',
    abilities: ['Edit any draft', 'Schedule posts', 'Manage templates'],
  },
  {
    name: 'Publisher',
    icon: Upload,
    color: 'text-green-500',
    abilities: ['Publish directly', 'Manage connections', 'Full content control'],
  },
];

export function RoleExplainer() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {ROLES.map((role) => (
        <div
          key={role.name}
          className="rounded-xl border border-border bg-card p-4 glow-card"
        >
          <role.icon className={`h-5 w-5 ${role.color} mb-2`} />
          <h4 className="text-sm font-bold mb-2">{role.name}</h4>
          <ul className="space-y-1">
            {role.abilities.map((a) => (
              <li key={a} className="text-xs text-muted-foreground">
                {a}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
