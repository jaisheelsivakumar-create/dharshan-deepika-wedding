import FallingFlowers from "@/components/FallingFlowers";
import MusicPlayer from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";
import PhotoGallery from "@/components/PhotoGallery";
import EventDetails from "@/components/EventDetails";
import LocationSection from "@/components/LocationSection";
import BlessingsSection from "@/components/BlessingsSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0c090e] text-[#f7ede2] selection:bg-amber-500/30 selection:text-amber-100 overflow-x-hidden">
      {/* Global Background Layer: Softly falling flowers / petals */}
      <FallingFlowers />

      {/* Floating Audio Controller */}
      <MusicPlayer />

      {/* Main Content Sections */}
      <div className="relative z-10 flex flex-col">
        {/* Hero Section with 3D Parallax Scrolling */}
        <HeroSection />

        {/* Story & Photo Gallery with 3D Depth Entry */}
        <PhotoGallery />

        {/* Event Celebrations with 3D Parallax Tilt Cards */}
        <EventDetails />

        {/* Location & Navigation Section (Google Map & QR Code) */}
        <LocationSection />

        {/* Guest Blessings & Wishes */}
        <BlessingsSection />

        {/* Elegant Footer */}
        <FooterSection />
      </div>
    </main>
  );
}
