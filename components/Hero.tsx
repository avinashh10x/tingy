"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gradientTextRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate main heading with cut/reveal effect
    if (headingRef.current) {
      const firstLine = headingRef.current.children[0].querySelector('span');
      timeline.from(firstLine, {
        y: '100%',
        duration: 1,
        ease: "power4.out",
      });
    }

    // Animate gradient text with cut/reveal effect
    if (gradientTextRef.current) {
      const gradientSpan = gradientTextRef.current.querySelector('span');
      timeline.from(
        gradientSpan,
        {
          y: '100%',
          duration: 1,
          ease: "power4.out",
        },
        "-=0.9" // Overlap with previous animation
      );
    }

    // Animate subtitle
    if (subtitleRef.current) {
      timeline.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
        },
        "-=0.4"
      );
    }
  }, []);

  return (
    <div className="w-full py-5 text-center h-fit">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 animate-scale-in">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium">
          Free Forever • No Sign Up Required
        </span>
      </div>

      <h1
        ref={headingRef}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground leading-tight"
      >
        {/* Wrapper with overflow hidden for cut effect */}
        <span className="block mb-2 overflow-hidden p-2">
          <span className="block">Compress Images</span>
        </span>
        
        <span
          ref={gradientTextRef}
          className="block overflow-hidden p-2"
        >
          <span className="block bg-gradient-accent bg-clip-text ">
            Without Losing Quality
          </span>
        </span>
      </h1>

      <p
        ref={subtitleRef}
        className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 px-4"
      >
        Free online tool to compress JPG, PNG, WEBP, and AVIF images up to
        20MB. Smart presets and powerful controls for perfect results every
        time.
      </p>
    </div>
  );
};