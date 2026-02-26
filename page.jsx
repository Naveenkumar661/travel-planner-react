"use client";

import { useState } from "react";
import { WelcomePopup } from "@/components/welcome-popup";
import { LoginPopup } from "@/components/login-popup";
import { Navbar } from "@/components/navbar";
import { BookingForm, SearchResults } from "@/components/booking-form";
import { HotelsSection } from "@/components/hotels-section";
import { DiscountsSection } from "@/components/discounts-section";
import { ServicesReview } from "@/components/services-review";
import { MapPin, Phone, Mail, Plane } from "lucide-react";

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    setShowLogin(true);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  const handleSearch = (result) => {
    setSearchResult(result);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Popup */}
      {showWelcome && <WelcomePopup onClose={handleWelcomeClose} />}

      {/* Login Popup */}
      <LoginPopup isOpen={showLogin} onClose={handleLoginClose} />

      {/* Navbar */}
      <Navbar onLoginClick={() => setShowLogin(true)} />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Explore the World with{" "}
              <span className="text-primary">REMO Travels</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Book flights, trains, buses, and ships to your dream destinations.
              Find the perfect hotels and enjoy exclusive discounts on your journey.
            </p>
          </div>

          {/* Booking Form */}
          <BookingForm onSearch={handleSearch} />

          {/* Search Results */}
          <SearchResults result={searchResult} />
        </div>
      </section>

      {/* Hotels Section */}
      <section className="px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <HotelsSection />
        </div>
      </section>

      {/* Discounts Section */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <DiscountsSection />
        </div>
      </section>

      {/* Services & Reviews Section */}
      <section className="px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <ServicesReview />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Plane className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">
                  <span className="text-primary">REMO</span> Travels
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your trusted travel partner for flights, trains, buses, ships, and
                hotels worldwide. Making travel accessible and affordable for everyone.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["About Us", "Services", "Destinations", "Blog", "Careers"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary text-sm transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-foreground font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {[
                  "Flight Booking",
                  "Train Tickets",
                  "Bus Reservations",
                  "Cruise & Ferry",
                  "Hotel Booking",
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-foreground font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  123 Travel Street, Mumbai, India
                </li>
                <li className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  +91 1234 567 890
                </li>
                <li className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  support@remotravels.com
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              2026 REMO Travels. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
