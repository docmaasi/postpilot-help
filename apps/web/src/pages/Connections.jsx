import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { PlatformCard } from '../components/connections/PlatformCard.jsx';
import { BenefitsSection } from '../components/connections/BenefitsSection.jsx';
import { useConnectionStatus, useInitiateOAuth } from '@postpilot/lib';

const PLATFORMS = [
  { key: 'youtube', name: 'YouTube', color: '#FF0000', description: 'Publish community posts and track video engagement.' },
  { key: 'twitter', name: 'X / Twitter', color: '#1DA1F2', description: 'Share tweets and threads, track replies and mentions.' },
  { key: 'instagram', name: 'Instagram', color: '#E4405F', description: 'Post reels, stories, and carousels with scheduling.' },
  { key: 'facebook', name: 'Facebook', color: '#1877F2', description: 'Publish to pages and groups, monitor comments.' },
  { key: 'linkedin', name: 'LinkedIn', color: '#0A66C2', description: 'Share professional content and articles.' },
  { key: 'tiktok', name: 'TikTok', color: '#010101', description: 'Upload short-form videos and track views.' },
  { key: 'threads', name: 'Threads', color: '#010101', description: 'Post threads and engage with your audience.' },
];

export default function Connections() {
  const connections = useConnectionStatus();
  const initiateOAuth = useInitiateOAuth();
  const [connecting, setConnecting] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Show toast-style feedback from OAuth redirect
  const connectedPlatform = searchParams.get('connected');
  const errorMessage = searchParams.get('error');

  useEffect(() => {
    if (connectedPlatform || errorMessage) {
      const timer = setTimeout(() => {
        setSearchParams({}, { replace: true });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [connectedPlatform, errorMessage, setSearchParams]);

  // Merge live connection data with platform list
  const platforms = PLATFORMS.map((p) => {
    const conn = connections?.find((c) => c.platform === p.key);
    return {
      ...p,
      status: conn?.status ?? 'not_connected',
      accountName: conn?.accountName ?? null,
      lastSyncAt: conn?.lastSyncAt ?? null,
      connectionId: conn?._id ?? null,
    };
  });

  async function handleConnect(key) {
    setConnecting(key);
    try {
      const convexSiteUrl = import.meta.env.VITE_CONVEX_SITE_URL ?? '';
      const redirectUri = `${convexSiteUrl}/oauth/callback`;
      const result = await initiateOAuth({ platform: key, redirectUri });
      window.location.href = result.authorizationUrl;
    } catch (err) {
      console.error('OAuth initiation failed:', err);
      window.alert('Failed to start connection. Please try again.');
      setConnecting(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Feedback banners */}
      {connectedPlatform && (
        <div className="rounded-lg bg-success/10 p-3 text-sm text-success">
          Successfully connected {connectedPlatform}!
        </div>
      )}
      {errorMessage && (
        <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          Connection error: {errorMessage}
        </div>
      )}

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">Connect Your Platforms</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Link your social accounts to publish, track analytics, and monitor comments.
        </p>
      </motion.div>

      {/* Platform grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((p, i) => (
          <PlatformCard
            key={p.key}
            platform={p}
            index={i}
            onConnect={handleConnect}
            isConnecting={connecting === p.key}
          />
        ))}
      </div>

      <BenefitsSection />
    </div>
  );
}
