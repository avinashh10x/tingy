import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import type {
  ImageFile,
  CompressionOptions,
  CompressionResult,
  QueuedImage,
  CompressionStatus,
} from "@/types/image";
import {
  compressImage,
  createCompressionResult,
} from "@/lib/actions/compressImage";
import { createDownloadFilename } from "@/lib/image-utils";

export function useImageCompression() {
  // Queue State
  const [images, setImages] = useState<QueuedImage[]>([]);
  const [activeImageId, setActiveImageId] = useState<string | null>(null);

  // Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingQueue, setProcessingQueue] = useState<string[]>([]); // IDs currently processing

  // Global Options
  const [compressionOptions, setCompressionOptions] =
    useState<CompressionOptions>({
      quality: 82,
      format: "webp",
      maintainAspectRatio: true,
    });

  // Derived State
  const activeImage = images.find((args) => args.id === activeImageId) || null;
  const completedCount = images.filter(
    (img) => img.status === "completed"
  ).length;
  const totalCount = images.length;

  // Refs for cleanup
  const activeImageRef = useRef<string | null>(null);
  useEffect(() => {
    activeImageRef.current = activeImageId;
  }, [activeImageId]);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
        if (img.result?.processed.url)
          URL.revokeObjectURL(img.result.processed.url);
      });
    };
  }, []);

  // --- Actions ---

  const addImages = useCallback((files: File[]) => {
    const newImages: QueuedImage[] = files.map((file) => ({
      id: uuidv4(),
      file,
      preview: URL.createObjectURL(file),
      originalSize: file.size,
      status: "idle",
      progress: 0,
    }));

    setImages((prev) => {
      const updated = [...prev, ...newImages];
      // If no active image, set the first new one as active
      if (!activeImageRef.current && newImages.length > 0) {
        setActiveImageId(newImages[0].id);
      }
      return updated;
    });

    toast.success(`Added ${files.length} image${files.length > 1 ? "s" : ""}`);
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const imgToRemove = prev.find((img) => img.id === id);
      if (imgToRemove) {
        URL.revokeObjectURL(imgToRemove.preview);
        if (imgToRemove.result?.processed.url) {
          URL.revokeObjectURL(imgToRemove.result.processed.url);
        }
      }

      const filtered = prev.filter((img) => img.id !== id);

      // If we removed the active image, pick a new one
      if (activeImageRef.current === id) {
        const nextActive = filtered[0]?.id || null;
        setActiveImageId(nextActive);
      }

      return filtered;
    });
  }, []);

  const clearAll = useCallback(() => {
    setImages((prev) => {
      prev.forEach((img) => {
        URL.revokeObjectURL(img.preview);
        if (img.result?.processed.url) {
          URL.revokeObjectURL(img.result.processed.url);
        }
      });
      return [];
    });
    setActiveImageId(null);
    setIsProcessing(false);
  }, []);

  // --- Compression Logic ---

  const processImage = async (image: QueuedImage) => {
    // Update status to processing
    setImages((prev) =>
      prev.map((img) =>
        img.id === image.id
          ? { ...img, status: "processing", progress: 0 }
          : img
      )
    );

    const startTime = Date.now();
    const isLargeFile = image.file.size >= 4 * 1024 * 1024;

    try {
      // ✅ DEBUG: Log compression options being sent
      console.log("🔧 Compression Options:", {
        format: compressionOptions.format,
        quality: compressionOptions.quality,
        width: compressionOptions.width,
        height: compressionOptions.height,
        maintainAspectRatio: compressionOptions.maintainAspectRatio,
      });

      const { blob, headers } = await compressImage(
        {
          ...image,
          name: image.file.name,
          size: image.file.size,
          type: image.file.type,
        },
        compressionOptions,
        (progress) => {
          setImages((prev) =>
            prev.map((img) =>
              img.id === image.id ? { ...img, progress } : img
            )
          );
        }
      );

      const totalTime = Date.now() - startTime;
      const result = createCompressionResult(
        {
          ...image,
          name: image.file.name,
          size: image.file.size,
          type: image.file.type,
        },
        blob,
        headers,
        compressionOptions,
        totalTime
      );

      // ✅ DEBUG: Verify format in result
      console.log("✅ Compression Result:", {
        originalFormat: image.file.type,
        requestedFormat: compressionOptions.format,
        resultFormat: result.processed.format,
        filename: createDownloadFilename(
          image.file.name,
          result.processed.format
        ),
      });

      // Update with result
      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id
            ? { ...img, status: "completed", result, progress: 100 }
            : img
        )
      );
    } catch (error) {
      console.error("❌ Compression failed for:", image.file.name, error);

      // ✅ STRICT: Remove failed images from queue instead of showing error
      setImages((prev) => prev.filter((img) => img.id !== image.id));

      // Show toast notification
      toast.error(`Failed to compress: ${image.file.name}`, {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  const startCompression = useCallback(async () => {
    setIsProcessing(true);

    // Filter images that need processing (idle or error)
    const queue = images.filter(
      (img) => img.status === "idle" || img.status === "error"
    );

    // Concurrency Limit: 3
    const CONCURRENCY = 3;
    const chunks = [];

    for (let i = 0; i < queue.length; i += CONCURRENCY) {
      chunks.push(queue.slice(i, i + CONCURRENCY));
    }

    for (const chunk of chunks) {
      await Promise.all(chunk.map((img) => processImage(img)));
    }

    setIsProcessing(false);
    toast.success("Batch compression complete!");
  }, [images, compressionOptions]);

  return {
    // State
    images,
    activeImage,
    activeImageId,
    compressionOptions,
    isProcessing,
    completedCount,
    totalCount,

    // Setters
    setCompressionOptions,
    setActiveImageId,

    // Actions
    addImages,
    removeImage,
    clearAll,
    startCompression,
  };
}
