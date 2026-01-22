"use client";

import { useCallback, useMemo } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import {
  Upload,
  FileImage,
  AlertCircle,
  X,
  Plus,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  isValidImageType,
  isValidFileSize,
  formatBytes,
} from "@/lib/image-utils";
import type { QueuedImage } from "@/types/image";
import { ImageThumbnail } from "./ImageThumbnail";

interface ImageUploaderProps {
  onImagesAdd: (files: File[]) => void;
  images: QueuedImage[];
  activeImageId: string | null;
  onActiveImageChange: (id: string) => void;
  onRemoveImage: (id: string) => void;
  disabled?: boolean;
  onQuickCompress?: () => void;
}

export function ImageUploader({
  onImagesAdd,
  images,
  activeImageId,
  onActiveImageChange,
  onRemoveImage,
  disabled = false,
  onQuickCompress,
}: ImageUploaderProps) {
  // ✅ Memoize activeImage lookup
  const activeImage = useMemo(
    () => images.find((args) => args.id === activeImageId),
    [images, activeImageId]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Handle rejected
      if (rejectedFiles.length > 0) {
        console.error("Files rejected", rejectedFiles);
      }

      // Filter valid files
      const validFiles = acceptedFiles.filter((file) => {
        return isValidImageType(file) && isValidFileSize(file);
      });

      if (validFiles.length > 0) {
        // Enforce max 15 limit check if needed, but for now just add them
        // The parent/hook handles limits if logic exists there, or we can slice here
        onImagesAdd(validFiles);
      }
    },
    [onImagesAdd]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/avif": [".avif"],
    },
    maxFiles: 15,
    maxSize: 20 * 1024 * 1024,
    multiple: true, // Enable multiple!
    disabled,
  });

  // If no images, show the big dropzone
  if (images.length === 0) {
    return (
      <div
        {...getRootProps()}
        className={cn(
          "relative cursor-pointer rounded-lg border-2 border-dashed bg-background p-12 transition-all duration-200",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/5",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="rounded-full bg-primary/10 p-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-semibold">
              {isDragActive ? "Drop images here" : "Upload images"}
            </h3>
            <p className="text-sm text-muted-foreground">
              Drag & drop up to 15 images
            </p>
            <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
              <AlertCircle className="h-3 w-3" />
              <span>JPG, PNG, WEBP, AVIF • Max 20MB each</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If images exist, show the Gallery UI
  return (
    <div className="space-y-6 w-full max-w-full">
      {/* Hero Preview */}
      {activeImage && (
        <>
          <div
            {...getRootProps()}
            className={cn(
              "relative aspect-video w-full max-w-full overflow-hidden rounded-lg border bg-muted/30 outline-none",
              isDragActive && "border-primary ring-2 ring-primary/20"
            )}
          >
            <input {...getInputProps()} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage.preview}
              alt="Preview"
              className="absolute inset-0 h-full w-full object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity hover:opacity-100">
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-medium truncate max-w-[200px] sm:max-w-[300px]">
                  {activeImage.file.name}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xs opacity-75">
                    {formatBytes(activeImage.originalSize)}
                  </p>
                  <span className="text-xs opacity-50">•</span>
                  <p className="text-xs opacity-75">Click or drag to replace</p>
                </div>
              </div>
            </div>
            {/* Remove Button for Active Image */}
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveImage(activeImage.id);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Compress Button (Only for single image) */}
          {images.length === 1 && onQuickCompress && (
            <Button
              onClick={onQuickCompress}
              className="w-full"
              size="lg"
              disabled={disabled}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Quick Compress (Default Settings)
            </Button>
          )}
        </>
      )}

      {/* Thumbnails Strip - Only show if more than 1 image */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-5">
          {images.map((img) => (
            <ImageThumbnail
              key={img.id}
              image={img}
              isActive={activeImageId === img.id}
              onClick={() => onActiveImageChange(img.id)}
              onRemove={() => onRemoveImage(img.id)}
            />
          ))}

          {/* Add More Button */}
          {images.length < 15 && (
            <div
              {...getRootProps()}
              className={cn(
                "aspect-square flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted/10 transition-colors hover:border-primary/50 hover:bg-accent/5",
                isDragActive && "border-primary bg-primary/5"
              )}
            >
              <input {...getInputProps()} />
              <Plus className="h-6 w-6 text-muted-foreground" />
              <span className="mt-1 text-[10px] text-muted-foreground">
                Add
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
