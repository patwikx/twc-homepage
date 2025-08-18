import AccommodationsShowcase from "@/components/homepage/accomodation";
import ActivitiesSection from "@/components/homepage/activities";
import ContactSection from "@/components/homepage/contact";
import DiningSection from "@/components/homepage/dining";
import EventsSection from "@/components/homepage/events-section";
import Footer from "@/components/homepage/footer";
import HeroSection from "@/components/homepage/hero";
import Navigation from "@/components/homepage/navigation";
import ResortOverview from "@/components/homepage/resort-overview";


export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ResortOverview />
      <AccommodationsShowcase />
      <DiningSection />
      {/*
      <ActivitiesSection />
      */}
      <EventsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
