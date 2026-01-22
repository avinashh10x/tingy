import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import FAQ from "@/components/FAQ";
import HowItWorks from "@/components/HowItWorks";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <section>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              About Tingy
            </h1>
            <p className="text-xl text-muted-foreground max-w-6xl mx-auto text-center">
              The free, private, and powerful image compressor built for the
              modern web. <br /> Tingy was built to solve a simple problem compress images
              quickly and reliably without uploading them to shady servers or
              dealing with ads, storage, or paywalls. Many online compressors
              force uploads, leak privacy, or put useful features behind
              accounts and limits. We believe essential tools should be free, fast, and respectful of
              user privacy.
            </p>
          </section>
        </div>

        <HowItWorks />

        <FAQ />
      </main>
    </div>
  );
}
