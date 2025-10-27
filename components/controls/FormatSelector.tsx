'use client';

import { Info } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ImageFormat } from '@/types/image';

interface FormatSelectorProps {
  format: ImageFormat;
  onFormatChange: (format: ImageFormat) => void;
  disabled?: boolean;
}

export function FormatSelector({ format, onFormatChange, disabled = false }: FormatSelectorProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor="format" className="text-sm font-medium">
        Output Format
      </Label>
      <Select value={format} onValueChange={onFormatChange} disabled={disabled}>
        <SelectTrigger id="format" className="w-full">
          <SelectValue placeholder="Select format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="jpeg">
            <div className="flex flex-col">
              <span className="font-medium">JPEG</span>
              <span className="text-xs text-muted-foreground">
                Best for photos •  Lossy compression
              </span>
            </div>
          </SelectItem>
          <SelectItem value="png">
            <div className="flex flex-col">
              <span className="font-medium">PNG</span>
              <span className="text-xs text-muted-foreground">
                Lossless • Transparency • Larger files
              </span>
            </div>
          </SelectItem>
          <SelectItem value="webp">
            <div className="flex flex-col">
              <span className="font-medium">WEBP</span>
              <span className="text-xs text-muted-foreground">
                Modern • Best compression • Web optimized
              </span>
            </div>
          </SelectItem>
          <SelectItem value="avif">
            <div className="flex flex-col">
              <span className="font-medium">AVIF</span>
              <span className="text-xs text-muted-foreground">
                Newest • Excellent compression • Limited support
              </span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Format-specific warnings */}
      {format === 'png' && (
        <div className="rounded-lg border-2 border-amber-500/40 bg-amber-500/10 p-3 text-xs">
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <div className="text-amber-900 dark:text-amber-200">
              <p className="font-semibold">⚠️ PNG is lossless - file size may INCREASE!</p>
              <p className="mt-1.5">
                PNG doesn&apos;t compress like JPEG. Converting JPEG → PNG often{' '}
                <strong>doubles or triples</strong> file size because PNG stores all pixel data
                without quality loss.
              </p>
              <p className="mt-2 border-t border-amber-500/30 pt-2 font-medium text-amber-800 dark:text-amber-100">
                💡 Switch to WEBP for 30-70% smaller files with same visual quality!
              </p>
            </div>
          </div>
        </div>
      )}

      {format === 'webp' && (
        <div className="rounded-lg bg-green-500/10 p-3 text-xs">
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 h-3 w-3 shrink-0 text-green-600 dark:text-green-400" />
            <div className="text-green-900 dark:text-green-200">
              <p className="font-medium">Recommended choice!</p>
              <p className="mt-1">
                WEBP provides excellent compression while maintaining high quality. Perfect for
                modern websites with ~30% smaller files than JPEG.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
