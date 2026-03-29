import { Link } from 'react-router-dom';
import { Mail, Clock, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { ContactForm } from './contact-form.jsx';
import { ContactFAQ } from './contact-faq.jsx';
import { LandingNav } from '../../components/landing/LandingNav.jsx';

const SOCIAL = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <div className="mx-auto max-w-3xl pt-24">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <img src="/logo.png" alt="PostPilot" className="h-8 w-auto" />
      </div>

      <h1 className="mb-2 text-3xl font-bold gradient-text">Contact Us</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        We would love to hear from you. Reach out anytime.
      </p>

      {/* Info cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
          <Mail className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Email</p>
            <a href="mailto:support@postpilot.help" className="text-sm text-primary hover:underline">
              support@postpilot.help
            </a>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
          <Clock className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Response Time</p>
            <p className="text-sm text-muted-foreground">Within 24 hours, Mon-Fri 9am-6pm EST</p>
          </div>
        </div>
      </div>

      {/* Social links */}
      <div className="mb-6 flex gap-3">
        {SOCIAL.map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <s.icon className="h-4 w-4" />
          </a>
        ))}
      </div>

      {/* Form */}
      <div className="mb-6">
        <ContactForm />
      </div>

      {/* FAQ */}
      <ContactFAQ />

      {/* Back link */}
      <div className="mt-12 border-t border-border pt-6">
        <Link to="/" className="text-sm text-primary hover:underline">
          &larr; Back to Dashboard
        </Link>
      </div>
      </div>
    </div>
  );
}
