import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { ImageFile, CompressionOptions, CompressionResult } from '@/types/image';
import { compressImage, createCompressionResult } from '@/lib/actions/compressImage';

/**
 * Custom hook for managing image compression state and operations
 * Handles image selection, compression, reset, and memory cleanup
 */

export function useImageCompression() {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [compressionOptions, setCompressionOptions] = useState<CompressionOptions>({
    quality: 80,
    format: 'jpeg',
    maintainAspectRatio: true,
  });
  const [compressionResult, setCompressionResult] = useState<CompressionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Cleanup blob URLs when component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      if (selectedImage?.preview) {
        URL.revokeObjectURL(selectedImage.preview);
      }
      if (compressionResult?.processed.url) {
        URL.revokeObjectURL(compressionResult.processed.url);
      }
    };
  }, [selectedImage, compressionResult]);

  /**
   * Handle image selection from uploader
   */
  const handleImageSelect = (image: ImageFile) => {
    setSelectedImage(image);
    setCompressionResult(null);

    toast.success('Image loaded successfully!', {
      description: `${image.name} (${(image.size / 1024 / 1024).toFixed(2)} MB)`,
    });
  };

  /**
   * Compress the selected image with current options
   */
  const handleCompress = async () => {
    if (!selectedImage) {
      toast.error('No image selected', {
        description: 'Please upload an image first.',
      });
      return;
    }

    // Clean up previous compression result to prevent memory leak
    if (compressionResult?.processed.url) {
      URL.revokeObjectURL(compressionResult.processed.url);
    }

    setIsProcessing(true);
    const startTime = Date.now();

    try {
      // Call compression API
      const { blob, headers } = await compressImage(selectedImage, compressionOptions);

      // Calculate total processing time (including network)
      const totalTime = Date.now() - startTime;

      // Create result object
      const result = createCompressionResult(
        selectedImage,
        blob,
        headers,
        compressionOptions,
        totalTime
      );

      setCompressionResult(result);

      toast.success('Image compressed successfully!', {
        description: `Saved ${result.savings}% • ${(
          (selectedImage.size - result.processed.size) /
          1024 /
          1024
        ).toFixed(2)} MB smaller`,
      });
    } catch (error) {
      console.error('Compression error:', error);
      toast.error('Compression failed', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Reset the compression state and cleanup blob URLs
   */
  const handleReset = () => {
    // Cleanup blob URLs
    if (selectedImage?.preview) {
      URL.revokeObjectURL(selectedImage.preview);
    }
    if (compressionResult?.processed.url) {
      URL.revokeObjectURL(compressionResult.processed.url);
    }

    setSelectedImage(null);
    setCompressionResult(null);
    setCompressionOptions({
      quality: 80,
      format: 'jpeg',
      maintainAspectRatio: true,
    });

    toast.info('Reset complete', {
      description: 'Ready for a new image',
    });
  };

  return {
    // State
    selectedImage,
    compressionOptions,
    compressionResult,
    isProcessing,
    
    // Setters
    setCompressionOptions,
    
    // Actions
    handleImageSelect,
    handleCompress,
    handleReset,
  };
}
