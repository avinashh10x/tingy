import React from "react";
import { ImageUploader } from "./ImageUploader";
import { CompressionControls } from "./CompressionControls";
import { Button } from "./ui/button";
import { RotateCcw, Sparkles } from "lucide-react";
import { useImageCompression } from "@/hooks/useImageCompression";
import { ImagePreview } from "./ImagePreview";

function CompressionBox() {
  const {
    selectedImage,
    compressionOptions,
    compressionResult,
    isProcessing,
    loaderIndex,
    setCompressionOptions,
    handleImageSelect,
    handleCompress,
    handleReset,
  } = useImageCompression();
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left Column - Upload & Controls */}
      <div className="space-y-6">
        <ImageUploader
          onImageSelect={handleImageSelect}
          currentImage={selectedImage}
          disabled={isProcessing}
          onQuickCompress={selectedImage ? handleCompress : undefined}
        />

        {selectedImage && (
          <>
            <CompressionControls
              options={compressionOptions}
              onOptionsChange={setCompressionOptions}
              disabled={isProcessing}
              originalSize={selectedImage.size}
            />

            <div className="flex gap-3">
              <Button
                onClick={handleCompress}
                disabled={isProcessing}
                className="flex-1"
                size="lg"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {isProcessing ? "Compressing..." : "Compress Image"}
              </Button>

              <Button
                onClick={handleReset}
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

      {/* Right Column - Preview & Results */}
      <div className="space-y-6">
        <ImagePreview
          result={compressionResult}
          isProcessing={isProcessing}
          loaderIndex={loaderIndex}
        />
      </div>
    </div>
  );
}

export default CompressionBox;
