import React from "react";
import Link from "next/link";

export default function OpenSourcePage() {
  return (
    <main className="max-w-7xl min-h-screen mx-auto py-12 px-8">
      <h1 className="text-4xl font-bold mb-10">Open Source & Contribute</h1>

      <section className="mb-6">
        <h2 className="text-lg font-medium">Open source statement</h2>
        <p className="mt-2 text-muted-foreground">
          Tingy is open-source to encourage transparency, learning, and
          contributions. You can review the code, suggest improvements, or
          submit changes via  <Link href="https://github.com/avinashh10x/tingy" className="underline hover:text-primary"> GitHub. </Link>
          
        </p>
      </section>


      <section className="mb-6">
        <h2 className="text-lg font-medium">How you can help</h2>
        <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
          <li>Improve the UI and accessibility.</li>
          <li>Enhance performance and loading times.</li>
          <li>Contribute code or features.</li>
          <li>Add support for more image formats or optimizations.</li>
          <li>Report bugs or performance issues.</li>
          <li>Improve documentation and examples.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-medium">Branding note</h2>
        <p className="mt-2 text-muted-foreground">
          The code is open-source, but the Tingy name and branding are not
          licensed for reuse without permission.
        </p>
      </section>
    </main>
  );
}
