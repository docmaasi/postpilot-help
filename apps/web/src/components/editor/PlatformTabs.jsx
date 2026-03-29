import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { PLATFORM_ORDER, getPlatform } from '@/lib/platforms.js';

/**
 * Horizontal scrollable platform tab bar with brand-color active indicator.
 * Shows a colored dot on platforms that already have content.
 */
export function PlatformTabs({ active, onChange, contentMap = {} }) {
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  /** Measure active tab to position the sliding underline */
  useEffect(() => {
    const el = tabRefs.current[active];
    if (!el) return;
    setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  return (
    <div className="relative overflow-x-auto scrollbar-none">
      <div className="flex gap-1 pb-1">
        {PLATFORM_ORDER.map((key) => {
          const p = getPlatform(key);
          const Icon = Icons[p.icon] || Icons.Globe;
          const isActive = key === active;
          const hasContent = (contentMap[key] || '').length > 0;

          return (
            <button
              key={key}
              ref={(el) => { tabRefs.current[key] = el; }}
              onClick={() => onChange(key)}
              className={`relative flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground/80'
              }`}
            >
              <Icon
                className="h-4 w-4"
                style={isActive ? { color: p.color } : undefined}
              />
              <span className="hidden sm:inline">{p.name}</span>

              {/* Content indicator dot */}
              {hasContent && !isActive && (
                <span
                  className="absolute -top-0.5 right-1 h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: p.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 h-0.5 rounded-full"
        style={{ backgroundColor: getPlatform(active).color }}
        animate={{ left: indicator.left, width: indicator.width }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      />
    </div>
  );
}
