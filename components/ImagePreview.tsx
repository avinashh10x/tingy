'use client';

import { CheckCircle2, ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateSavings, createDownloadFilename } from '@/lib/image-utils';
import type { CompressionResult } from '@/types/image';
import { CompressionStats } from '@/components/preview/CompressionStats';
import { CompressionProgress } from '@/components/preview/CompressionProgress';
import { ImageComparisonSlider } from '@/components/preview/ImageComparisonSlider';
import { ImageDetails } from '@/components/preview/ImageDetails';
import { DownloadSection } from '@/components/preview/DownloadSection';
import { AnimatedLoader } from '@/components/preview/AnimatedLoader';

interface ImagePreviewProps {
  result: CompressionResult | null;
  isProcessing?: boolean;
  loaderIndex?: number;
}

export function ImagePreview({ result, isProcessing = false, loaderIndex = 0 }: ImagePreviewProps) {
  if (!result && !isProcessing) {
    return (
      <Card className="w-full">
        <CardContent className="flex h-48 items-center justify-center p-12">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="mx-auto mb-4 h-16 w-16 opacity-20" />
            <p className="text-sm">Upload an image and compress it to see results here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isProcessing) {
    return (
      <Card className="w-full">
        <CardContent className="flex min-h-[400px] items-center justify-center p-12">
          <div className="text-center space-y-4">
            <AnimatedLoader loaderIndex={loaderIndex} />
            {/* <p className="text-sm text-muted-foreground">Processing...</p> */}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) return null;

  const savings = calculateSavings(result.original.size, result.processed.size);
  const downloadFilename = createDownloadFilename(result.original.name, result.processed.format);

  return (
    <div className="sticky top-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Compression Complete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Interactive Slider Comparison - Show image first */}
          <ImageComparisonSlider
            originalUrl={result.original.preview}
            compressedUrl={result.processed.url}
            originalSize={result.original.size}
            compressedSize={result.processed.size}
            format={result.processed.format}
          />

          {/* Download Button - Easy access right after seeing the result */}
          <DownloadSection
            downloadUrl={result.processed.url}
            filename={downloadFilename}
          />

          {/* Stats Section */}
          <CompressionStats
            originalSize={result.original.size}
            compressedSize={result.processed.size}
            savings={savings}
          />

          {/* Visual Progress Bar */}
          <CompressionProgress savings={savings} />

          {/* Additional Info */}
          <ImageDetails
            format={result.processed.format}
            width={result.processed.width}
            height={result.processed.height}
            processingTime={result.processingTime}
            bytesSaved={result.original.size - result.processed.size}
          />
        </CardContent>
      </Card>
    </div>
  );
}
