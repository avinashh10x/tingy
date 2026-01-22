import React, { memo } from "react";
import { Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QueuedImage } from "@/types/image";

interface ImageThumbnailProps {
  image: QueuedImage;
  isActive: boolean;
  onClick: () => void;
  onRemove?: () => void;
  comparisonResult?: boolean;
}

// ✅ Memoized to prevent unnecessary re-renders
export const ImageThumbnail = memo(
  function ImageThumbnail({
    image,
    isActive,
    onClick,
    onRemove,
    comparisonResult = false,
  }: ImageThumbnailProps) {
    return (
      <div className="p-1">
        <div
          onClick={onClick}
          className={cn(
            "group relative aspect-square cursor-pointer overflow-hidden rounded-md border bg-muted",
            // ✅ Removed transition-all for better performance
            isActive
              ? "ring-2 ring-primary ring-offset-2"
              : "hover:ring-2 hover:ring-primary/50 hover:ring-offset-1",
            image.status === "error" && "border-destructive bg-destructive/10"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.preview}
            alt="Thumbnail"
            // ✅ Removed scale-105 hover animation for smoother performance
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Status Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {image.status === "processing" && (
              <Loader2 className="h-6 w-6 animate-spin text-white drop-shadow-md" />
            )}
            {image.status === "completed" && (
              <CheckCircle2 className="h-6 w-6 text-green-500 drop-shadow-md bg-white/20 rounded-full" />
            )}
            {image.status === "error" && (
              <AlertCircle className="h-6 w-6 text-destructive drop-shadow-md bg-white/20 rounded-full" />
            )}
          </div>

          {/* Remove Button - Top Right */}
          {onRemove && (
            <div
              className="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity hover:bg-destructive group-hover:opacity-100 pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
            >
              <X className="h-3 w-3" />
            </div>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // ✅ Custom comparison for better memoization
    return (
      prevProps.image.id === nextProps.image.id &&
      prevProps.image.status === nextProps.image.status &&
      prevProps.isActive === nextProps.isActive &&
      prevProps.onRemove === nextProps.onRemove
    );
  }
);
