/**
 * Image utility functions for validation, formatting, and size calculations
 */

export const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] as const;
export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes

export type ImageFormat = 'jpeg' | 'jpg' | 'png' | 'webp' | 'avif';

/**
 * Validates if a file is an allowed image format
 */
export function isValidImageType(file: File): boolean {
  return ALLOWED_FORMATS.includes(file.type as typeof ALLOWED_FORMATS[number]);
}

/**
 * Validates if a file is within the size limit
 */
export function isValidFileSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE;
}

/**
 * Formats bytes to human-readable size
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Calculates the percentage reduction between two sizes
 */
export function calculateSavings(originalSize: number, compressedSize: number): number {
  if (originalSize === 0) return 0;
  return Math.round(((originalSize - compressedSize) / originalSize) * 100);
}

/**
 * Gets the mime type for a given format
 */
export function getMimeType(format: ImageFormat): string {
  const mimeTypes: Record<ImageFormat, string> = {
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    avif: 'image/avif',
  };
  return mimeTypes[format];
}

/**
 * Validates image dimensions
 */
export function validateDimensions(width?: number, height?: number): { valid: boolean; error?: string } {
  if (width !== undefined && (width <= 0 || width > 10000)) {
    return { valid: false, error: 'Width must be between 1 and 10000 pixels' };
  }
  if (height !== undefined && (height <= 0 || height > 10000)) {
    return { valid: false, error: 'Height must be between 1 and 10000 pixels' };
  }
  return { valid: true };
}

/**
 * Creates a safe filename for download
 */
export function createDownloadFilename(originalName: string, format: ImageFormat): string {
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
  const sanitized = nameWithoutExt.replace(/[^a-z0-9_-]/gi, '_');
  const extension = format === 'jpg' ? 'jpeg' : format;
  return `${sanitized}_compressed.${extension}`;
}
