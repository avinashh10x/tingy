import { Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <div className="w-full py-12 text-center animate-fade-in">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6 animate-scale-in">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium">Free Forever • No Sign Up Required</span>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold mb-2 text-foreground leading-10">
        Compress Images
        <br />
        <span className="bg-gradient-accent bg-clip-text text-transparent">
          Without Losing Quality
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Free online tool to compress JPG, PNG, WEBP, and AVIF images up to 20MB.
        Smart presets and powerful controls for perfect results every time.
      </p>
    </div>
  );
};
