import removeBackground, { Config } from '@imgly/background-removal';
import { processGif } from './gif-logic';
export interface ProcessingProgress {
  status: string;
  progress: number;
  currentFrame?: number;
  totalFrames?: number;
}
/**
 * Orchestrates background removal for both static images and GIFs using real browser-side AI.
 */
export async function removeBackgroundFromImage(
  imageSource: string | File | Blob,
  onProgress?: (progress: ProcessingProgress) => void
): Promise<string> {
  const isGif = typeof imageSource !== 'string' && (imageSource as File).type === 'image/gif';
  if (isGif) {
    return processGif(imageSource as File, onProgress);
  }
  return processStaticImage(imageSource, onProgress);
}
async function processStaticImage(
  source: string | File | Blob,
  onProgress?: (progress: ProcessingProgress) => void
): Promise<string> {
  const config: Config = {
    progress: (status, progress) => {
      if (onProgress) {
        onProgress({
          status: status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' '),
          progress: Math.round(progress * 100)
        });
      }
    },
    output: {
      format: 'image/png',
      quality: 0.9,
      type: 'foreground'
    },
    // Using fetch strategy for better worker compatibility in browser environments
    model: 'medium'
  };
  try {
    const resultBlob = await removeBackground(source, config);
    return URL.createObjectURL(resultBlob);
  } catch (error) {
    console.error('AI background removal failed:', error);
    throw new Error('Failed to process image background');
  }
}