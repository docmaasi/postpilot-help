import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import { FloatingSocialBg } from '../components/shared/FloatingSocialBg.jsx';

export default function Login() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      {/* Gradient blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-violet-600/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-pink-500/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 via-accent/5 to-orange-400/5 rounded-full blur-3xl" />

      {/* Floating social icons */}
      <FloatingSocialBg density="medium" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Logo + tagline */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 shadow-lg">
            <Rocket className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold">
            Welcome back to{' '}
            <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              PostPilot
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Your social media command center
          </p>
          <p className="max-w-sm text-center text-xs leading-relaxed text-muted-foreground/80">
            Great to see you again! Your content calendar, scheduled posts,
            and AI tools are right where you left them. Jump back in
            and keep building momentum — consistency is what separates
            creators who grow from creators who stall. Your audience
            is waiting. Let's make today count.
          </p>
        </div>

        {/* Clerk SignIn */}
        <SignIn
          forceRedirectUrl="/app"
          signUpUrl="/signup"
        />

        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-medium hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
