import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dropzone } from '@/components/ui/dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, RefreshCw, X, CheckCircle2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useImageStore } from '@/hooks/use-image-store';
import { removeBackgroundFromImage } from '@/lib/image-processing';
import { ImageComparisonSlider } from '@/components/ui/image-comparison-slider';
export function ImageProcessingDemo() {
  const processingIdRef = useRef<number>(0);
  const originalImage = useImageStore(s => s.originalImage);
  const processedImage = useImageStore(s => s.processedImage);
  const isProcessing = useImageStore(s => s.isProcessing);
  const progress = useImageStore(s => s.progress);
  const status = useImageStore(s => s.status);
  const fileType = useImageStore(s => s.fileType);
  const currentFrame = useImageStore(s => s.currentFrame);
  const totalFrames = useImageStore(s => s.totalFrames);
  const setOriginalImage = useImageStore(s => s.setOriginalImage);
  const setProcessedImage = useImageStore(s => s.setProcessedImage);
  const setIsProcessing = useImageStore(s => s.setIsProcessing);
  const setProgress = useImageStore(s => s.setProgress);
  const setStatus = useImageStore(s => s.setStatus);
  const setFileType = useImageStore(s => s.setFileType);
  const setFrameInfo = useImageStore(s => s.setFrameInfo);
  const reset = useImageStore(s => s.reset);
  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (processedImage && processedImage.startsWith('blob:')) {
        URL.revokeObjectURL(processedImage);
      }
    };
  }, [processedImage]);
  const processImage = async (file: File) => {
    const currentId = ++processingIdRef.current;
    setIsProcessing(true);
    setProgress(0);
    const isGif = file.type === 'image/gif';
    setFileType(isGif ? 'gif' : 'static');
    try {
      const resultUrl = await removeBackgroundFromImage(file, (p) => {
        // If a new process started, abort this progress update
        if (currentId !== processingIdRef.current) return;
        setProgress(p.progress);
        setStatus(p.status);
        if (p.currentFrame && p.totalFrames) {
          setFrameInfo(p.currentFrame, p.totalFrames);
        }
      });
      // If a new process started, do not update the store with old results
      if (currentId !== processingIdRef.current) {
        URL.revokeObjectURL(resultUrl);
        return;
      }
      setProcessedImage(resultUrl);
      toast.success(isGif ? "GIF processed successfully!" : "Background removed perfectly!");
    } catch (error) {
      if (currentId === processingIdRef.current) {
        toast.error("Processing failed. Please try a different image.");
        reset();
      }
    } finally {
      if (currentId === processingIdRef.current) {
        setIsProcessing(false);
      }
    }
  };
  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      processImage(file);
    };
    reader.readAsError = () => toast.error("Failed to read file.");
    reader.readAsDataURL(file);
  };
  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `chromacleanse-${Date.now()}.${fileType === 'gif' ? 'gif' : 'png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleReset = () => {
    processingIdRef.current++; // Invalidate any pending async work
    reset();
  };
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-card border border-border shadow-soft rounded-3xl overflow-hidden transition-all duration-500">
        <AnimatePresence mode="wait">
          {!originalImage ? (
            <motion.div 
              key="upload" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              className="p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-foreground">The Studio</h3>
                <p className="text-muted-foreground">Upload your photo or GIF to experience AI magic.</p>
              </div>
              <Dropzone onUpload={handleUpload} disabled={isProcessing} />
            </motion.div>
          ) : (
            <motion.div 
              key="results" 
              initial={{ opacity: 0, scale: 1.05 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="p-4 md:p-8 space-y-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cf-cyan-500 text-white flex items-center justify-center shadow-glow overflow-hidden">
                    {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{isProcessing ? "AI Engine Running" : "Clean Cutout Ready"}</h4>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{status || "Ready"}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleReset} className="rounded-full hover:bg-destructive/10 hover:text-destructive">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              {isProcessing && (
                <div className="space-y-3">
                  <Progress value={progress} className="h-2 bg-muted overflow-hidden" />
                  <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <span>{fileType === 'gif' && totalFrames > 0 ? `Layer ${currentFrame} of ${totalFrames}` : "Smart Segmentation"}</span>
                    <span>{progress}%</span>
                  </div>
                </div>
              )}
              <div className="relative group/studio">
                {isProcessing ? (
                  <div className="aspect-square md:aspect-video rounded-2xl bg-muted/50 border border-dashed border-border flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full border-4 border-cf-cyan-500/10 border-t-cf-cyan-500 animate-spin" />
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-cf-cyan-500 animate-pulse" />
                    </div>
                    <div className="text-center px-4">
                      <p className="text-sm font-semibold text-foreground">Processing high-fidelity details...</p>
                      <p className="text-xs text-muted-foreground mt-1">Our AI is mapping edges for a perfect transparent result.</p>
                    </div>
                  </div>
                ) : (
                  processedImage && originalImage && (
                    <ImageComparisonSlider original={originalImage} processed={processedImage} />
                  )
                )}
              </div>
              {!isProcessing && processedImage && (
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <Button 
                    size="lg" 
                    onClick={handleDownload} 
                    className="bg-cf-cyan-500 hover:bg-cf-cyan-500/90 text-white rounded-xl px-12 h-16 shadow-glow flex-1 sm:flex-none text-lg font-bold"
                  >
                    <Download className="mr-2 w-5 h-5" />
                    Download {fileType === 'gif' ? 'GIF' : 'PNG'}
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={handleReset} 
                    className="rounded-xl px-12 h-16 flex-1 sm:flex-none border-border hover:bg-accent text-lg font-bold"
                  >
                    <RefreshCw className="mr-2 w-5 h-5" />
                    Reset
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