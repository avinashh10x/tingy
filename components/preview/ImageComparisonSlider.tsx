'use client';

import { useState, useRef, useEffect } from 'react';
import { MoveHorizontal, AlertCircle } from 'lucide-react';
import { formatBytes } from '@/lib/image-utils';

interface ImageComparisonSliderProps {
  originalUrl: string;
  compressedUrl: string;
  originalSize: number;
  compressedSize: number;
  format: string;
}

export function ImageComparisonSlider({
  originalUrl,
  compressedUrl,
  originalSize,
  compressedSize,
  format,
}: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState({ original: false, compressed: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      updateSliderPosition(e.clientX);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updateSliderPosition(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current) {
        updateSliderPosition(e.clientX);
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging]);

  // Show error if images fail to load
  if (imageError.original && imageError.compressed) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Compare Images</p>
        </div>
        <div className="aspect-video rounded-lg border border-destructive/50 bg-destructive/10 flex items-center justify-center">
          <div className="text-center p-6">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-3" />
            <p className="text-sm font-medium text-destructive">Failed to load images</p>
            <p className="text-xs text-muted-foreground mt-1">Please try compressing again</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Compare Images</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MoveHorizontal className="h-3 w-3" />
          <span>Drag to compare</span>
        </div>
      </div>
      
      <div
        ref={containerRef}
        className="relative aspect-video cursor-ew-resize select-none overflow-hidden rounded-lg border bg-muted/30"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* Compressed Image (Background) */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={compressedUrl}
            alt="Compressed"
            className="h-full w-full object-contain"
            draggable={false}
            onError={() => setImageError(prev => ({ ...prev, compressed: true }))}
          />
          <div className="absolute bottom-2 right-2 rounded bg-primary/90 px-2 py-1 text-xs font-medium text-primary-foreground backdrop-blur">
            Compressed
          </div>
        </div>

        {/* Original Image (Foreground with clip) */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={originalUrl}
            alt="Original"
            className="h-full w-full object-contain"
            draggable={false}
            onError={() => setImageError(prev => ({ ...prev, original: true }))}
          />
          <div className="absolute bottom-2 left-2 rounded bg-background/90 px-2 py-1 text-xs font-medium backdrop-blur">
            Original
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute inset-y-0 z-10 w-1 cursor-ew-resize bg-primary"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Button */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background shadow-lg">
              <MoveHorizontal className="h-5 w-5 text-primary" />
            </div>
          </div>

          {/* Top Arrow */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <div className="h-3 w-6 rounded-b-sm bg-primary" />
          </div>

          {/* Bottom Arrow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <div className="h-3 w-6 rounded-t-sm bg-primary" />
          </div>
        </div>
      </div>

      {/* Image Details */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded bg-muted/50 p-2">
          <span className="font-medium">Original:</span>{' '}
          {formatBytes(originalSize)}
        </div>
        <div className="rounded bg-primary/10 p-2">
          <span className="font-medium">Compressed:</span>{' '}
          {formatBytes(compressedSize)} • {format.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
