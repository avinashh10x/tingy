import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="mt-10  pt-8 pb-4">
      <div className="text-center space-y-4">
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>•</span>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <span>•</span>
          <Link
            href="/privacy"
            className="hover:text-primary transition-colors"
          >
            Privacy
          </Link>
          <span>•</span>
          <Link 
            href="/open-source"
            className="hover:text-primary transition-colors"
          >
            Open Source
          </Link>
          <span>•</span>
          <a
            href="https://github.com/avinashh10x/tingy.git"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors "
          >
            GitHub
          </a>
        </div>

        <p className="text-sm text-muted-foreground">
          All processing happens securely on our servers. Your images are never
          stored.
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} made by{" "}
          <a
            href="https://github.com/avinashh10x"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary underline"
          >
            Avinash Kumar
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
