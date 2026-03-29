import { LegalSection } from './LegalLayout.jsx';

export function TermsAcceptance() {
  return (
    <LegalSection title="1. Acceptance of Terms">
      <p>
        By accessing or using PostPilot.Help ("the Service"), you agree to be bound by these
        Terms of Service. If you do not agree, you may not use the Service. We may update these
        terms at any time; continued use constitutes acceptance of the revised terms.
      </p>
    </LegalSection>
  );
}

export function TermsAccount() {
  return (
    <LegalSection title="2. Account Registration">
      <p>
        You must provide accurate, current, and complete information when creating an account.
        You are responsible for safeguarding your password and for all activity under your account.
        You must be at least 18 years old to use the Service.
      </p>
    </LegalSection>
  );
}

export function TermsContent() {
  return (
    <LegalSection title="3. User Content">
      <p>
        You retain ownership of all content you upload, create, or share through the Service
        ("User Content"). By using PostPilot.Help, you grant us a limited, non-exclusive license
        to host, store, and display your User Content solely to provide the Service.
      </p>
      <p>
        You are solely responsible for your User Content and must ensure it does not violate any
        third-party rights or applicable laws. We reserve the right to remove content that
        violates these terms.
      </p>
    </LegalSection>
  );
}

export function TermsIP() {
  return (
    <LegalSection title="4. Intellectual Property">
      <p>
        The Service, including its design, features, code, and branding, is owned by
        PostPilot.Help and protected by intellectual property laws. You may not copy, modify,
        distribute, or reverse-engineer any part of the Service without written permission.
      </p>
    </LegalSection>
  );
}

export function TermsPayment() {
  return (
    <LegalSection title="5. Payment Terms">
      <p>
        Paid plans are billed in advance on a monthly or annual basis. All fees are
        non-refundable except as required by law. We may change pricing with 30 days notice.
        You authorize us to charge your payment method for recurring subscription fees.
      </p>
    </LegalSection>
  );
}

export function TermsTermination() {
  return (
    <LegalSection title="6. Termination">
      <p>
        Either party may terminate this agreement at any time. You may cancel your account
        through your settings. We may suspend or terminate access if you violate these terms.
        Upon termination, your right to use the Service ceases, but we may retain certain data
        as required by law.
      </p>
    </LegalSection>
  );
}
