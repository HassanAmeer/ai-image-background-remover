import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
interface ImageComparisonSliderProps {
  original: string;
  processed: string;
  className?: string;
}
export function ImageComparisonSlider({ original, processed, className }: ImageComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderPos = useMotionValue(50);
  const smoothSliderPos = useSpring(sliderPos, { damping: 30, stiffness: 150 });
  const clipPath = useTransform(smoothSliderPos, (pos) => `inset(0 ${100 - pos}% 0 0)`);
  const handleLeft = useTransform(smoothSliderPos, (pos) => `${pos}%`);
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    sliderPos.set(percent);
  };
  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-square md:aspect-video rounded-3xl overflow-hidden cursor-ew-resize select-none border border-border group bg-background",
        className
      )}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* Background Layer: CSS Checkerboard Pattern for high performance */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            conic-gradient(#e5e7eb 90deg, #f9fafb 90deg 180deg, #e5e7eb 180deg 270deg, #f9fafb 270deg)
          `,
          backgroundSize: '24px 24px',
        }}
      >
        <img
          src={processed}
          alt="Processed Result"
          className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
        />
        <div className="absolute bottom-6 right-6 bg-cf-cyan-500/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 uppercase tracking-widest shadow-lg">
          Processed
        </div>
      </div>
      {/* Foreground Layer: Original Image with Clip Path */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ clipPath }}
      >
        <div className="absolute inset-0 bg-black/5" />
        <img
          src={original}
          alt="Original Image"
          className="w-full h-full object-contain pointer-events-none"
        />
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md text-foreground text-[10px] font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 uppercase tracking-widest shadow-lg border border-border/50">
          Original
        </div>
      </motion.div>
      {/* Interactive Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-white z-20 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
        style={{ left: handleLeft }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-cf-cyan-500 border-4 border-white shadow-glow flex items-center justify-center transition-transform hover:scale-110 active:scale-90">
          <div className="flex gap-1.5">
            <div className="w-1 h-5 bg-white/50 rounded-full" />
            <div className="w-1 h-5 bg-white/50 rounded-full" />
          </div>
        </div>
        <div className="absolute top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/20 backdrop-blur-xl border border-white/20 rounded-full text-[9px] text-white font-bold opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap uppercase tracking-tighter">
          Drag to Compare
        </div>
      </motion.div>
    </div>
  );
}