import { removeBackground, Config } from '@imgly/background-removal';
export interface ProcessingProgress {
  status: string;
  progress: number;
}
/**
 * Removes the background from an image using @imgly/background-removal.
 * This runs entirely in the browser using WASM.
 */
export async function removeBackgroundFromImage(
  imageSource: string | File | Blob,
  onProgress?: (progress: ProcessingProgress) => void
): Promise<string> {
  const config: Config = {
    output: {
      format: 'image/png',
      quality: 0.8,
      type: 'foreground',
    },
    debug: false,
    model: 'medium', // Balance between speed and accuracy
    onProgress: (status: string, progress: number) => {
      if (onProgress) {
        // status can be 'fetch', 'decode', 'compute'
        onProgress({ status, progress: Math.round(progress * 100) });
      }
    },
  };
  try {
    const blob = await removeBackground(imageSource, config);
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Background removal failed:', error);
    throw new Error('Failed to process image. Please try again with a different photo.');
  }
}