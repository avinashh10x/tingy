/**
 * Type definitions for image processing
 */

export type ImageFormat = "jpeg" | "jpg" | "png" | "webp" | "avif";
export type SizeUnit = "KB" | "MB";

export interface CompressionOptions {
  quality: number; // 0-100
  format: ImageFormat; // UNIVERSAL - applies to all compressions
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
  // Target size feature (overrides quality when enabled)
  targetSizeEnabled?: boolean;
  targetSize?: number; // Value in selected unit
  targetSizeUnit?: SizeUnit;
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

export type CompressionStatus = "idle" | "processing" | "completed" | "error";

export interface QueuedImage {
  id: string;
  file: File;
  preview: string;
  originalSize: number;
  status: CompressionStatus;
  progress: number;
  result?: CompressionResult;
  error?: string;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}
