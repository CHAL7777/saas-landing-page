import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import LogoMarquee from '@/components/LogoMarquee'
import DashboardPreview from '@/components/DashboardPreview'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Hero Section */}
      <Hero />
      
      {/* Social Proof / Logo Marquee */}
      <LogoMarquee />
      
      {/* Features Showcase */}
      <Features />
      
      {/* How It Works Methodology */}
      <HowItWorks />
      
      {/* Dashboard Preview */}
      <DashboardPreview />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Pricing */}
      <Pricing />
      
      {/* Final Call to Action */}
      <CTA />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
