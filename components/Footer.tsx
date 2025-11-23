import React from "react";

function Footer() {
  return (
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
          All processing happens securely on our servers. Your images are never
          stored.
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} made by{" "}
          <a href="https://github.com/avinashh10x" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline">
            Avinash Kumar
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
