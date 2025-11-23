"use client";

import { Sparkles, RotateCcw } from "lucide-react";
import { ImageUploader } from "@/components/ImageUploader";
import { CompressionControls } from "@/components/CompressionControls";
import { ImagePreview } from "@/components/ImagePreview";
import { Button } from "@/components/ui/button";
import { useImageCompression } from "@/hooks/useImageCompression";
import gsap from "gsap";
import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { Features } from "@/components/Features";
import Footer from "@/components/Footer";
import CompressionBox from "@/components/CompressionBox";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <CompressionBox />
        <Features />
        <Footer />
      </div>
    </div>
  );
}
