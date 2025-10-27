'use client';

import { Maximize2, Lock, Unlock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ResizeControlsProps {
  width?: string;
  height?: string;
  maintainAspectRatio: boolean;
  onWidthChange: (value: string) => void;
  onHeightChange: (value: string) => void;
  onToggleAspectRatio: () => void;
  onClearDimensions: () => void;
  disabled?: boolean;
}

export function ResizeControls({
  width = '',
  height = '',
  maintainAspectRatio,
  onWidthChange,
  onHeightChange,
  onToggleAspectRatio,
  onClearDimensions,
  disabled = false,
}: ResizeControlsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          <Maximize2 className="mr-2 inline-block h-4 w-4" />
          Resize (Optional)
        </Label>
        {(width || height) && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClearDimensions}
            disabled={disabled}
            className="h-auto px-2 py-1 text-xs"
          >
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="width" className="text-xs text-muted-foreground">
            Width (px)
          </Label>
          <Input
            id="width"
            type="number"
            placeholder="Auto"
            value={width}
            onChange={(e) => onWidthChange(e.target.value)}
            disabled={disabled}
            min={1}
            max={10000}
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height" className="text-xs text-muted-foreground">
            Height (px)
          </Label>
          <Input
            id="height"
            type="number"
            placeholder="Auto"
            value={height}
            onChange={(e) => onHeightChange(e.target.value)}
            disabled={disabled}
            min={1}
            max={10000}
            className="h-9"
          />
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onToggleAspectRatio}
        disabled={disabled}
        className="w-full"
      >
        {maintainAspectRatio ? (
          <Lock className="mr-2 h-4 w-4" />
        ) : (
          <Unlock className="mr-2 h-4 w-4" />
        )}
        {maintainAspectRatio ? 'Aspect Ratio Locked' : 'Aspect Ratio Unlocked'}
      </Button>

      <p className="text-xs text-muted-foreground">
        {maintainAspectRatio
          ? 'Image will scale proportionally. Enter one dimension to auto-calculate the other.'
          : 'Image will stretch to exact dimensions. May distort the image.'}
      </p>
    </div>
  );
}
