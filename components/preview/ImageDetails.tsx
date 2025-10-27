import { formatBytes } from '@/lib/image-utils';

interface ImageDetailsProps {
  format: string;
  width?: number;
  height?: number;
  processingTime: number;
  bytesSaved: number;
}

export function ImageDetails({
  format,
  width,
  height,
  processingTime,
  bytesSaved,
}: ImageDetailsProps) {
  return (
    <div className="rounded-lg bg-muted/50 p-4 text-xs text-muted-foreground">
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <span className="font-medium">Format:</span> {format.toUpperCase()}
        </div>
        {width && height && (
          <div>
            <span className="font-medium">Dimensions:</span> {width} × {height}
          </div>
        )}
        <div>
          <span className="font-medium">Processing time:</span> {processingTime}ms
        </div>
        <div>
          <span className="font-medium">Bytes saved:</span> {formatBytes(bytesSaved)}
        </div>
      </div>
    </div>
  );
}
