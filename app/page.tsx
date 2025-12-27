import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import ContactForm from "@/components/ContactForm";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#020617] selection:bg-emerald-500/30 selection:text-emerald-100">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <LogoMarquee />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <ContactForm />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}