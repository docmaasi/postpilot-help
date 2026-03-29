import { LegalSection } from './LegalLayout.jsx';

export function PrivacyRetention() {
  return (
    <LegalSection title="5. Data Retention">
      <p>
        We retain your data for as long as your account is active or as needed to provide
        the Service. Upon account deletion, we remove your personal data within 30 days,
        except where retention is required by law or legitimate business interest (e.g.,
        billing records).
      </p>
    </LegalSection>
  );
}

export function PrivacyRights() {
  return (
    <LegalSection title="6. Your Rights">
      <p>Depending on your location, you may have the right to:</p>
      <ul className="ml-4 list-disc space-y-1">
        <li>Access, correct, or delete your personal data</li>
        <li>Export your data in a portable format</li>
        <li>Opt out of marketing communications</li>
        <li>Restrict or object to certain processing</li>
        <li>Withdraw consent at any time</li>
      </ul>
      <p>
        To exercise these rights, contact us at{' '}
        <a href="mailto:support@postpilot.help" className="text-primary hover:underline">
          support@postpilot.help
        </a>.
      </p>
    </LegalSection>
  );
}

export function PrivacyCCPA() {
  return (
    <LegalSection title="7. CCPA (California Residents)">
      <p>
        California residents have additional rights under the California Consumer Privacy Act,
        including the right to know what personal information is collected, request deletion,
        and opt out of the sale of personal information. We do not sell personal information.
      </p>
    </LegalSection>
  );
}

export function PrivacyGDPR() {
  return (
    <LegalSection title="8. GDPR (EU/EEA Residents)">
      <p>
        If you are in the EU/EEA, we process your data based on consent, contractual necessity,
        or legitimate interest. You may lodge a complaint with your local data protection
        authority. Our data processing complies with GDPR requirements.
      </p>
    </LegalSection>
  );
}

export function PrivacyChildren() {
  return (
    <LegalSection title="9. Children's Privacy">
      <p>
        PostPilot.Help is not directed at children under 18. We do not knowingly collect
        personal information from minors. If we learn that a child has provided us with personal
        data, we will delete it promptly.
      </p>
    </LegalSection>
  );
}

export function PrivacyContact() {
  return (
    <LegalSection title="10. Contact Us">
      <p>
        For questions about this Privacy Policy, contact us at{' '}
        <a href="mailto:support@postpilot.help" className="text-primary hover:underline">
          support@postpilot.help
        </a>.
      </p>
    </LegalSection>
  );
}
