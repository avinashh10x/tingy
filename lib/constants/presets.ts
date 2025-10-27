import type { ImageFormat } from '@/types/image';

export type PresetType = 'web' | 'social' | 'email' | 'print' | 'maximum' | 'custom';

export interface Preset {
  name: string;
  description: string;
  quality: number;
  format: ImageFormat;
  maxWidth?: number;
  expectedReduction: string;
}

export const PRESETS: Record<PresetType, Preset> = {
  web: {
    name: 'Web Optimized',
    description: 'Perfect for websites - fast loading, good quality',
    quality: 82,
    format: 'webp',
    maxWidth: 1920,
    expectedReduction: '60-80%',
  },
  social: {
    name: 'Social Media',
    description: 'Optimized for Instagram, Facebook, Twitter',
    quality: 85,
    format: 'jpeg',
    maxWidth: 2048,
    expectedReduction: '50-70%',
  },
  email: {
    name: 'Email Attachment',
    description: 'Small file size for email sending',
    quality: 75,
    format: 'jpeg',
    maxWidth: 1200,
    expectedReduction: '70-85%',
  },
  print: {
    name: 'Print Quality',
    description: 'High quality for printing',
    quality: 95,
    format: 'jpeg',
    expectedReduction: '20-40%',
  },
  maximum: {
    name: 'Maximum Compression',
    description: 'Smallest file size possible',
    quality: 60,
    format: 'webp',
    maxWidth: 1600,
    expectedReduction: '80-90%',
  },
  custom: {
    name: 'Custom Settings',
    description: 'Manual control over all settings',
    quality: 80,
    format: 'jpeg',
    expectedReduction: 'Varies',
  },
};

export function getQualityLabel(quality: number): string {
  if (quality >= 90) return 'Maximum';
  if (quality >= 80) return 'High';
  if (quality >= 60) return 'Medium';
  if (quality >= 40) return 'Low';
  return 'Minimum';
}
