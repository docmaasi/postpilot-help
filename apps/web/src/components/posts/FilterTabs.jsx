import { motion } from 'framer-motion';

export function FilterTabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 rounded-lg bg-muted p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className="relative rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors"
        >
          {active === tab && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-md bg-card shadow-sm"
              transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
            />
          )}
          <span
            className={`relative z-10 ${active === tab ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            {tab}
          </span>
        </button>
      ))}
    </div>
  );
}
