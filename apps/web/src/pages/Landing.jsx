import { HeroSection } from '../components/landing/HeroSection.jsx';
import { PlatformStrip } from '../components/landing/PlatformStrip.jsx';
import { HowItWorks } from '../components/landing/HowItWorks.jsx';
import { FeaturesGrid } from '../components/landing/FeaturesGrid.jsx';
import { PricingPreview } from '../components/landing/PricingPreview.jsx';
import { StatsSection } from '../components/landing/StatsSection.jsx';
import { CTASection } from '../components/landing/CTASection.jsx';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <PlatformStrip />
      <HowItWorks />
      <FeaturesGrid />
      <PricingPreview />
      <StatsSection />
      <CTASection />

      {/* Minimal footer */}
      <footer className="py-8 text-center text-xs text-muted-foreground border-t border-border">
        &copy; {new Date().getFullYear()} PostPilot. All rights reserved.
      </footer>
    </div>
  );
}
