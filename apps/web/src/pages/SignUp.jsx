import { SignUp } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import { FloatingSocialBg } from '../components/shared/FloatingSocialBg.jsx';

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      {/* Gradient blobs */}
      <div className="absolute top-0 left-0 w-[80vw] sm:w-[500px] h-[80vw] sm:h-[500px] bg-gradient-to-br from-orange-400/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[70vw] sm:w-[400px] h-[70vw] sm:h-[400px] bg-gradient-to-tl from-violet-600/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[600px] h-[90vw] sm:h-[600px] bg-gradient-to-r from-accent/5 via-primary/5 to-violet-400/5 rounded-full blur-3xl" />

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
            Join{' '}
            <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              PostPilot
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Start turning videos into viral posts — free
          </p>
          <p className="max-w-sm text-center text-xs leading-relaxed text-muted-foreground/80">
            You're one step away from transforming how you create content.
            PostPilot turns a single video into scroll-stopping posts
            for every platform — powered by AI, built for creators like
            you. No more burnout, no more guesswork. Sign up free,
            connect your accounts, and watch your content work harder
            than ever. Your growth story starts right here.
          </p>
        </div>

        {/* Clerk SignUp */}
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
    </div>
  );
}
