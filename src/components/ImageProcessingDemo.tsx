import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dropzone } from '@/components/ui/dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, RefreshCw, X, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
export function ImageProcessingDemo() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      startProcessing();
    };
    reader.readAsDataURL(file);
  };
  const startProcessing = () => {
    setIsProcessing(true);
    setProgress(0);
    setProcessedImage(null);
    // Mock progress interval
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    // Mock processing delay
    setTimeout(() => {
      // Using a known high-quality transparent placeholder for demo
      setProcessedImage("https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&bg=transparent");
      setIsProcessing(false);
      setProgress(100);
      toast.success("Background removed successfully!");
    }, 2500);
  };
  const handleClear = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setIsProcessing(false);
    setProgress(0);
  };
  return (
    <div className="w-full">
      <div className="bg-card border border-border shadow-soft rounded-3xl overflow-hidden">
        <AnimatePresence mode="wait">
          {!originalImage ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Try it now</h3>
                <p className="text-muted-foreground">Upload any image to see the magic happen instantly.</p>
              </div>
              <Dropzone onUpload={handleUpload} />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 md:p-8 space-y-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cf-cyan-500 text-white flex items-center justify-center">
                    {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold">{isProcessing ? "Processing..." : "Processing Complete"}</h4>
                    <p className="text-xs text-muted-foreground">{isProcessing ? "Our AI is analyzing edges..." : "Ready for download"}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleClear} className="rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              {isProcessing && (
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-center text-muted-foreground font-medium">{progress}% Complete</p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Original</span>
                  <div className="aspect-video md:aspect-square rounded-2xl overflow-hidden bg-muted border border-border relative">
                    <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Processed</span>
                  <div className="aspect-video md:aspect-square rounded-2xl overflow-hidden bg-muted border border-border relative flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] bg-repeat">
                    {isProcessing ? (
                      <div className="animate-pulse flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full border-4 border-cf-cyan-500/20 border-t-cf-cyan-500 animate-spin" />
                        <span className="text-sm text-muted-foreground font-medium">Removing Background...</span>
                      </div>
                    ) : (
                      <motion.img 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={processedImage!} 
                        alt="Processed" 
                        className="w-full h-full object-contain" 
                      />
                    )}
                  </div>
                </div>
              </div>
              {!isProcessing && (
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <Button size="lg" className="bg-cf-cyan-500 hover:bg-cf-cyan-500/90 text-white rounded-xl px-8 h-12 shadow-glow flex-1 sm:flex-none">
                    <Download className="mr-2 w-5 h-5" />
                    Download PNG
                  </Button>
                  <Button size="lg" variant="outline" onClick={handleClear} className="rounded-xl px-8 h-12 flex-1 sm:flex-none">
                    <RefreshCw className="mr-2 w-5 h-5" />
                    Upload Another
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}