import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@postpilot/lib';
import { Toaster } from '@postpilot/ui/sonner';
import ErrorBoundary from '@postpilot/ui/ErrorBoundary';
import { App } from './App.jsx';
import './index.css';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  console.warn('Missing VITE_CLERK_PUBLISHABLE_KEY — auth will not work');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ClerkProvider
        publishableKey={clerkPubKey}
        afterSignOutUrl="/"
        signInUrl="/login"
        signUpUrl="/signup"
      >
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <QueryClientProvider client={queryClientInstance}>
            <App />
            <Toaster position="bottom-right" richColors />
          </QueryClientProvider>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
