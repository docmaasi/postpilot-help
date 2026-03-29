import { LegalLayout } from './LegalLayout.jsx';
import {
  PrivacyInfo,
  PrivacyUse,
  PrivacyCookies,
  PrivacyThirdParty,
} from './privacy-sections.jsx';
import {
  PrivacyRetention,
  PrivacyRights,
  PrivacyCCPA,
  PrivacyGDPR,
  PrivacyChildren,
  PrivacyContact,
} from './privacy-sections-2.jsx';

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="March 2026">
      <PrivacyInfo />
      <PrivacyUse />
      <PrivacyCookies />
      <PrivacyThirdParty />
      <PrivacyRetention />
      <PrivacyRights />
      <PrivacyCCPA />
      <PrivacyGDPR />
      <PrivacyChildren />
      <PrivacyContact />
    </LegalLayout>
  );
}
