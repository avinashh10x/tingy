import React from "react";
import { ImageUploader } from "./ImageUploader";
import { CompressionControls } from "./CompressionControls";
import { BatchResults } from "./Batch/BatchResults";
import { ImagePreview } from "./ImagePreview";
import { Button } from "./ui/button";
import { RotateCcw, Sparkles } from "lucide-react";
import { useImageCompression } from "@/hooks/useImageCompression";

function CompressionBox() {
  const {
    images,
    activeImage,
    activeImageId,
    compressionOptions,
    isProcessing,
    completedCount,
    totalCount,
    setCompressionOptions,
    addImages,
    removeImage,
    clearAll,
    startCompression,
    setActiveImageId,
  } = useImageCompression();

  const hasImages = images.length > 0;
  const isBatchMode = images.length > 1;
  const hasStarted = images.some((img) => img.status !== "idle");
  const isAllCompleted = completedCount === totalCount && totalCount > 0;

  /* ===========================
     SINGLE / EMPTY MODE
  ============================ */
  if (!isBatchMode) {
    const singleImage = images[0];

    return (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr] w-full max-w-full">
        {/* Uploader */}
        <div className="space-y-6 lg:col-start-1 lg:row-start-1 h-fit min-w-0">
          <ImageUploader
            onImagesAdd={addImages}
            images={images}
            activeImageId={activeImageId}
            onActiveImageChange={setActiveImageId}
            onRemoveImage={removeImage}
            disabled={isProcessing}
            onQuickCompress={startCompression}
          />
        </div>

        {/* Preview */}
        <div className="space-y-6 lg:col-start-2 lg:row-start-1 lg:row-span-2 min-w-0">
          <ImagePreview
            result={singleImage?.result || null}
            isProcessing={singleImage?.status === "processing"}
            loaderIndex={0}
          />
        </div>

        {/* Controls */}
        <div className="space-y-6 lg:col-start-1 lg:row-start-2">
          {hasImages && singleImage && (
            <>
              <CompressionControls
                options={compressionOptions}
                onOptionsChange={setCompressionOptions}
                disabled={isProcessing}
                originalSize={singleImage.originalSize}
              />

              <div className="flex gap-3">
                <Button
                  onClick={startCompression}
                  disabled={isProcessing}
                  className="flex-1"
                  size="lg"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  {isProcessing ? "Compressing..." : "Compress Image"}
                </Button>

                <Button
                  onClick={clearAll}
                  disabled={isProcessing}
                  variant="outline"
                  size="lg"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  /* ===========================
     BATCH MODE (FIXED STICKY)
  ============================ */
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 w-full max-w-full">
      {/* LEFT CONTENT (no sticky issues here) */}
      <div className="lg:col-span-8 space-y-6 min-w-0 w-full">
        {hasStarted ? (
          <BatchResults
            images={images}
            activeImageId={activeImageId}
            onActiveImageChange={setActiveImageId}
          />
        ) : (
          <ImageUploader
            onImagesAdd={addImages}
            images={images}
            activeImageId={activeImageId}
            onActiveImageChange={setActiveImageId}
            onRemoveImage={removeImage}
            disabled={isProcessing}
            onQuickCompress={startCompression}
          />
        )}
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="lg:col-span-4 space-y-6 min-w-0 w-full">
        {/* ✅ STICKY WRAPPER - Optimized */}
        <div className="sticky top-5 z-20 will-change-transform">
          <div className="flex gap-3 bg-background/95 p-2 rounded-lg border shadow-sm">
            {hasStarted && !isAllCompleted && isProcessing ? (
              <Button disabled className="flex-1" size="lg">
                <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                Compressing {completedCount}/{totalCount}...
              </Button>
            ) : (
              <Button
                onClick={startCompression}
                disabled={isProcessing || isAllCompleted}
                className="flex-1"
                size="lg"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {isAllCompleted ? "Done" : `Compress ${images.length} Images`}
              </Button>
            )}

            <Button
              onClick={clearAll}
              disabled={isProcessing}
              variant="outline"
              size="lg"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <CompressionControls
          options={compressionOptions}
          onOptionsChange={setCompressionOptions}
          disabled={hasStarted}
          originalSize={activeImage?.originalSize}
        />
        <div className="">
          <div className="flex gap-3 bg-background/95 p-2 rounded-lg border shadow-sm">
            {hasStarted && !isAllCompleted && isProcessing ? (
              <Button disabled className="flex-1" size="lg">
                <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                Compressing {completedCount}/{totalCount}...
              </Button>
            ) : (
              <Button
                onClick={startCompression}
                disabled={isProcessing || isAllCompleted}
                className="flex-1"
                size="lg"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {isAllCompleted ? "Done" : `Compress ${images.length} Images`}
              </Button>
            )}

            <Button
              onClick={clearAll}
              disabled={isProcessing}
              variant="outline"
              size="lg"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompressionBox;
