import type { ImageFile, CompressionOptions, CompressionResult } from '@/types/image';
import { upload } from '@vercel/blob/client';

interface CompressImageResponse {
  blob: Blob;
  headers: Headers;
}

// File size threshold: 4MB (below Vercel's 4.5MB payload limit)
const DIRECT_UPLOAD_THRESHOLD = 4 * 1024 * 1024;

/**
 * Upload large file to Vercel Blob storage (client-side direct upload)
 * This bypasses the serverless function payload limit
 * @param file - The file to upload
 * @param onProgress - Optional progress callback
 * @returns Promise with blob URL
 */
async function uploadToBlob(file: File, onProgress?: (progress: number) => void): Promise<string> {
  try {
    console.log('📤 Starting Blob upload:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });

    // Use Vercel Blob's client-side upload - bypasses API route payload limit
    const blob = await upload(`temp/${file.name}`, file, {
      access: 'public',
      handleUploadUrl: '/api/upload',
      clientPayload: JSON.stringify({ filename: file.name }),
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          console.log(`📊 Upload progress: ${progress}%`);
          onProgress(progress);
        }
      },
    });

    console.log('✅ Blob upload complete:', {
      url: blob.url,
      pathname: blob.pathname,
    });

    return blob.url;
  } catch (error) {
    console.error('❌ Blob upload failed:', error);
    throw new Error('Failed to upload image to cloud storage');
  }
}

/**
 * Compress an image using the API (smart hybrid approach)
 * @param image - The image file to compress
 * @param options - Compression options (quality, format, dimensions)
 * @param onUploadProgress - Optional progress callback for large file uploads
 * @returns Promise with compressed image blob and metadata
 */
export async function compressImage(
  image: ImageFile,
  options: CompressionOptions,
  onUploadProgress?: (progress: number) => void
): Promise<CompressImageResponse> {
  const fileSize = image.file.size;
  const isLargeFile = fileSize >= DIRECT_UPLOAD_THRESHOLD;

  console.log('🔍 Compression routing:', {
    fileSize,
    fileSizeMB: (fileSize / 1024 / 1024).toFixed(2) + ' MB',
    threshold: DIRECT_UPLOAD_THRESHOLD,
    thresholdMB: (DIRECT_UPLOAD_THRESHOLD / 1024 / 1024).toFixed(2) + ' MB',
    isLargeFile,
    willUseBlob: isLargeFile,
  });

  if (isLargeFile) {
    console.log('📤 Using BLOB upload path (large file)');
    // Large files: Upload to Vercel Blob first, then compress
    const blobUrl = await uploadToBlob(image.file, onUploadProgress);
    console.log('✅ Uploaded to Blob:', blobUrl);

    // Send blob URL to compression API
    const response = await fetch('/api/compress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blobUrl,
        format: options.format,
        quality: options.quality,
        width: options.width,
        height: options.height,
        maintainAspectRatio: options.maintainAspectRatio,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || errorData.error || 'Compression failed');
    }

    const blob = await response.blob();
    return { blob, headers: response.headers };
  } else {
    console.log('⚡ Using DIRECT upload path (small file)');
    // Small files: Direct upload (faster)
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
