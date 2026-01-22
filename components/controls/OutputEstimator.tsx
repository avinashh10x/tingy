"use client";

import { FileImage } from "lucide-react";
import { formatBytes } from "@/lib/image-utils";
import type { ImageFormat } from "@/types/image";

interface OutputEstimatorProps {
  originalSize?: number;
  quality: number;
  format: ImageFormat;
}

export function OutputEstimator({
  originalSize,
  quality,
  format,
}: OutputEstimatorProps) {
  if (!originalSize) {
    return (
      <div className="rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20 p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileImage className="h-4 w-4" />
          <span>Upload an image to see size estimation</span>
        </div>
      </div>
    );
  }

  // ✅ FORMAT-SPECIFIC COMPRESSION EFFICIENCY
  // These ratios represent typical compression at quality 80
  const formatEfficiency: Record<ImageFormat, number> = {
    avif: 0.15, // AVIF: Most efficient (15% of original at Q80)
    webp: 0.25, // WebP: Very efficient (25% of original at Q80)
    jpeg: 0.35, // JPEG: Moderate (35% of original at Q80)
    jpg: 0.35, // JPG: Same as JPEG
    png: 0.85, // PNG: Least efficient for photos (85% of original at Q80)
  };

  // Base compression ratio for the selected format
  const baseRatio = formatEfficiency[format];

  // Adjust ratio based on quality
  // Quality 100 = less compression (larger file)
  // Quality 0 = more compression (smaller file)
  const qualityFactor = 0.3 + (quality / 100) * 0.7; // Range: 0.3 to 1.0
  const estimatedRatio = baseRatio * qualityFactor;

  // Calculate estimated size
  const estimatedSize = Math.round(originalSize * estimatedRatio);
  const estimatedReduction = Math.round((1 - estimatedRatio) * 100);

  // Determine color based on reduction
  const getReductionColor = () => {
    if (estimatedReduction >= 70) return "text-green-600 dark:text-green-400";
    if (estimatedReduction >= 50) return "text-blue-600 dark:text-blue-400";
    if (estimatedReduction >= 30) return "text-yellow-600 dark:text-yellow-400";
    return "text-orange-600 dark:text-orange-400";
  };

  return (
    <div className="space-y-3 rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Estimated Output</span>
        <span className="text-xs text-muted-foreground">
          {format.toUpperCase()} • Q{quality}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-muted-foreground">Original size:</span>
          <span className="text-sm font-medium">
            {formatBytes(originalSize)}
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <span className="text-xs text-muted-foreground">Expected size:</span>
          <span className="text-sm font-medium">
            {formatBytes(estimatedSize)}
          </span>
        </div>

        <div className="flex items-baseline justify-between border-t pt-2">
          <span className="text-xs text-muted-foreground">
            Estimated reduction:
          </span>
          <span className={`text-sm font-bold ${getReductionColor()}`}>
            ~{estimatedReduction}%
          </span>
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground">
        * Actual results may vary based on image complexity.{" "}
        {format.toUpperCase()} is{" "}
        {format === "avif" && "the most efficient format"}
        {format === "webp" && "very efficient"}
        {(format === "jpeg" || format === "jpg") && "moderately efficient"}
        {format === "png" && "best for graphics, less efficient for photos"}.
      </p>
    </div>
  );
}
