import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { PropertySection } from '@/components/PropertySection';
import { ServicesSection } from '@/components/ServicesSection';
import { AboutSection } from '@/components/AboutSection';
import { DownloadCTA } from '@/components/DownloadCTA';
import { Footer } from '@/components/Footer';
import { DownloadModal } from '@/components/DownloadModal';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Subhalaxmi Property & Construction | Buy, Sell & Construction in Nepal</title>
        <meta name="description" content="Find your dream property in Nepal. Buy, sell, and connect with top construction services all in one app. Download the SL Property APK today." />
        <meta property="og:title" content="Subhalaxmi Property & Construction" />
        <meta property="og:description" content="Find your dream property in Nepal. Buy, sell, and connect with top construction services." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          <PropertySection />
          <ServicesSection />
          <DownloadCTA />
          <AboutSection />
        </main>
        
        <Footer />
        <DownloadModal />
      </div>
    </>
  );
}
