'use client';

import { Target, AlertTriangle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface TargetSizeControlProps {
  enabled: boolean;
  targetSizeKB: string;
  originalSize?: number;
  onEnabledChange: (enabled: boolean) => void;
  onTargetSizeChange: (value: string) => void;
  disabled?: boolean;
}

export function TargetSizeControl({
  enabled,
  targetSizeKB,
  originalSize,
  onEnabledChange,
  onTargetSizeChange,
  disabled = false,
}: TargetSizeControlProps) {
  return (
    <div className="space-y-3 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-muted-foreground" />
          <Label htmlFor="enable-target-size" className="text-sm font-medium">
            Target File Size
          </Label>
          <span className="text-xs text-muted-foreground">(Advanced)</span>
        </div>
        <Switch
          id="enable-target-size"
          checked={enabled}
          onCheckedChange={onEnabledChange}
          disabled={disabled}
        />
      </div>

      {enabled && (
        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-2 rounded-md bg-amber-500/10 p-3 text-xs">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-500" />
            <div className="space-y-1">
              <p className="font-medium text-amber-900 dark:text-amber-100">
                Quality may be compromised
              </p>
              <p className="text-amber-800 dark:text-amber-200">
                To reach your target size, the system may reduce quality significantly. This can
                result in visible artifacts and reduced image sharpness.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-size" className="text-xs text-muted-foreground">
              Maximum File Size (KB)
            </Label>
            <div className="flex gap-2">
              <Input
                id="target-size"
                type="number"
                placeholder="e.g., 500"
                value={targetSizeKB}
                onChange={(e) => onTargetSizeChange(e.target.value)}
                disabled={disabled}
                min={10}
                max={10000}
                className="h-9"
              />
              <span className="flex items-center text-xs text-muted-foreground">KB</span>
            </div>
            {originalSize && targetSizeKB && parseInt(targetSizeKB) > 0 && (
              <p className="text-xs text-muted-foreground">
                Target: {parseInt(targetSizeKB)} KB (
                {((parseInt(targetSizeKB) / (originalSize / 1024)) * 100).toFixed(0)}% of original)
              </p>
            )}
          </div>

          <p className="text-[10px] text-muted-foreground">
            💡 Tip: Use presets for better quality control. Target size is best for strict size
            requirements like email limits or bandwidth constraints.
          </p>
        </div>
      )}
    </div>
  );
}
