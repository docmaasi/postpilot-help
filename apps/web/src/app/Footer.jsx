import { FooterLinks } from './footer/FooterLinks.jsx';
import { FooterSocial } from './footer/FooterSocial.jsx';

export function Footer() {
  return (
    <footer className="mt-12 bg-[hsl(250,25%,10%)] text-white">
      {/* Gradient accent line */}
      <div className="h-1 bg-gradient-to-r from-[hsl(265,75%,65%)] via-[hsl(330,80%,60%)] to-[hsl(265,75%,65%)]" />

      {/* Main footer content */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <img src="/logo.png" alt="PostPilot" className="h-10 w-auto" />
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              Organize &amp; Publish Your Social Media Content
            </p>
          </div>

          {/* Link columns */}
          <FooterLinks />

          {/* Social column */}
          <FooterSocial />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; 2026 PostPilot.Help. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Made with <span className="text-[hsl(330,80%,60%)]">&hearts;</span> for creators
          </p>
        </div>
      </div>
    </footer>
  );
}
