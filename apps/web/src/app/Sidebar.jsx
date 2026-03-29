import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Youtube,
  PenSquare,
  CalendarDays,
  Image,
  Copy,
  Megaphone,
  BarChart3,
  MessageCircle,
  TrendingUp,
  Link2,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Users,
  Gift,
  Sparkles,
} from 'lucide-react';
import { cn } from '@postpilot/lib';

const NAV_SECTIONS = [
  {
    label: 'Content',
    items: [
      { to: '/app', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/app/videos', icon: Youtube, label: 'Videos' },
      { to: '/app/posts', icon: PenSquare, label: 'Posts' },
      { to: '/app/calendar', icon: CalendarDays, label: 'Calendar' },
      { to: '/app/media', icon: Image, label: 'Media' },
    ],
  },
  {
    label: 'Organize',
    items: [
      { to: '/app/templates', icon: Copy, label: 'Templates' },
      { to: '/app/campaigns', icon: Megaphone, label: 'Campaigns' },
      { to: '/app/circles', icon: Users, label: 'Circles' },
    ],
  },
  {
    label: 'Insights',
    items: [
      { to: '/app/analytics', icon: BarChart3, label: 'Analytics' },
      { to: '/app/comments', icon: MessageCircle, label: 'Comments' },
      { to: '/app/trending', icon: TrendingUp, label: 'Trending' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { to: '/app/connections', icon: Link2, label: 'Connections' },
      { to: '/app/pricing', icon: Sparkles, label: 'Pricing' },
      { to: '/app/billing', icon: CreditCard, label: 'Billing' },
      { to: '/app/referrals', icon: Gift, label: 'Referrals' },
      { to: '/app/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

export function Sidebar({ isOpen, onToggle, isMobile = false }) {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-14 items-center gap-3 border-b border-sidebar-border px-4">
        {isOpen ? (
          <img src="/logo.png" alt="PostPilot" className="h-8 w-auto" />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <Rocket className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-4">
            {isOpen && (
              <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
                {section.label}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const isActive =
                  item.to === '/app'
                    ? location.pathname === '/app'
                    : location.pathname.startsWith(item.to);

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-primary'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                    )}
                    title={!isOpen ? item.label : undefined}
                  >
                    <item.icon
                      className={cn(
                        'h-4 w-4 shrink-0',
                        isActive
                          ? 'text-sidebar-primary'
                          : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/70'
                      )}
                    />
                    {isOpen && <span>{item.label}</span>}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse toggle (desktop only) */}
      {!isMobile && (
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={onToggle}
            className="flex w-full items-center justify-center rounded-lg p-2 text-sidebar-foreground/50 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
