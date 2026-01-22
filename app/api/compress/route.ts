import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { del } from "@vercel/blob";
import type { ImageFormat } from "@/types/image";

// Maximum file size: 20MB
const MAX_FILE_SIZE = 20 * 1024 * 1024;

// Allowed image formats
const ALLOWED_FORMATS: ImageFormat[] = ["jpeg", "jpg", "png", "webp", "avif"];

/**
 * POST /api/compress
 * Compresses an image with the specified options
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let blobUrl: string | null = null;

  try {
    // Parse request body - support both direct upload and blob URL
    const contentType = request.headers.get("content-type");
    let file: File | null = null;
    let format: ImageFormat = "jpeg";
    let quality = 80;
    let width: number | undefined;
    let height: number | undefined;
    let maintainAspectRatio = true;
    // Target size parameters (declared at top level for binary search)
    let targetSizeBytes: number | undefined;

    if (contentType?.includes("application/json")) {
      // Blob URL mode (large files)
      const body = await request.json();
      blobUrl = body.blobUrl;
      format = (body.format as ImageFormat) || "jpeg";
      quality = parseInt(body.quality) || 80;
      width = body.width ? parseInt(body.width) : undefined;
      height = body.height ? parseInt(body.height) : undefined;
      maintainAspectRatio = body.maintainAspectRatio !== false;

      // Target size parameters
      const targetSizeEnabled = body.targetSizeEnabled === true;
      const targetSize = body.targetSize
        ? parseFloat(body.targetSize)
        : undefined;
      const targetSizeUnit = body.targetSizeUnit || "KB";
      targetSizeBytes =
        targetSizeEnabled && targetSize
          ? targetSize * (targetSizeUnit === "MB" ? 1024 * 1024 : 1024)
          : undefined;

      if (!blobUrl) {
        return NextResponse.json(
          {
            error: "No blob URL provided",
            details: "Please provide a blob URL.",
          },
          { status: 400 }
        );
      }
    } else {
      // Direct upload mode (small files <4MB)
      const formData = await request.formData();
      file = formData.get("file") as File;
      format = (formData.get("format") as ImageFormat) || "jpeg";
      quality = parseInt(formData.get("quality") as string) || 80;
      width = formData.get("width")
        ? parseInt(formData.get("width") as string)
        : undefined;
      height = formData.get("height")
        ? parseInt(formData.get("height") as string)
        : undefined;
      maintainAspectRatio = formData.get("maintainAspectRatio") === "true";

      // Target size parameters
      const targetSizeEnabled = formData.get("targetSizeEnabled") === "true";
      const targetSize = formData.get("targetSize")
        ? parseFloat(formData.get("targetSize") as string)
        : undefined;
      const targetSizeUnit = (formData.get("targetSizeUnit") as string) || "KB";
      targetSizeBytes =
        targetSizeEnabled && targetSize
          ? targetSize * (targetSizeUnit === "MB" ? 1024 * 1024 : 1024)
          : undefined;

      // Validation: File exists
      if (!file) {
        return NextResponse.json(
          {
            error: "No file provided",
            details: "Please upload an image file.",
          },
          { status: 400 }
        );
      }

      // Validation: File size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            error: "File too large",
            details: `File size must be less than ${
              MAX_FILE_SIZE / 1024 / 1024
            }MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`,
          },
          { status: 400 }
        );
      }

      // Validation: File type
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          {
            error: "Invalid file type",
            details: "Only image files are allowed.",
          },
          { status: 400 }
        );
      }
    }

    // Validation: Output format
    if (!ALLOWED_FORMATS.includes(format)) {
      return NextResponse.json(
        {
          error: "Invalid format",
          details: `Format must be one of: ${ALLOWED_FORMATS.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validation: Quality range
    if (quality < 0 || quality > 100) {
      return NextResponse.json(
        {
          error: "Invalid quality",
          details: "Quality must be between 0 and 100.",
        },
        { status: 400 }
      );
    }

    // ✅ DEBUG: Log received compression options
    console.log("📥 API Received Options:", {
      format,
      quality,
      width,
      height,
      maintainAspectRatio,
      contentType,
      isBlobMode: !!blobUrl,
    });

    // Validation: Dimensions
    if (width !== undefined && (width <= 0 || width > 10000)) {
      return NextResponse.json(
        {
          error: "Invalid width",
          details: "Width must be between 1 and 10000 pixels.",
        },
        { status: 400 }
      );
    }

    if (height !== undefined && (height <= 0 || height > 10000)) {
      return NextResponse.json(
        {
          error: "Invalid height",
          details: "Height must be between 1 and 10000 pixels.",
        },
        { status: 400 }
      );
    }

    // Get image buffer - either from direct upload or blob URL
    let buffer: Buffer;
    let originalSize: number;

    if (blobUrl) {
      // Download from Vercel Blob
      console.log("📥 Downloading from Blob URL:", blobUrl);
      const response = await fetch(blobUrl);
      if (!response.ok) {
        console.error(
          "❌ Blob fetch failed:",
          response.status,
          response.statusText
        );
        return NextResponse.json(
          {
            error: "Failed to download image",
            details: "Could not fetch the uploaded image.",
          },
          { status: 500 }
        );
      }
      const arrayBuffer = await response.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
      originalSize = buffer.length;

      console.log("✅ Downloaded from Blob:", {
        bufferSize: buffer.length,
        isEmpty: buffer.length === 0,
      });

      if (buffer.length === 0) {
        return NextResponse.json(
          {
            error: "Empty image",
            details: "The uploaded image is empty or corrupted.",
          },
          { status: 400 }
        );
      }

      // Clean up the temporary blob file
      try {
        await del(blobUrl);
        console.log("🗑️ Deleted temp blob");
      } catch (error) {
        console.error("Failed to delete blob:", error);
        // Non-critical error, continue processing
      }
    } else if (file) {
      // Convert file to buffer (direct upload)
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
      originalSize = file.size;
    } else {
      return NextResponse.json(
        {
          error: "No image provided",
          details: "Please provide an image file or blob URL.",
        },
        { status: 400 }
      );
    }

    // Initialize Sharp instance
    let sharpInstance = sharp(buffer, {
      failOnError: false, // Handle errors gracefully
      limitInputPixels: 268402689, // Limit to ~16K x 16K images for security
    });

    // Get original metadata
    const metadata = await sharpInstance.metadata();

    // Apply resize if dimensions are provided
    if (width || height) {
      const resizeOptions: sharp.ResizeOptions = {
        width,
        height,
        fit: maintainAspectRatio ? "inside" : "fill",
        withoutEnlargement: true, // Don't upscale images
      };
      sharpInstance = sharpInstance.resize(resizeOptions);
    }

    // ✅ BINARY SEARCH: Find optimal quality for target file size
    if (targetSizeBytes) {
      console.log("🎯 Target Size Mode Enabled:", {
        targetBytes: targetSizeBytes,
        targetKB: (targetSizeBytes / 1024).toFixed(2),
        originalQuality: quality,
      });

      let minQuality = 10;
      let maxQuality = 100;
      let bestQuality = quality;
      let bestSize = Infinity;
      let attempts = 0;
      const maxAttempts = 8;
      const tolerance = 0.05; // ±5% tolerance

      while (attempts < maxAttempts && maxQuality - minQuality > 5) {
        const testQuality = Math.floor((minQuality + maxQuality) / 2);

        // Test compression with this quality
        let testInstance = sharp(buffer);
        if (width || height) {
          testInstance = testInstance.resize({
            width,
            height,
            fit: maintainAspectRatio ? "inside" : "fill",
            withoutEnlargement: true,
          });
        }

        // Apply format with test quality
        const testFormat = format === "jpg" ? "jpeg" : format;
        const testOptions: any = {
          jpeg: { quality: testQuality, mozjpeg: true, progressive: true },
          png: {
            compressionLevel: 9,
            quality: testQuality,
            palette: testQuality < 90,
            colors:
              testQuality < 90
                ? Math.max(16, Math.floor((testQuality / 100) * 256))
                : 256,
            effort: 10,
          },
          webp: {
            quality: testQuality,
            effort: testQuality < 80 ? 6 : 4,
            lossless: false,
          },
          avif: {
            quality: testQuality,
            effort: testQuality < 80 ? 6 : 4,
            lossless: false,
          },
        };

        testInstance = testInstance.toFormat(testFormat, testOptions[format]);
        const testBuffer = await testInstance.toBuffer();
        const testSize = testBuffer.length;

        console.log(
          `  Attempt ${attempts + 1}: Q=${testQuality}, Size=${(
            testSize / 1024
          ).toFixed(2)}KB`
        );

        // Check if within tolerance
        if (
          testSize <= targetSizeBytes &&
          testSize >= targetSizeBytes * (1 - tolerance)
        ) {
          bestQuality = testQuality;
          bestSize = testSize;
          console.log(`  ✅ Found optimal quality: ${bestQuality}`);
          break;
        }

        // Update best if closer to target
        if (
          Math.abs(testSize - targetSizeBytes) <
            Math.abs(bestSize - targetSizeBytes) &&
          testSize <= targetSizeBytes
        ) {
          bestQuality = testQuality;
          bestSize = testSize;
        }

        // Adjust search range
        if (testSize > targetSizeBytes) {
          maxQuality = testQuality;
        } else {
          minQuality = testQuality;
        }

        attempts++;
      }

      quality = bestQuality;
      console.log("🎯 Final Quality:", {
        quality,
        expectedSize: (bestSize / 1024).toFixed(2) + "KB",
        targetSize: (targetSizeBytes / 1024).toFixed(2) + "KB",
        attempts,
      });
    }

    // Configure format-specific options
    // ✅ Quality parameter now properly affects ALL formats
    const formatOptions: Record<
      ImageFormat,
      | sharp.JpegOptions
      | sharp.PngOptions
      | sharp.WebpOptions
      | sharp.AvifOptions
    > = {
      jpeg: {
        quality,
        mozjpeg: true,
        progressive: true, // Progressive JPEG for better web loading
      },
      jpg: {
        quality,
        mozjpeg: true,
        progressive: true,
      },
      png: {
        compressionLevel: 9, // Maximum PNG compression (0-9)
        // ✅ FIX: Use quality parameter for PNG
        quality, // This controls lossy compression in PNG
        palette: quality < 90, // Use palette quantization for lower quality
        colors:
          quality < 90 ? Math.max(16, Math.floor((quality / 100) * 256)) : 256,
        effort: 10, // Maximum effort
      },
      webp: {
        quality,
        // ✅ FIX: Increase effort based on quality for better compression
        effort: quality < 80 ? 6 : 4, // More effort for higher compression
        lossless: false, // Ensure lossy compression
      },
      avif: {
        quality,
        // ✅ FIX: Increase effort based on quality for better compression
        effort: quality < 80 ? 6 : 4, // More effort for higher compression
        lossless: false, // Ensure lossy compression
      },
    };

    console.log("⚙️ Compression Settings Applied:", {
      format,
      quality,
      pngPalette: format === "png" ? quality < 90 : "N/A",
      pngColors:
        format === "png"
          ? quality < 90
            ? Math.max(16, Math.floor((quality / 100) * 256))
            : 256
          : "N/A",
      effort:
        format === "webp" || format === "avif" ? (quality < 80 ? 6 : 4) : "N/A",
    });

    // Apply format conversion and compression
    const outputFormat = format === "jpg" ? "jpeg" : format;

    // ✅ DEBUG: Log format conversion
    console.log("🎨 Format Conversion:", {
      requestedFormat: format,
      outputFormat,
      quality,
    });

    sharpInstance = sharpInstance.toFormat(outputFormat, formatOptions[format]);

    // Process the image
    const outputBuffer = await sharpInstance.toBuffer({
      resolveWithObject: true,
    });

    // Calculate processing time
    const processingTime = Date.now() - startTime;

    // Prepare response headers
    const headers = new Headers();
    headers.set("Content-Type", `image/${outputFormat}`);
    headers.set("Content-Length", outputBuffer.info.size.toString());
    headers.set("X-Processing-Time", processingTime.toString());
    headers.set("X-Original-Size", originalSize.toString());
    headers.set("X-Compressed-Size", outputBuffer.info.size.toString());
    headers.set("X-Original-Width", (metadata.width || 0).toString());
    headers.set("X-Original-Height", (metadata.height || 0).toString());
    headers.set("X-Output-Width", outputBuffer.info.width.toString());
    headers.set("X-Output-Height", outputBuffer.info.height.toString());

    // Return the compressed image
    return new NextResponse(Buffer.from(outputBuffer.data), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Image compression error:", error);

    // Handle specific Sharp errors
    if (error instanceof Error) {
      if (
        error.message.includes("Input buffer contains unsupported image format")
      ) {
        return NextResponse.json(
          {
            error: "Unsupported image format",
            details:
              "The uploaded file is not a valid image or the format is not supported.",
          },
          { status: 400 }
        );
      }

      if (error.message.includes("Input image exceeds pixel limit")) {
        return NextResponse.json(
          {
            error: "Image too large",
            details:
              "The image resolution is too high. Please use a smaller image.",
          },
          { status: 400 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      {
        error: "Compression failed",
        details:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during image processing.",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/compress
 * Returns API information
 */
export async function GET() {
  return NextResponse.json({
    name: "Tingy Image Compression API",
    version: "1.0.0",
    endpoints: {
      POST: {
        description: "Compress and convert images",
        parameters: {
          file: "Image file (required)",
          format: "Output format: jpeg, png, webp, avif (default: jpeg)",
          quality: "Quality: 0-100 (default: 80)",
          width: "Target width in pixels (optional)",
          height: "Target height in pixels (optional)",
          maintainAspectRatio:
            "Maintain aspect ratio: true/false (default: true)",
        },
        limits: {
          maxFileSize: "20MB",
          maxDimensions: "10000x10000",
        },
      },
    },
  });
}
