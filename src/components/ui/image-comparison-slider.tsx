import React, { useState, useRef } from 'react';
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
  const smoothSliderPos = useSpring(sliderPos, { damping: 25, stiffness: 120 });
  const clipPath = useTransform(smoothSliderPos, (pos) => `inset(0 ${100 - pos}% 0 0)`);
  const leftPos = useTransform(smoothSliderPos, (pos) => `${pos}%`);
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
      className={cn("relative w-full aspect-square md:aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none border border-border group", className)}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* Background (Processed) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] bg-repeat bg-center">
        <img
          src={processed}
          alt="Processed"
          className="w-full h-full object-contain pointer-events-none"
        />
        <div className="absolute bottom-4 right-4 bg-cf-cyan-500 text-white text-[10px] font-black px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
          Processed
        </div>
      </div>
      {/* Foreground (Original) */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ clipPath }}
      >
        <div className="absolute inset-0 bg-background/20" />
        <img
          src={original}
          alt="Original"
          className="w-full h-full object-contain pointer-events-none"
        />
        <div className="absolute bottom-4 left-4 bg-background/90 text-foreground text-[10px] font-black px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter shadow-sm border border-border/50">
          Original
        </div>
      </motion.div>
      {/* Slider Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-0.5 bg-white z-20 cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.2)]"
        style={{ left: leftPos }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cf-cyan-500 border-2 border-white shadow-glow flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-1 h-4 bg-white/40 rounded-full" />
            <div className="w-1 h-4 bg-white/40 rounded-full" />
          </div>
        </div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-[8px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Slide to compare
        </div>
      </motion.div>
    </div>
  );
}