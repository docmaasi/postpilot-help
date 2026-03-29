import { Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const SOCIAL_LINKS = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export function FooterSocial() {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
        Connect
      </h4>
      <div className="flex gap-3">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white/80"
          >
            <social.icon className="h-4 w-4" />
          </a>
        ))}
      </div>
      <p className="mt-6 text-xs leading-relaxed text-white/40">
        Stay connected with PostPilot for tips, updates, and creator resources.
      </p>
    </div>
  );
}
