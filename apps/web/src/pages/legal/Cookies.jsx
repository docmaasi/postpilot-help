import { LegalLayout, LegalSection } from './LegalLayout.jsx';

export default function Cookies() {
  return (
    <LegalLayout title="Cookie Policy" updated="March 2026">
      <LegalSection title="What Are Cookies?">
        <p>
          Cookies are small text files stored on your device when you visit a website. They help
          us recognize you, remember your preferences, and improve your experience on
          PostPilot.Help.
        </p>
      </LegalSection>

      <LegalSection title="Essential Cookies">
        <p>
          These cookies are necessary for the Service to function. They handle authentication,
          security, and basic site functionality. You cannot opt out of essential cookies.
        </p>
      </LegalSection>

      <LegalSection title="Analytics Cookies">
        <p>
          We use analytics cookies to understand how visitors interact with PostPilot.Help. This
          helps us identify popular features, measure performance, and improve the user
          experience. Analytics data is aggregated and anonymized.
        </p>
      </LegalSection>

      <LegalSection title="Preference Cookies">
        <p>
          These cookies remember your choices such as language, theme (light/dark mode), and
          display settings so you don&apos;t have to reconfigure them on each visit.
        </p>
      </LegalSection>

      <LegalSection title="Marketing Cookies">
        <p>
          Marketing cookies may be used to deliver relevant advertisements and measure campaign
          effectiveness. We currently do not use third-party advertising cookies, but may do so
          in the future with proper notice.
        </p>
      </LegalSection>

      <LegalSection title="Managing Cookies">
        <p>
          Most browsers allow you to control cookies through settings. You can block or delete
          cookies, though this may affect your experience. Below are links to cookie settings
          for common browsers:
        </p>
        <ul className="ml-4 list-disc space-y-1">
          <li>Chrome: Settings &gt; Privacy and Security &gt; Cookies</li>
          <li>Firefox: Settings &gt; Privacy &amp; Security &gt; Cookies</li>
          <li>Safari: Preferences &gt; Privacy &gt; Manage Website Data</li>
          <li>Edge: Settings &gt; Cookies and Site Permissions</li>
        </ul>
      </LegalSection>

      <LegalSection title="Third-Party Cookies">
        <p>
          Some third-party services we use (such as authentication and analytics providers) may
          set their own cookies. We do not control these cookies. Please review the privacy
          policies of those services for details.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          For questions about our use of cookies, contact us at{' '}
          <a href="mailto:support@postpilot.help" className="text-primary hover:underline">
            support@postpilot.help
          </a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
