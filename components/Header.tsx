import Image from "next/image";

export const Header = () => {
  return (
    <header className="w-full border-b border-border bg-card/50 backdrop-blur-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
              <Image
                src="/og-image.png"
                alt="Tingy Logo"
                width={62}
                height={62}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text ">
                Tingy
              </h1>
              <p className="text-xs text-muted-foreground">
                Smart Image Compressor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-accent/10  text-sm font-medium rounded-full">
              100% Free
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
