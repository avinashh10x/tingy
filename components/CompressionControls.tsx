'use client';

import { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PresetSelector } from '@/components/controls/PresetSelector';
import { FormatSelector } from '@/components/controls/FormatSelector';
import { QualitySlider } from '@/components/controls/QualitySlider';
import { OutputEstimator } from '@/components/controls/OutputEstimator';
import { ResizeControls } from '@/components/controls/ResizeControls';
import { TargetSizeControl } from '@/components/controls/TargetSizeControl';
import { PRESETS, type PresetType } from '@/lib/constants/presets';
import type { CompressionOptions, ImageFormat } from '@/types/image';

interface CompressionControlsProps {
  options: CompressionOptions;
  onOptionsChange: (options: CompressionOptions) => void;
  disabled?: boolean;
  originalSize?: number;
}

export function CompressionControls({
  options,
  onOptionsChange,
  disabled = false,
  originalSize,
}: CompressionControlsProps) {
  const [localWidth, setLocalWidth] = useState<string>(options.width?.toString() || '');
  const [localHeight, setLocalHeight] = useState<string>(options.height?.toString() || '');
  const [selectedPreset, setSelectedPreset] = useState<PresetType>('web');
  const [enableTargetSize, setEnableTargetSize] = useState(false);
  const [targetSizeKB, setTargetSizeKB] = useState<string>('');

  const handleQualityChange = (value: number[]) => {
    setSelectedPreset('custom');
    onOptionsChange({ ...options, quality: value[0] });
  };

  const handleFormatChange = (format: ImageFormat) => {
    setSelectedPreset('custom');
    onOptionsChange({ ...options, format });
  };

  const handlePresetChange = (preset: PresetType) => {
    setSelectedPreset(preset);
    if (preset === 'custom') return;

    const presetConfig = PRESETS[preset];
    // Only apply quality and format from preset, keep user's dimensions
    onOptionsChange({
      ...options,
      quality: presetConfig.quality,
      format: presetConfig.format,
      // Don't override user's dimension settings
      // If user wants preset dimensions, they can use the suggestion
    });
  };

  const handleWidthChange = (value: string) => {
    setLocalWidth(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      onOptionsChange({ ...options, width: numValue });
    } else if (value === '') {
      onOptionsChange({ ...options, width: undefined });
    }
  };

  const handleHeightChange = (value: string) => {
    setLocalHeight(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      onOptionsChange({ ...options, height: numValue });
    } else if (value === '') {
      onOptionsChange({ ...options, height: undefined });
    }
  };

  const toggleAspectRatio = () => {
    onOptionsChange({ ...options, maintainAspectRatio: !options.maintainAspectRatio });
  };

  const clearDimensions = () => {
    setLocalWidth('');
    setLocalHeight('');
    onOptionsChange({ ...options, width: undefined, height: undefined });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Settings2 className="h-5 w-5" />
          Compression Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Presets */}
        <PresetSelector
          selectedPreset={selectedPreset}
          onPresetChange={handlePresetChange}
          disabled={disabled}
        />

        {/* Format Selector */}
        <FormatSelector
          format={options.format}
          onFormatChange={handleFormatChange}
          disabled={disabled}
        />

        {/* Quality Slider */}
        <QualitySlider
          quality={options.quality}
          format={options.format}
          onQualityChange={handleQualityChange}
          disabled={disabled}
        />

        {/* Output Estimator */}
        {originalSize && <OutputEstimator originalSize={originalSize} quality={options.quality} />}

        {/* Resize Controls */}
        <ResizeControls
          width={localWidth}
          height={localHeight}
          maintainAspectRatio={options.maintainAspectRatio}
          onWidthChange={handleWidthChange}
          onHeightChange={handleHeightChange}
          onToggleAspectRatio={toggleAspectRatio}
          onClearDimensions={clearDimensions}
          disabled={disabled}
        />

        {/* Target File Size (Advanced) */}
        <TargetSizeControl
          enabled={enableTargetSize}
          targetSizeKB={targetSizeKB}
          originalSize={originalSize}
          onEnabledChange={setEnableTargetSize}
          onTargetSizeChange={setTargetSizeKB}
          disabled={disabled}
        />
      </CardContent>
    </Card>
  );
}
