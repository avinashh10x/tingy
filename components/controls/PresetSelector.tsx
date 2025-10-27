'use client';

import { Zap, Info } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PRESETS, type PresetType } from '@/lib/constants/presets';

interface PresetSelectorProps {
  selectedPreset: PresetType;
  onPresetChange: (preset: PresetType) => void;
  disabled?: boolean;
}

export function PresetSelector({ selectedPreset, onPresetChange, disabled = false }: PresetSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-primary" />
        <Label htmlFor="preset" className="text-sm font-medium">
          Quick Presets
        </Label>
      </div>
      <Select value={selectedPreset} onValueChange={onPresetChange} disabled={disabled}>
        <SelectTrigger id="preset" className="w-full">
          <SelectValue placeholder="Choose a preset" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(PRESETS).map(([key, preset]) => (
            <SelectItem key={key} value={key}>
              <div className="flex flex-col">
                <span className="font-medium">{preset.name}</span>
                <span className="text-xs text-muted-foreground">{preset.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedPreset !== 'custom' && (
        <div className="rounded-lg bg-primary/10 p-3 text-xs">
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
            <div className="space-y-1">
              <p className="font-medium text-primary">
                Expected size reduction: {PRESETS[selectedPreset].expectedReduction}
              </p>
              {PRESETS[selectedPreset].maxWidth && (
                <p className="text-muted-foreground">
                  💡 Recommended max width: {PRESETS[selectedPreset].maxWidth}px (optional)
                </p>
              )}
              <p className="text-muted-foreground">
                Quality and format automatically adjusted for optimal results.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
