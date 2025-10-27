import { formatBytes } from '@/lib/image-utils';

interface CompressionStatsProps {
  originalSize: number;
  compressedSize: number;
  savings: number;
}

export function CompressionStats({ originalSize, compressedSize, savings }: CompressionStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-lg bg-muted p-4">
        <p className="text-xs font-medium text-muted-foreground">Original Size</p>
        <p className="mt-1 text-2xl font-bold">{formatBytes(originalSize)}</p>
      </div>
      <div className="rounded-lg bg-muted p-4">
        <p className="text-xs font-medium text-muted-foreground">Compressed Size</p>
        <p className="mt-1 text-2xl font-bold text-primary">
          {formatBytes(compressedSize)}
        </p>
      </div>
      <div className="rounded-lg bg-green-500/10 p-4">
        <p className="text-xs font-medium text-muted-foreground">Space Saved</p>
        <p className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
          {savings}%
        </p>
      </div>
    </div>
  );
}
