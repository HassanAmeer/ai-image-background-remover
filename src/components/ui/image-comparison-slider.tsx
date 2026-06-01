import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
interface ImageComparisonSliderProps {
  original: string;
  processed: string;
  className?: string;
}
export function ImageComparisonSlider({ original, processed, className }: ImageComparisonSliderProps) {
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // Slider position (0 to 100)
  const sliderPos = useMotionValue(50);
  const smoothSliderPos = useSpring(sliderPos, { damping: 20, stiffness: 100 });
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
      onMouseDown={() => setIsResizing(true)}
      onMouseUp={() => setIsResizing(false)}
      onMouseLeave={() => setIsResizing(false)}
    >
      {/* Background (Processed) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] bg-repeat">
        <img 
          src={processed} 
          alt="Processed" 
          className="w-full h-full object-contain pointer-events-none"
        />
        <div className="absolute bottom-4 right-4 bg-cf-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
          AFTER
        </div>
      </div>
      {/* Foreground (Original) */}
      <motion.div 
        className="absolute inset-0 z-10"
        style={{ clipPath }}
      >
        <img 
          src={original} 
          alt="Original" 
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute bottom-4 left-4 bg-background/80 text-foreground text-xs font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
          BEFORE
        </div>
      </motion.div>
      {/* Slider Handle */}
      <motion.div 
        className="absolute top-0 bottom-0 w-1 bg-white z-20 cursor-ew-resize"
        style={{ left: leftPos }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cf-cyan-500 border-4 border-white shadow-lg flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-white/80 rounded-full" />
            <div className="w-0.5 h-3 bg-white/80 rounded-full" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}