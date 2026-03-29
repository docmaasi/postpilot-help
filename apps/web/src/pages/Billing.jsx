import { CreditCard } from 'lucide-react';

export default function Billing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing & Plans</h1>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and payment details
        </p>
      </div>

      {/* Current plan */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Free Plan</h2>
            <p className="text-sm text-muted-foreground">
              You are currently on the free tier
            </p>
          </div>
        </div>
      </div>

      {/* Plan comparison placeholder */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {['Free', 'Pro', 'Business'].map((plan) => (
          <div
            key={plan}
            className="rounded-xl border border-border bg-card p-6 shadow-subtle"
          >
            <h3 className="text-lg font-bold">{plan}</h3>
            <p className="mt-1 text-2xl font-bold">
              {plan === 'Free' ? '$0' : plan === 'Pro' ? '$29' : '$79'}
              <span className="text-sm font-normal text-muted-foreground">
                /month
              </span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {plan === 'Free'
                ? 'Get started with basic features'
                : plan === 'Pro'
                  ? 'Everything you need to grow'
                  : 'For power users and teams'}
            </p>
            <button
              className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium ${
                plan === 'Free'
                  ? 'border border-border text-muted-foreground'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
              disabled={plan === 'Free'}
            >
              {plan === 'Free' ? 'Current Plan' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
