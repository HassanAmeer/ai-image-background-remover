import React from 'react';
import { Parallax } from 'react-parallax';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20">
      <Parallax
        bgImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
        strength={200}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-hero-cyan opacity-90 dark:opacity-95" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-48 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cf-cyan-500/10 text-cf-cyan-500 text-sm font-semibold mb-6 border border-cf-cyan-500/20"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Free & AI-Powered</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display mb-6 tracking-tight"
            >
              Transform Your Images. <span className="text-cf-cyan-500">Instantly.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-body mb-10 max-w-2xl mx-auto"
            >
              Remove backgrounds with surgical precision using our advanced AI. 
              Clean, professional results in seconds, right in your browser.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Button size="lg" className="bg-cf-cyan-500 hover:bg-cf-cyan-500/90 text-white h-14 px-8 text-lg rounded-xl shadow-glow group" asChild>
                <a href="#demo">
                  Upload Image
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-cf-cyan-500/20 bg-background/50 hover:bg-cf-cyan-500/5" asChild>
                <a href="#how-it-works">How it works</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </Parallax>
    </section>
  );
}