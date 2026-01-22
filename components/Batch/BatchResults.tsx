"use client";

import { useMemo } from "react";
import {
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileArchive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatBytes, createDownloadFilename } from "@/lib/image-utils";
import type { QueuedImage } from "@/types/image";
import { ImageComparisonSlider } from "@/components/preview/ImageComparisonSlider";
import { createZip } from "@/lib/utils/zip";
import { toast } from "sonner";
import { AnimatedLoader } from "@/components/preview/AnimatedLoader";
import { ImageThumbnail } from "../ImageThumbnail";

interface BatchResultsProps {
  images: QueuedImage[];
  activeImageId: string | null;
  onActiveImageChange: (id: string) => void;
}

export function BatchResults({
  images,
  activeImageId,
  onActiveImageChange,
}: BatchResultsProps) {
  // ✅ Memoize expensive lookups and calculations
  const activeImage = useMemo(
    () => images.find((img) => img.id === activeImageId),
    [images, activeImageId]
  );

  const completedImages = useMemo(
    () => images.filter((img) => img.status === "completed"),
    [images]
  );

  const isAllCompleted = completedImages.length === images.length;

  // ✅ Memoize stats calculations
  const stats = useMemo(() => {
    const totalOriginalSize = images.reduce(
      (acc, img) => acc + img.originalSize,
      0
    );
    const totalCompressedSize = completedImages.reduce(
      (acc, img) => acc + (img.result?.processed.size || 0),
      0
    );
    const totalSavings = totalOriginalSize - totalCompressedSize;
    const savingsPercent =
      totalOriginalSize > 0
        ? Math.round((totalSavings / totalOriginalSize) * 100)
        : 0;

    return {
      totalOriginalSize,
      totalCompressedSize,
      totalSavings,
      savingsPercent,
    };
  }, [images, completedImages]);

  const {
    totalOriginalSize,
    totalCompressedSize,
    totalSavings,
    savingsPercent,
  } = stats;

  // Handlers
  const handleDownloadOne = (image: QueuedImage) => {
    if (!image.result) return;
    const link = document.createElement("a");
    link.href = image.result.processed.url;
    link.download = createDownloadFilename(
      image.file.name,
      image.result.processed.format
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = async () => {
    try {
      if (completedImages.length === 0) return;

      toast.loading("Zipping files...", { id: "zip-toast" });

      const files = completedImages.map((img) => ({
        name: createDownloadFilename(
          img.file.name,
          img.result!.processed.format
        ),
        blob: img.result!.processed.blob,
      }));

      const zipBlob = await createZip(files);
      const url = URL.createObjectURL(zipBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `tingy-batch-${new Date().getTime()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.dismiss("zip-toast");
      toast.success("Download started!");
    } catch (error) {
      console.error("Zip error", error);
      toast.error("Failed to create ZIP");
    }
  };

  return (
    <div className="space-y-8 w-full max-w-full overflow-hidden">
      {/* 1. Active Image Comparison (Hero) */}
      <Card className="w-full max-w-full overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {activeImage?.status === "completed" ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Comparison Preview
              </>
            ) : (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                Processing...
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeImage && activeImage.result ? (
            <ImageComparisonSlider
              originalUrl={activeImage.preview}
              compressedUrl={activeImage.result.processed.url}
              originalSize={activeImage.originalSize}
              compressedSize={activeImage.result.processed.size}
              format={activeImage.result.processed.format}
            />
          ) : (
            <div className="flex aspect-video w-full max-w-full items-center justify-center rounded-lg border bg-muted/30 overflow-hidden">
              <div className="text-center text-muted-foreground w-full px-4">
                {activeImage?.status === "error" ? (
                  <>
                    <AlertCircle className="mx-auto mb-2 h-8 w-8 text-destructive" />
                    <p>Failed to compress this image</p>
                  </>
                ) : (
                  <>
                    <AnimatedLoader loaderIndex={0} />
                    {/* Ensure long filenames wrap and don't push width */}
                    <p className="mt-4 break-all max-w-full">
                      Processing {activeImage?.file.name}...
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2. Thumbnail Grid (Consistent with ImageUploader) */}
      <div className="w-full max-w-full overflow-hidden">
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-5">
          {images.map((img) => (
            <ImageThumbnail
              key={img.id}
              image={img}
              isActive={activeImageId === img.id}
              onClick={() => onActiveImageChange(img.id)}
              onRemove={undefined} // Input has remove, Output typically doesn't, keeping consistent with request
              comparisonResult={true}
            />
          ))}
        </div>
      </div>

      {/* 3. Download Section */}
      <Card className="w-full max-w-full overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="shrink-0">Download</CardTitle>
          {completedImages.length > 0 && (
            <Button
              onClick={handleDownloadAll}
              size="sm"
              className="gap-2 shrink-0"
            >
              <FileArchive className="h-4 w-4" />
              <span className="hidden sm:inline">Download All (ZIP)</span>
              <span className="sm:hidden">ZIP</span>
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Batch Stats */}
          {completedImages.length > 0 && (
            <div className="rounded-lg bg-muted p-4 text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span>
                Processed {completedImages.length} / {images.length} images
              </span>
              <span className="font-medium text-green-600">
                Saved {formatBytes(totalSavings)} ({savingsPercent}%)
              </span>
            </div>
          )}

          {/* File List */}
          <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 w-full">
            {images.map((img) => (
              <div
                key={img.id}
                className="flex items-center justify-between rounded-md border p-3 w-full"
              >
                <div className="flex items-center gap-3 overflow-hidden min-w-0 flex-1">
                  {/* Small thumbnail */}
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-muted relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.preview}
                      className="absolute inset-0 h-full w-full object-cover"
                      alt=""
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-sm break-all">
                      {img.status === "completed" && img.result
                        ? createDownloadFilename(
                            img.file.name,
                            img.result.processed.format
                          )
                        : img.file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {img.status === "completed" && img.result ? (
                        <>
                          {formatBytes(img.result.processed.size)}
                          <span className="ml-1 text-green-600">
                            (-{img.result.savings}%)
                          </span>
                        </>
                      ) : (
                        <span className="capitalize">{img.status}</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 ml-2">
                  {img.status === "completed" ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownloadOne(img)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  ) : img.status === "processing" ? (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
