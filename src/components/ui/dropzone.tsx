import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, CloudUpload, FileVideo } from 'lucide-react';
import { cn } from '@/lib/utils';
interface DropzoneProps {
  onUpload: (file: File) => void;
  className?: string;
  disabled?: boolean;
}
export function Dropzone({ onUpload, className, disabled }: DropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'image/gif': []
    },
    maxFiles: 1,
    disabled
  });
  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative group cursor-pointer rounded-3xl border-2 border-dashed transition-all duration-300 ease-in-out py-20 px-4",
        isDragActive
          ? "border-cf-cyan-500 bg-cf-cyan-500/5 scale-[1.01]"
          : "border-border hover:border-cf-cyan-500/50 hover:bg-muted/50",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
          isDragActive ? "bg-cf-cyan-500 text-white scale-110" : "bg-muted text-muted-foreground group-hover:bg-cf-cyan-500/10 group-hover:text-cf-cyan-500"
        )}>
          {isDragActive ? <CloudUpload className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
        </div>
        <div className="space-y-1">
          <p className="text-xl font-bold tracking-tight text-foreground">
            {isDragActive ? "Drop to upload" : "Select or drag your file"}
          </p>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            JPG, PNG, WebP or <span className="text-cf-cyan-500 font-semibold underline decoration-cf-cyan-500/30">Animated GIFs</span> supported.
          </p>
        </div>
        <div className="pt-4 flex gap-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border shadow-sm text-sm font-semibold group-hover:border-cf-cyan-500/30 transition-colors">
            <ImageIcon className="w-4 h-4 text-cf-cyan-500" />
            <span>Image</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border shadow-sm text-sm font-semibold group-hover:border-cf-cyan-500/30 transition-colors">
            <FileVideo className="w-4 h-4 text-cf-cyan-500" />
            <span>GIF</span>
          </div>
        </div>
      </div>
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-transparent group-hover:border-cf-cyan-500/30 transition-all rounded-tl-md" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-transparent group-hover:border-cf-cyan-500/30 transition-all rounded-tr-md" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-transparent group-hover:border-cf-cyan-500/30 transition-all rounded-bl-md" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-transparent group-hover:border-cf-cyan-500/30 transition-all rounded-br-md" />
    </div>
  );
}