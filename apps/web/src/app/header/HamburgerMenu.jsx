import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Youtube, PenSquare, CalendarDays, Image,
  Copy, Megaphone, Users, BarChart3, MessageCircle, TrendingUp,
  Link2, CreditCard, Gift, Settings,
} from 'lucide-react';

const MENU_SECTIONS = [
  {
    title: 'Content',
    items: [
      { to: '/app', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/app/videos', icon: Youtube, label: 'Videos' },
      { to: '/app/posts', icon: PenSquare, label: 'Posts' },
      { to: '/app/calendar', icon: CalendarDays, label: 'Calendar' },
      { to: '/app/media', icon: Image, label: 'Media' },
    ],
  },
  {
    title: 'Organize',
    items: [
      { to: '/app/templates', icon: Copy, label: 'Templates' },
      { to: '/app/campaigns', icon: Megaphone, label: 'Campaigns' },
      { to: '/app/circles', icon: Users, label: 'Circles' },
    ],
  },
  {
    title: 'Insights',
    items: [
      { to: '/app/analytics', icon: BarChart3, label: 'Analytics' },
      { to: '/app/comments', icon: MessageCircle, label: 'Comments' },
      { to: '/app/trending', icon: TrendingUp, label: 'Trending' },
    ],
  },
  {
    title: 'Account',
    items: [
      { to: '/app/connections', icon: Link2, label: 'Connections' },
      { to: '/app/billing', icon: CreditCard, label: 'Billing' },
      { to: '/app/referrals', icon: Gift, label: 'Referrals' },
      { to: '/app/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

export const HamburgerMenu = forwardRef(function HamburgerMenu({ onClose }, ref) {
  const navigate = useNavigate();

  function handleClick(to) {
    onClose();
    navigate(to);
  }

  return (
    <motion.div
      ref={ref}
      className="absolute left-0 right-0 top-full z-50 mx-4 mt-1 overflow-hidden rounded-xl border border-border bg-card shadow-lg sm:left-auto sm:right-0 sm:mx-0 sm:w-[480px]"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      {/* Logo header */}
      <div className="flex items-center gap-2.5 border-b border-border px-5 py-3">
        <img src="/logo.png" alt="PostPilot" className="h-7 w-auto" />
      </div>

      {/* Menu grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 p-5">
        {MENU_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              {section.title}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <button
                  key={item.to}
                  onClick={() => handleClick(item.to)}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                >
                  <item.icon className="h-4 w-4 text-primary/60" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
});
