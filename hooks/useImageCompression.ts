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
  const [uploadProgress, setUploadProgress] = useState(0);

  // Cleanup blob URLs when specific images change (but not on every render)
  useEffect(() => {
    // Cleanup OLD compression result when a NEW one is created
    // But keep the original image preview URL intact
    return () => {
      if (compressionResult?.processed.url) {
        URL.revokeObjectURL(compressionResult.processed.url);
      }
    };
  }, [compressionResult?.processed.url]); // Only when processed URL changes

  // Cleanup original image preview only when image changes or unmounts
  useEffect(() => {
    return () => {
      if (selectedImage?.preview) {
        URL.revokeObjectURL(selectedImage.preview);
      }
    };
  }, [selectedImage?.preview]); // Only when preview URL changes

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

    // Don't clean up previous result here - let useEffect handle it
    // This prevents revoking URLs while they're still being displayed

    setIsProcessing(true);
    setUploadProgress(0);
    const startTime = Date.now();

    // Show upload progress for large files
    const fileSize = selectedImage.file.size;
    const isLargeFile = fileSize >= 4 * 1024 * 1024; // 4MB threshold

    if (isLargeFile) {
      toast.info('Uploading large file...', {
        description: `${(fileSize / 1024 / 1024).toFixed(1)} MB - This may take a moment`,
        duration: 5000,
      });
    }

    try {
      // Call compression API with progress callback
      const { blob, headers } = await compressImage(
        selectedImage,
        compressionOptions,
        (progress) => {
          setUploadProgress(progress);
          if (progress === 100 && isLargeFile) {
            toast.info('Processing image...', {
              description: 'Sharp is optimizing your image',
              duration: 3000,
            });
          }
        }
      );

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
      setUploadProgress(0);
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
    uploadProgress,
    
    // Setters
    setCompressionOptions,
    
    // Actions
    handleImageSelect,
    handleCompress,
    handleReset,
  };
}
