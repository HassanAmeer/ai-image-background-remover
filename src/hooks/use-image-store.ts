import { create } from 'zustand';
interface ImageState {
  originalImage: string | null;
  processedImage: string | null;
  isProcessing: boolean;
  progress: number;
  status: string;
  fileType: 'static' | 'gif';
  currentFrame: number;
  totalFrames: number;
  setOriginalImage: (url: string | null) => void;
  setProcessedImage: (url: string | null) => void;
  setIsProcessing: (loading: boolean) => void;
  setProgress: (val: number) => void;
  setStatus: (msg: string) => void;
  setFileType: (type: 'static' | 'gif') => void;
  setFrameInfo: (current: number, total: number) => void;
  reset: () => void;
}
export const useImageStore = create<ImageState>((set) => ({
  originalImage: null,
  processedImage: null,
  isProcessing: false,
  progress: 0,
  status: '',
  fileType: 'static',
  currentFrame: 0,
  totalFrames: 0,
  setOriginalImage: (url) => set({ originalImage: url }),
  setProcessedImage: (url) => set({ processedImage: url }),
  setIsProcessing: (loading) => set({ isProcessing: loading }),
  setProgress: (val) => set({ progress: val }),
  setStatus: (msg) => set({ status: msg }),
  setFileType: (type) => set({ fileType: type }),
  setFrameInfo: (current, total) => set({ currentFrame: current, totalFrames: total }),
  reset: () => set({
    originalImage: null,
    processedImage: null,
    isProcessing: false,
    progress: 0,
    status: '',
    fileType: 'static',
    currentFrame: 0,
    totalFrames: 0,
  }),
}));