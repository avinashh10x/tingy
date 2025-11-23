"use client";

import { useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Upload, FileImage, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  isValidImageType,
  isValidFileSize,
  formatBytes,
} from "@/lib/image-utils";
import type { ImageFile } from "@/types/image";

interface ImageUploaderProps {
  onImageSelect: (image: ImageFile) => void;
  currentImage?: ImageFile | null;
  disabled?: boolean;
  onQuickCompress?: () => void;
}

export function ImageUploader({
  onImageSelect,
  currentImage,
  disabled = false,
  onQuickCompress,
}: ImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        let errorMessage = "File rejected";

        if (rejection.errors?.[0]?.code === "file-too-large") {
          errorMessage = "File is too large. Maximum size is 20MB.";
        } else if (rejection.errors?.[0]?.code === "file-invalid-type") {
          errorMessage =
            "Invalid file type. Only JPG, PNG, WEBP, and AVIF are supported.";
        }

        // You can integrate toast notification here
        console.error(errorMessage);
        return;
      }

      // Handle accepted file
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // Additional validation
        if (!isValidImageType(file)) {
          console.error("Invalid image type");
          return;
        }

        if (!isValidFileSize(file)) {
          console.error("File size exceeds 20MB");
          return;
        }

        // Create preview URL
        const preview = URL.createObjectURL(file);

        const imageFile: ImageFile = {
          file,
          preview,
          name: file.name,
          size: file.size,
          type: file.type,
        };

        onImageSelect(imageFile);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/avif": [".avif"],
    },
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024, // 20MB
    disabled,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "relative cursor-pointer rounded-lg border-2 border-dashed transition-all duration-200",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/5",
          disabled && "cursor-not-allowed opacity-50",
          currentImage ? "border-primary/30 bg-primary/5 p-4" : "p-8"
        )}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-4 text-center">
          {currentImage ? (
            <>
              <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentImage.preview}
                  alt="Preview"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <FileImage className="h-4 w-4 text-primary" />
                  {currentImage.name}
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatBytes(currentImage.size)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Click or drag to replace
                </p>
              </div>

              {/* Quick Compress Button */}
              {onQuickCompress && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickCompress();
                  }}
                  disabled={disabled}
                  className="w-full"
                  size="lg"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Quick Compress (Default Settings)
                </Button>
              )}
            </>
          ) : (
            <>
              <div className="h-48 flex flex-col items-center justify-center gap-4">
                <div className="rounded-full bg-primary/10 p-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    {isDragActive ? "Drop your image here" : "Upload an image"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Drag & drop or click to browse
                  </p>
                  <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
                    <AlertCircle className="h-3 w-3" />
                    <span>Supports JPG, PNG, WEBP, AVIF • Max 20MB</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {currentImage && (
        <div className="rounded-lg bg-muted p-3 text-xs">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-muted-foreground">
              Your image is ready to compress. Adjust the settings below and
              click &quot;Compress Image&quot; to start.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
