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
        {/* Hero Section with Samples */}
        <HeroSection />
        {/* Main Processing Studio */}
        <div id="demo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Image Studio</h2>
            <p className="text-muted-foreground text-lg">Drop your image here to start the AI transformation.</p>
          </div>
          <ImageProcessingDemo />
        </div>
        {/* Features & Education */}
        <div id="features" className="bg-secondary/30">
          <FeaturesSection />
        </div>
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        {/* Quick CTA before footer */}
        <section className="max-w-4xl mx-auto px-4 py-24 text-center">
          <div className="bg-cf-cyan-500 rounded-3xl p-8 md:p-16 text-white shadow-glow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to clean your images?</h2>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                No credit cards, no subscriptions. Just pure AI power delivered straight to your browser.
              </p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-cf-cyan-500 px-10 py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform"
              >
                Back to Top
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster richColors closeButton position="bottom-right" />
    </div>
  );
}