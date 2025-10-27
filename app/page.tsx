'use client';

import { Sparkles, RotateCcw } from 'lucide-react';
import { ImageUploader } from '@/components/ImageUploader';
import { CompressionControls } from '@/components/CompressionControls';
import { ImagePreview } from '@/components/ImagePreview';
import { Button } from '@/components/ui/button';
import { useImageCompression } from '@/hooks/useImageCompression';

export default function Home() {
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
    <div className="relative min-h-screen">
      {/* Professional Background Gradient */}
      <div className="fixed inset-0 -z-10 bg-linear-to-br from-blue-50/50 via-background to-purple-50/30 dark:from-blue-950/20 dark:via-background dark:to-purple-950/10" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="rounded-full bg-linear-to-br from-primary to-primary/80 p-4 shadow-lg">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="bg-linear-to-r p-4 from-primary to-primary/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              Tingy
            </h1>
          </div>
          <p className="text-lg font-medium text-muted-foreground sm:text-xl">
            Smart Image Compressor — Fast, Lossless, Free
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Compress images up to 20MB without losing quality. No signup required.
          </p>
        </header>

      {/* Main Content */}
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
                  {isProcessing ? 'Compressing...' : 'Compress Image'}
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
          <ImagePreview result={compressionResult} isProcessing={isProcessing} loaderIndex={loaderIndex} />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t pt-8 pb-4">
        <div className="text-center space-y-4">
          {/* <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div> */}
          <p className="text-sm text-muted-foreground">
            All processing happens securely on our servers. Your images are never stored.
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Tingy. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
}
