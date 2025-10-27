'use client';

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { getQualityLabel } from '@/lib/constants/presets';
import type { ImageFormat } from '@/types/image';

interface QualitySliderProps {
  quality: number;
  format: ImageFormat;
  onQualityChange: (value: number[]) => void;
  disabled?: boolean;
}

export function QualitySlider({ quality, format, onQualityChange, disabled = false }: QualitySliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="quality" className="text-sm font-medium">
          Quality
        </Label>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tabular-nums">{quality}%</span>
          <span className="text-xs text-muted-foreground">({getQualityLabel(quality)})</span>
        </div>
      </div>
      <Slider
        id="quality"
        min={10}
        max={100}
        step={1}
        value={[quality]}
        onValueChange={onQualityChange}
        disabled={disabled}
        className="w-full"
      />
      <p className="text-xs text-muted-foreground">
        {format === 'png'
          ? "For PNG: Higher = slower but smaller. Quality doesn't affect visual appearance (lossless)."
          : 'Higher quality = larger file size. 80-90% recommended for best balance.'}
      </p>
    </div>
  );
}
