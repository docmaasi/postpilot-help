import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { AppLayout } from './AppLayout.jsx';

/**
 * Wraps the main app layout with Clerk auth.
 * Signed-in users see the sidebar + header layout.
 * Signed-out users are redirected to the Clerk sign-in page.
 */
export default function ProtectedLayout() {
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
