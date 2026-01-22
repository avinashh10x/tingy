"use client";

import { Target, AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SizeUnit } from "@/types/image";

interface TargetSizeControlProps {
  enabled: boolean;
  targetSize: string;
  targetSizeUnit: SizeUnit;
  originalSize?: number;
  onEnabledChange: (enabled: boolean) => void;
  onTargetSizeChange: (value: string) => void;
  onUnitChange: (unit: SizeUnit) => void;
  disabled?: boolean;
}

export function TargetSizeControl({
  enabled,
  targetSize,
  targetSizeUnit,
  originalSize,
  onEnabledChange,
  onTargetSizeChange,
  onUnitChange,
  disabled = false,
}: TargetSizeControlProps) {
  // Convert to bytes for comparison
  const targetSizeBytes = targetSize
    ? parseFloat(targetSize) * (targetSizeUnit === "MB" ? 1024 * 1024 : 1024)
    : 0;

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
                Quality will be automatically adjusted
              </p>
              <p className="text-amber-800 dark:text-amber-200">
                The system will iteratively adjust quality to reach your target
                size. This may result in quality compromise if target is too
                small.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="target-size"
              className="text-xs text-muted-foreground"
            >
              Maximum File Size
            </Label>
            <div className="flex gap-2">
              <Input
                id="target-size"
                type="number"
                placeholder={targetSizeUnit === "KB" ? "e.g., 500" : "e.g., 2"}
                value={targetSize}
                onChange={(e) => onTargetSizeChange(e.target.value)}
                disabled={disabled}
                min={targetSizeUnit === "KB" ? 10 : 0.01}
                max={targetSizeUnit === "KB" ? 10000 : 10}
                step={targetSizeUnit === "KB" ? 10 : 0.1}
                className="h-9 flex-1"
              />
              <Tabs
                value={targetSizeUnit}
                onValueChange={(v) => onUnitChange(v as SizeUnit)}
              >
                <TabsList className="h-9">
                  <TabsTrigger value="KB" className="text-xs px-3">
                    KB
                  </TabsTrigger>
                  <TabsTrigger value="MB" className="text-xs px-3">
                    MB
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            {originalSize && targetSize && parseFloat(targetSize) > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  Target: {targetSize} {targetSizeUnit} ={" "}
                  {(targetSizeBytes / 1024).toFixed(0)} KB (
                  {((targetSizeBytes / originalSize) * 100).toFixed(0)}% of
                  original)
                </p>
                {targetSizeBytes >= originalSize && (
                  <p className="text-xs text-destructive">
                    ⚠️ Target size is larger than original. No compression
                    needed.
                  </p>
                )}
              </div>
            )}
          </div>

          <p className="text-[10px] text-muted-foreground">
            💡 Tip: The system will try up to 8 iterations to hit your target
            size within ±5% tolerance.
          </p>
        </div>
      )}
    </div>
  );
}
