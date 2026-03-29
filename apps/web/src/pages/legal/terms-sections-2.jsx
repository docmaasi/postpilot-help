import { LegalSection } from './LegalLayout.jsx';

export function TermsDisclaimers() {
  return (
    <LegalSection title="7. Disclaimers">
      <p>
        The Service is provided "as is" and "as available" without warranties of any kind,
        whether express or implied, including but not limited to merchantability, fitness for a
        particular purpose, or non-infringement. We do not guarantee uninterrupted or
        error-free service.
      </p>
    </LegalSection>
  );
}

export function TermsLiability() {
  return (
    <LegalSection title="8. Limitation of Liability">
      <p>
        To the maximum extent permitted by law, PostPilot.Help shall not be liable for any
        indirect, incidental, special, consequential, or punitive damages, or loss of profits,
        data, or business opportunities arising from your use of the Service. Our total liability
        shall not exceed the amount you paid us in the 12 months preceding the claim.
      </p>
    </LegalSection>
  );
}

export function TermsGoverning() {
  return (
    <LegalSection title="9. Governing Law">
      <p>
        These Terms shall be governed by and construed in accordance with the laws of the
        State of Delaware, United States, without regard to conflict of law principles. Any
        disputes shall be resolved in the courts of Delaware.
      </p>
    </LegalSection>
  );
}

export function TermsContact() {
  return (
    <LegalSection title="10. Contact">
      <p>
        If you have questions about these Terms of Service, please contact us at{' '}
        <a href="mailto:support@postpilot.help" className="text-primary hover:underline">
          support@postpilot.help
        </a>.
      </p>
    </LegalSection>
  );
}
