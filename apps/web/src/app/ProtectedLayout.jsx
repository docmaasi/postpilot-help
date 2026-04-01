import { SignedIn, SignedOut, RedirectToSignIn, useAuth } from '@clerk/clerk-react';
import { AppLayout } from './AppLayout.jsx';
import { PageSkeleton } from './PageSkeleton.jsx';

/**
 * Wraps the main app layout with Clerk auth.
 * Waits for Clerk to finish loading before deciding to show app or redirect.
 * This prevents a brief flash of the redirect on first load.
 */
export default function ProtectedLayout() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <PageSkeleton />;
  }

  return (
    <>
      <SignedIn>
        <AppLayout />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
