import Architecture from "@/components/aiguablava/Architecture";
import CoastaBravaStory from "@/components/aiguablava/CoastaBravaStory";
import ContactForm from "@/components/aiguablava/ContactForm";
import Gallery from "@/components/aiguablava/Gallery";
import Hero from "@/components/aiguablava/Hero";
import Introduction from "@/components/aiguablava/Introduction";
import LivingExperience from "@/components/aiguablava/LivingExperience";
import Location from "@/components/aiguablava/Location";
import Navigation from "@/components/aiguablava/Navigation";
import PrivateViewingCTA from "@/components/aiguablava/PrivateViewingCTA";
import PropertyStats from "@/components/aiguablava/PropertyStats";
import SiteFooter from "@/components/aiguablava/SiteFooter";

export default function AiguablavaPage() {
  return (
    <main
      id="main-content"
      style={{ backgroundColor: "#F4F1EA", color: "#171717" }}
    >
      {/* Skip to main content — accessibility */}
      <a
        href="#residence"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:text-sm"
        style={{ backgroundColor: "#171717", color: "#F4F1EA", fontFamily: "var(--font-dm)" }}
      >
        Skip to content
      </a>

      {/* Navigation — fixed/floating */}
      <Navigation />

      {/* Hero — full viewport */}
      <Hero />

      {/* Introduction — The Residence */}
      <Introduction />

      {/* Property Stats — dark background */}
      <PropertyStats />

      {/* Architecture */}
      <Architecture />

      {/* Living Experience — dark background */}
      <LivingExperience />

      {/* Gallery */}
      <Gallery />

      {/* Location */}
      <Location />

      {/* Costa Brava Story — dark background */}
      <CoastaBravaStory />

      {/* Private Viewing CTA — full image */}
      <PrivateViewingCTA />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer — dark */}
      <SiteFooter />
    </main>
  );
}
