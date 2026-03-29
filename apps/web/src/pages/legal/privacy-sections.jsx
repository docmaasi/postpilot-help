import { LegalSection } from './LegalLayout.jsx';

export function PrivacyInfo() {
  return (
    <LegalSection title="1. Information We Collect">
      <p><strong>Account information:</strong> Name, email address, and profile photo when you sign up.</p>
      <p><strong>Content data:</strong> Posts, media, schedules, and analytics you create within the Service.</p>
      <p><strong>Usage data:</strong> Pages visited, features used, device type, browser, IP address, and referral source.</p>
      <p><strong>Payment data:</strong> Billing information processed securely by our payment provider (Stripe). We do not store full card numbers.</p>
      <p><strong>Connected accounts:</strong> OAuth tokens and profile data from social platforms you connect.</p>
    </LegalSection>
  );
}

export function PrivacyUse() {
  return (
    <LegalSection title="2. How We Use Your Information">
      <p>We use collected information to:</p>
      <ul className="ml-4 list-disc space-y-1">
        <li>Provide, maintain, and improve the Service</li>
        <li>Process transactions and send billing notifications</li>
        <li>Send product updates, tips, and promotional content (opt-out available)</li>
        <li>Analyze usage patterns to improve features</li>
        <li>Detect and prevent fraud or abuse</li>
        <li>Comply with legal obligations</li>
      </ul>
    </LegalSection>
  );
}

export function PrivacyCookies() {
  return (
    <LegalSection title="3. Cookies & Tracking">
      <p>
        We use cookies and similar technologies to keep you signed in, remember preferences,
        and understand how you use PostPilot.Help. See our{' '}
        <a href="/cookies" className="text-primary hover:underline">Cookie Policy</a> for details.
      </p>
    </LegalSection>
  );
}

export function PrivacyThirdParty() {
  return (
    <LegalSection title="4. Third-Party Services">
      <p>We may share limited data with trusted third parties including:</p>
      <ul className="ml-4 list-disc space-y-1">
        <li><strong>Stripe</strong> — payment processing</li>
        <li><strong>Analytics providers</strong> — aggregated, anonymized usage data</li>
        <li><strong>Social platforms</strong> — only data you authorize for publishing</li>
        <li><strong>Cloud infrastructure</strong> — hosting and storage providers</li>
      </ul>
      <p>We never sell your personal data to third parties.</p>
    </LegalSection>
  );
}
