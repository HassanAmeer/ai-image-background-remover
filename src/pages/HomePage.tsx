import React from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { ImageProcessingDemo } from '@/components/ImageProcessingDemo';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-cf-cyan-500/30 selection:text-cf-cyan-500">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div id="demo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <ImageProcessingDemo />
        </div>
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
      </main>
      <Footer />
      <Toaster richColors closeButton position="top-right" />
    </div>
  );
}