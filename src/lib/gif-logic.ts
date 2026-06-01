import removeBackground from '@imgly/background-removal';
// @ts-ignore - gif-frames and gif.js often lack perfect types
import gifFrames from 'gif-frames';
// @ts-ignore
import GIF from 'gif.js.optimized';
export async function processGif(
  file: File,
  onProgress?: (p: { status: string; progress: number; currentFrame?: number; totalFrames?: number }) => void
): Promise<string> {
  if (onProgress) onProgress({ status: 'Deconstructing GIF...', progress: 5 });
  const frames = await gifFrames({
    url: file,
    frames: 'all',
    outputType: 'canvas',
    cumulative: true
  });
  const totalFrames = frames.length;
  const gifEncoder = new GIF({
    workers: 2,
    quality: 10,
    width: frames[0].getImage().width,
    height: frames[0].getImage().height,
    transparent: 'rgba(0,0,0,0)',
    workerScript: 'https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js'
  });
  for (let i = 0; i < totalFrames; i++) {
    const frame = frames[i];
    const canvas = frame.getImage();
    if (onProgress) {
      onProgress({
        status: `Processing Frame ${i + 1}/${totalFrames}`,
        progress: Math.round(((i / totalFrames) * 80) + 10),
        currentFrame: i + 1,
        totalFrames
      });
    }
    // Convert canvas to blob for the AI engine
    const blob = await new Promise<Blob>((resolve) => canvas.toBlob(resolve, 'image/png'));
    // Process single frame
    const processedBlob = await removeBackground(blob, {
      model: 'small', // Use smaller model for faster GIF frame processing
      output: { type: 'foreground', format: 'image/png' }
    });
    // Create image element for GIF encoder
    const processedImg = await new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = URL.createObjectURL(processedBlob);
    });
    gifEncoder.addFrame(processedImg, { delay: frame.frameInfo.delay * 10 });
    // Cleanup temporary frame URL
    URL.revokeObjectURL(processedImg.src);
  }
  if (onProgress) onProgress({ status: 'Encoding Final GIF...', progress: 95 });
  return new Promise((resolve) => {
    gifEncoder.on('finished', (blob: Blob) => {
      resolve(URL.createObjectURL(blob));
    });
    gifEncoder.render();
  });
}