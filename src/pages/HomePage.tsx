import React, { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { ImageProcessingDemo } from '@/components/ImageProcessingDemo';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import { useImageStore } from '@/hooks/use-image-store';
export function HomePage() {
  const reset = useImageStore(s => s.reset);
  // Reset store on initial mount to ensure clean state
  useEffect(() => {
    reset();
  }, [reset]);
  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-cf-cyan-500/30 selection:text-cf-cyan-500 font-sans">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div id="demo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">The Cleanse Studio</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Experience industry-leading background removal powered by neural networks running locally in your browser.
            </p>
          </div>
          <ImageProcessingDemo />
        </div>
        <div id="features" className="bg-secondary/30 border-y border-border/50">
          <FeaturesSection />
        </div>
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="bg-cf-cyan-500 rounded-[3rem] p-8 md:p-20 text-white shadow-glow-lg overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]" />
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready for a pixel-perfect workflow?</h2>
              <p className="text-white/80 text-xl mb-12 leading-relaxed">
                Join thousands of creators who use ChromaCleanse for lightning-fast, privacy-first background removal every day.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-cf-cyan-500 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-2xl"
              >
                Get Started for Free
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