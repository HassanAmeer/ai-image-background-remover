import React from 'react';
import { Parallax } from 'react-parallax';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useImageStore } from '@/hooks/use-image-store';
import { removeBackgroundFromImage } from '@/lib/image-processing';
import { toast } from 'sonner';
const SAMPLES = [
  { 
    id: 'sample-1', 
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    label: 'Portrait' 
  },
  { 
    id: 'sample-2', 
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop',
    label: 'Product' 
  },
  { 
    id: 'sample-3', 
    url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=400&auto=format&fit=crop',
    label: 'Automobile' 
  },
];
export function HeroSection() {
  const setOriginalImage = useImageStore(s => s.setOriginalImage);
  const setProcessedImage = useImageStore(s => s.setProcessedImage);
  const setIsProcessing = useImageStore(s => s.setIsProcessing);
  const setProgress = useImageStore(s => s.setProgress);
  const setStatus = useImageStore(s => s.setStatus);
  const reset = useImageStore(s => s.reset);
  const handleSampleClick = async (sampleUrl: string) => {
    reset();
    setOriginalImage(sampleUrl);
    // Smooth scroll to demo
    const demoElement = document.getElementById('demo');
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsProcessing(true);
    setStatus('Loading sample...');
    try {
      const resultUrl = await removeBackgroundFromImage(sampleUrl, (p) => {
        setProgress(p.progress);
        setStatus(p.status.charAt(0).toUpperCase() + p.status.slice(1) + '...');
      });
      setProcessedImage(resultUrl);
      toast.success("Sample processed successfully!");
    } catch (error) {
      toast.error("Failed to process sample image.");
      reset();
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <section className="relative overflow-hidden pt-20">
      <Parallax
        bgImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
        strength={200}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-hero-cyan opacity-90 dark:opacity-95" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-40 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cf-cyan-500/10 text-cf-cyan-500 text-sm font-bold mb-6 border border-cf-cyan-500/20 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Real-Time Browser AI</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-none"
            >
              Clean Backgrounds. <br />
              <span className="text-cf-cyan-500 drop-shadow-sm">No Compromise.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              The first truly free, high-performance background remover that runs 
              entirely in your browser. No sign-ups, no credits, just magic.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-16"
            >
              <Button size="lg" className="bg-cf-cyan-500 hover:bg-cf-cyan-500/90 text-white h-16 px-10 text-xl font-bold rounded-2xl shadow-glow group" asChild>
                <a href="#demo">
                  Upload Now
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="ghost" className="h-16 px-8 text-lg font-medium rounded-2xl hover:bg-cf-cyan-500/5" asChild>
                <a href="#how-it-works">See how it works</a>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full max-w-lg"
            >
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Try with a sample</p>
              <div className="flex justify-center gap-4">
                {SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSampleClick(sample.url)}
                    className="relative group w-20 h-20 rounded-xl overflow-hidden border-2 border-transparent hover:border-cf-cyan-500 transition-all duration-300 shadow-soft active:scale-95"
                  >
                    <img src={sample.url} alt={sample.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Parallax>
    </section>
  );
}