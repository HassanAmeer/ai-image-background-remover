import React from 'react';
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
  const originalImage = useImageStore(s => s.originalImage);
  const processedImage = useImageStore(s => s.processedImage);
  const isProcessing = useImageStore(s => s.isProcessing);
  const progress = useImageStore(s => s.progress);
  const status = useImageStore(s => s.status);
  const setOriginalImage = useImageStore(s => s.setOriginalImage);
  const setProcessedImage = useImageStore(s => s.setProcessedImage);
  const setIsProcessing = useImageStore(s => s.setIsProcessing);
  const setProgress = useImageStore(s => s.setProgress);
  const setStatus = useImageStore(s => s.setStatus);
  const reset = useImageStore(s => s.reset);
  const processImage = async (source: string | File) => {
    setIsProcessing(true);
    setProgress(0);
    setStatus('Initializing AI...');
    try {
      const resultUrl = await removeBackgroundFromImage(source, (p) => {
        setProgress(p.progress);
        setStatus(p.status.charAt(0).toUpperCase() + p.status.slice(1) + '...');
      });
      setProcessedImage(resultUrl);
      toast.success("Background removed perfectly!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Processing failed");
      reset();
    } finally {
      setIsProcessing(false);
    }
  };
  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      processImage(file);
    };
    reader.readAsDataURL(file);
  };
  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'chromacleanse-result.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                <h3 className="text-2xl font-bold mb-2">The Studio</h3>
                <p className="text-muted-foreground">Upload your photo to experience professional AI background removal.</p>
              </div>
              <Dropzone onUpload={handleUpload} disabled={isProcessing} />
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
                  <div className="w-10 h-10 rounded-full bg-cf-cyan-500 text-white flex items-center justify-center shadow-glow">
                    {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold">{isProcessing ? "AI is working..." : "Magic Complete"}</h4>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{status || (isProcessing ? "Processing" : "Ready")}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={reset} className="rounded-full hover:bg-destructive/10 hover:text-destructive">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              {isProcessing && (
                <div className="space-y-3">
                  <Progress value={progress} className="h-2 bg-muted overflow-hidden" />
                  <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <span>Analyzing Edges</span>
                    <span>{progress}%</span>
                  </div>
                </div>
              )}
              <div className="relative">
                {isProcessing ? (
                  <div className="aspect-square md:aspect-video rounded-2xl bg-muted border border-dashed border-border flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-4 border-cf-cyan-500/20 border-t-cf-cyan-500 animate-spin" />
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-cf-cyan-500 animate-pulse" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Our AI is fetching models & processing...</span>
                  </div>
                ) : (
                  processedImage && originalImage && (
                    <ImageComparisonSlider 
                      original={originalImage} 
                      processed={processedImage} 
                    />
                  )
                )}
              </div>
              {!isProcessing && processedImage && (
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <Button 
                    size="lg" 
                    onClick={handleDownload}
                    className="bg-cf-cyan-500 hover:bg-cf-cyan-500/90 text-white rounded-xl px-10 h-14 shadow-glow flex-1 sm:flex-none text-lg font-bold"
                  >
                    <Download className="mr-2 w-5 h-5" />
                    Download PNG
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={reset} 
                    className="rounded-xl px-10 h-14 flex-1 sm:flex-none border-border hover:bg-accent"
                  >
                    <RefreshCw className="mr-2 w-5 h-5" />
                    Start Over
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