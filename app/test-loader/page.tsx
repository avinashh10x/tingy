'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const loaderClasses = [
  'loader-spinner',
  'loader-flip',
  'loader-eyes',
  'loader-slide',
  'loader-polygon',
];

const loaderNames = [
  'Spinner',
  'Flip',
  'Eyes',
  'Slide',
  'Polygon',
];

export default function TestLoaderPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextLoader = () => {
    setCurrentIndex((prev) => (prev + 1) % loaderClasses.length);
  };

  return (
    <div className="container mx-auto py-12 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Loader Test Page</CardTitle>
          <p className="text-sm text-muted-foreground">
            Current: {loaderNames[currentIndex]} (Index: {currentIndex})
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Current Loader Display */}
          <div className="border rounded-lg p-12 bg-background">
            <div className="flex items-center justify-center min-h-[200px]">
              <div className={loaderClasses[currentIndex]} />
            </div>
          </div>

          {/* Control Button */}
          <Button onClick={nextLoader} className="w-full">
            Switch to Next Loader ({loaderNames[(currentIndex + 1) % loaderClasses.length]})
          </Button>

          {/* All Loaders Display */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">All Loaders Preview:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loaderClasses.map((loaderClass, index) => (
                <Card key={loaderClass} className={currentIndex === index ? 'ring-2 ring-primary' : ''}>
                  <CardHeader>
                    <CardTitle className="text-sm">{loaderNames[index]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center min-h-[120px] bg-muted/30 rounded">
                      <div className={loaderClass} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      .{loaderClass}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CSS Inspection */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-sm">Debug Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs font-mono">
              <div>Current Class: <code className="bg-background px-2 py-1 rounded">{loaderClasses[currentIndex]}</code></div>
              <div>Theme: <code className="bg-background px-2 py-1 rounded">hsl(var(--primary))</code></div>
              <div>Expected: Animated loader using CSS keyframes</div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
