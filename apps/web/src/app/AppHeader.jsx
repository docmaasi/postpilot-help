import { Menu, Search, Moon, Sun, LayoutGrid } from 'lucide-react';
import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { UserButton } from '@clerk/clerk-react';
import { HamburgerMenu } from './header/HamburgerMenu.jsx';

export function AppHeader({ onMenuClick }) {
  const [darkMode, setDarkMode] = useState(
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="relative flex h-14 items-center gap-4 border-b border-border bg-card px-4">
      {/* Mobile menu button */}
      <button
        className="rounded-lg p-2 hover:bg-muted md:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Hamburger grid menu */}
      <button
        className="rounded-lg p-2 hover:bg-muted"
        onClick={() => setMenuOpen((v) => !v)}
        title="Quick navigation"
      >
        <LayoutGrid className="h-5 w-5 text-muted-foreground" />
      </button>

      {/* Search */}
      <div className="flex flex-1 items-center gap-2">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search posts, videos, campaigns..."
            className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        <button
          className="rounded-lg p-2 hover:bg-muted"
          onClick={toggleDarkMode}
          title={darkMode ? 'Light mode' : 'Dark mode'}
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Dropdown menu */}
      <AnimatePresence>
        {menuOpen && <HamburgerMenu onClose={closeMenu} />}
      </AnimatePresence>
    </header>
  );
}
