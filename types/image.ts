/**
 * Type definitions for image processing
 */

export type ImageFormat = 'jpeg' | 'jpg' | 'png' | 'webp' | 'avif';

export interface CompressionOptions {
  quality: number; // 0-100
  format: ImageFormat;
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
}

export interface ImageFile {
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
}

export interface ProcessedImage {
  blob: Blob;
  url: string;
  size: number;
  format: ImageFormat;
  width?: number;
  height?: number;
}

export interface CompressionResult {
  original: ImageFile;
  processed: ProcessedImage;
  savings: number; // percentage
  processingTime: number; // milliseconds
}

export interface ErrorResponse {
  error: string;
  details?: string;
}
