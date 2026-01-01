import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto py-12 px-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-10">About Tingy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-medium">Why Tingy was built</h2>
        <p className="mt-2 text-muted-foreground">
          Tingy was built to solve a simple problem — compress images quickly
          and reliably without uploading them to shady servers or dealing with
          ads, storage, or paywalls. Many online compressors force uploads,
          leak privacy, or put useful features behind accounts and limits.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-medium">What makes Tingy different</h2>
        <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
          <li>No image storage — images are not kept or indexed.</li>
          <li>Runs securely — processing is transient and focused on privacy.</li>
          <li>Built with Sharp (libvips) for fast, high-quality results.</li>
          <li>Open-source — code is public and auditable.</li>
          <li>Free forever — no paywalls or hidden fees.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-medium">Who it’s for</h2>
        <p className="mt-2 text-muted-foreground">
          Developers, designers, content creators, and anyone who values
          privacy and a fast, clean experience.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-medium">Built by</h2>
        <p className="mt-2 text-muted-foreground">
          Made by Avinash Kumar — see the project on{' '}
          <Link href="https://github.com/avinashh10x/tingy.git" className="underline hover:text-primary">
            GitHub
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
