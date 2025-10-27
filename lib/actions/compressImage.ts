import type { ImageFile, CompressionOptions, CompressionResult } from '@/types/image';

interface CompressImageResponse {
  blob: Blob;
  headers: Headers;
}

/**
 * Compress an image using the API
 * @param image - The image file to compress
 * @param options - Compression options (quality, format, dimensions)
 * @returns Promise with compressed image blob and metadata
 */
export async function compressImage(
  image: ImageFile,
  options: CompressionOptions
): Promise<CompressImageResponse> {
  // Prepare form data
  const formData = new FormData();
  formData.append('file', image.file);
  formData.append('format', options.format);
  formData.append('quality', options.quality.toString());
  formData.append('maintainAspectRatio', options.maintainAspectRatio.toString());

  if (options.width) {
    formData.append('width', options.width.toString());
  }
  if (options.height) {
    formData.append('height', options.height.toString());
  }

  // Call API
  const response = await fetch('/api/compress', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.details || errorData.error || 'Compression failed');
  }

  // Get compressed image blob
  const blob = await response.blob();

  return {
    blob,
    headers: response.headers,
  };
}

/**
 * Create a compression result object from API response
 * @param originalImage - The original image file
 * @param blob - The compressed image blob
 * @param headers - Response headers containing metadata
 * @param options - Compression options used
 * @param totalTime - Total processing time in milliseconds
 * @returns CompressionResult object
 */
export function createCompressionResult(
  originalImage: ImageFile,
  blob: Blob,
  headers: Headers,
  options: CompressionOptions,
  totalTime: number
): CompressionResult {
  const processingTime = parseInt(headers.get('X-Processing-Time') || '0');
  const compressedSize = parseInt(headers.get('X-Compressed-Size') || '0');
  const outputWidth = parseInt(headers.get('X-Output-Width') || '0');
  const outputHeight = parseInt(headers.get('X-Output-Height') || '0');

  const url = URL.createObjectURL(blob);
  const size = compressedSize || blob.size;

  const result: CompressionResult = {
    original: originalImage,
    processed: {
      blob,
      url,
      size,
      format: options.format,
      width: outputWidth || undefined,
      height: outputHeight || undefined,
    },
    savings: Math.round(((originalImage.size - size) / originalImage.size) * 100),
    processingTime: processingTime || totalTime,
  };

  return result;
}
