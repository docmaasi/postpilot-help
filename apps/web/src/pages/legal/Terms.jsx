import { LegalLayout } from './LegalLayout.jsx';
import {
  TermsAcceptance,
  TermsAccount,
  TermsContent,
  TermsIP,
  TermsPayment,
  TermsTermination,
} from './terms-sections.jsx';
import {
  TermsDisclaimers,
  TermsLiability,
  TermsGoverning,
  TermsContact,
} from './terms-sections-2.jsx';

export default function Terms() {
  return (
    <LegalLayout title="Terms of Service" updated="March 2026">
      <TermsAcceptance />
      <TermsAccount />
      <TermsContent />
      <TermsIP />
      <TermsPayment />
      <TermsTermination />
      <TermsDisclaimers />
      <TermsLiability />
      <TermsGoverning />
      <TermsContact />
    </LegalLayout>
  );
}
