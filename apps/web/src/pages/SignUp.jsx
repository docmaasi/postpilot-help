import { SignUp } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background gap-4">
      <SignUp
        forceRedirectUrl="/app"
        signInUrl="/login"
      />
      <p className="text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
