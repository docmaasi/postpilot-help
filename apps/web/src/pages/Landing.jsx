import { LandingNav } from '../components/landing/LandingNav.jsx';
import { HeroSection } from '../components/landing/HeroSection.jsx';
import { SocialMediaStats } from '../components/landing/SocialMediaStats.jsx';
import { PlatformShowcase } from '../components/landing/PlatformShowcase.jsx';
import { HowItWorks } from '../components/landing/HowItWorks.jsx';
import { FeaturesGrid } from '../components/landing/FeaturesGrid.jsx';
import { Testimonials } from '../components/landing/Testimonials.jsx';
import { BlogPreview } from '../components/landing/BlogPreview.jsx';
import { PricingPreview } from '../components/landing/PricingPreview.jsx';
import { CTASection } from '../components/landing/CTASection.jsx';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <LandingNav />
      <HeroSection />
      <SocialMediaStats />
      <PlatformShowcase />
      <HowItWorks />
      <FeaturesGrid />
      <Testimonials />
      <BlogPreview />
      <PricingPreview />
      <CTASection />

      <footer className="py-8 text-center text-xs text-muted-foreground border-t border-border">
        &copy; {new Date().getFullYear()} PostPilot. All rights reserved.
      </footer>
    </div>
  );
}
