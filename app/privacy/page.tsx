import React from "react";

export default function PrivacyPage() {
  return (
    <main className="max-w-7xl min-h-screen mx-auto py-12 px-8">
      <h1 className="text-4xl font-bold mb-10">Privacy</h1>

      <section className="mb-6">
        <p className="text-muted-foreground">
          Your privacy matters. Tingy is designed to minimize data exposure
          while giving you a fast, reliable image compressor.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-medium">Key points</h2>
        <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
          <li>Images are never stored long-term.</li>
          <li>Images are processed temporarily and removed after compression.</li>
          <li>No ads and we do not sell personal information.</li>
          <li>Cookies (if any) are used only for basic site functionality.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-medium">Analytics</h2>
        <p className="mt-2 text-muted-foreground">
          We may use analytics to learn how people use Tingy so we can improve
          the product. Analytics data is aggregated and used only to improve
          the service; it is not used to identify or sell individual users.
        </p>
      </section>
    </main>
  );
}
