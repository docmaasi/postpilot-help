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
import { LandingNav } from '../../components/landing/LandingNav.jsx';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <div className="pt-24">
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
      </div>
    </div>
  );
}
