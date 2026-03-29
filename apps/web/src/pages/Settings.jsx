import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import { useCurrentUser, useUpdateProfile } from '@postpilot/lib';
import { ProfileSection } from '../components/settings/ProfileSection.jsx';
import { AppearanceSection } from '../components/settings/AppearanceSection.jsx';
import { PlatformDefaults } from '../components/settings/PlatformDefaults.jsx';
import { NotificationsAndDanger } from '../components/settings/DangerZone.jsx';
import { PLATFORM_ORDER } from '../lib/platforms.js';
import { Save } from 'lucide-react';

export default function Settings() {
  const { user: clerkUser } = useUser();
  const profile = useCurrentUser();
  const updateProfile = useUpdateProfile();

  const [displayName, setDisplayName] = useState(
    profile?.displayName ?? clerkUser?.fullName ?? '',
  );
  const [timezone, setTimezone] = useState(
    profile?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [theme, setTheme] = useState(profile?.theme ?? 'system');
  const [platforms, setPlatforms] = useState(
    profile?.defaultPlatforms ?? [...PLATFORM_ORDER],
  );
  const [emailNotifs, setEmailNotifs] = useState(
    profile?.emailNotifications ?? true,
  );
  const [saving, setSaving] = useState(false);

  const email =
    clerkUser?.primaryEmailAddress?.emailAddress ?? profile?.email ?? '';

  function togglePlatform(key) {
    setPlatforms((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key],
    );
  }

  async function handleSave() {
    setSaving(true);
    try {
      await updateProfile({
        displayName,
        timezone,
        theme,
        defaultPlatforms: platforms,
        emailNotifications: emailNotifs,
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">Settings</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account and preferences
        </p>
      </motion.div>

      <ProfileSection
        displayName={displayName}
        email={email}
        onNameChange={setDisplayName}
      />

      {/* Timezone */}
      <TimezoneSection timezone={timezone} onChange={setTimezone} />

      <AppearanceSection theme={theme} onThemeChange={setTheme} />
      <PlatformDefaults selected={platforms} onToggle={togglePlatform} />
      <NotificationsAndDanger
        emailNotifs={emailNotifs}
        onNotifsChange={setEmailNotifs}
      />

      {/* Save button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        {saving ? 'Saving...' : 'Save Settings'}
      </motion.button>
    </div>
  );
}

/** Compact timezone selector */
function TimezoneSection({ timezone, onChange }) {
  const zones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Anchorage',
    'Pacific/Honolulu',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney',
  ];
  return (
    <div className="glow-card rounded-xl border border-border bg-card p-6 shadow-subtle">
      <h2 className="mb-3 text-lg font-semibold">Timezone</h2>
      <select
        value={timezone}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
      >
        {zones.map((z) => (
          <option key={z} value={z}>
            {z.replace(/_/g, ' ')}
          </option>
        ))}
      </select>
    </div>
  );
}
