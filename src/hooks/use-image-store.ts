import { create } from 'zustand';
interface ImageState {
  originalImage: string | null;
  processedImage: string | null;
  isProcessing: boolean;
  progress: number;
  status: string;
  setOriginalImage: (url: string | null) => void;
  setProcessedImage: (url: string | null) => void;
  setIsProcessing: (loading: boolean) => void;
  setProgress: (val: number) => void;
  setStatus: (msg: string) => void;
  reset: () => void;
}
export const useImageStore = create<ImageState>((set) => ({
  originalImage: null,
  processedImage: null,
  isProcessing: false,
  progress: 0,
  status: '',
  setOriginalImage: (url) => set({ originalImage: url }),
  setProcessedImage: (url) => set({ processedImage: url }),
  setIsProcessing: (loading) => set({ isProcessing: loading }),
  setProgress: (val) => set({ progress: val }),
  setStatus: (msg) => set({ status: msg }),
  reset: () => set({
    originalImage: null,
    processedImage: null,
    isProcessing: false,
    progress: 0,
    status: ''
  }),
}));