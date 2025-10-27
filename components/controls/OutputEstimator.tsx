'use client';

import { Info } from 'lucide-react';

interface OutputEstimatorProps {
  originalSize: number;
  quality: number;
}

export function OutputEstimator({ originalSize, quality }: OutputEstimatorProps) {
  const estimatedSize = (originalSize * (quality / 100)) / 1024 / 1024;
  const reduction = 100 - quality;

  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">Estimated Output</span>
        <Info className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-2 text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span>Original size:</span>
          <span className="font-medium">{(originalSize / 1024 / 1024).toFixed(2)} MB</span>
        </div>
        <div className="flex justify-between">
          <span>Expected size:</span>
          <span className="font-medium text-primary">~{estimatedSize.toFixed(2)} MB</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated reduction:</span>
          <span className="font-medium text-green-600 dark:text-green-400">
            ~{reduction.toFixed(0)}%
          </span>
        </div>
        <p className="mt-2 border-t pt-2 text-[10px]">
          * Actual results vary based on image complexity and format
        </p>
      </div>
    </div>
  );
}
