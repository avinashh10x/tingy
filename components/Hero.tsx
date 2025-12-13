"use client";

import { Sparkles } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gradientTextRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const firstLine =
        headingRef.current?.children[0].querySelector("span");
      const gradientSpan =
        gradientTextRef.current?.querySelector("span");

      if (!firstLine || !gradientSpan || !subtitleRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom top",
          toggleActions: "restart none restart none",
        },
        defaults: { ease: "power4.out" },
      });

      tl.from(firstLine, {
        y: "100%",
        duration: 0.9,
      })
        .from(
          gradientSpan,
          {
            y: "100%",
            duration: 0.9,
          },
          "-=0.7"
        )
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full py-5 text-center h-fit"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium">
          Free Forever • No Sign Up Required
        </span>
      </div>

      <h1
        ref={headingRef}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground leading-tight"
      >
        <span className="block mb-2 overflow-hidden p-2">
          <span className="block">Compress Images</span>
        </span>

        <span
          ref={gradientTextRef}
          className="block overflow-hidden lg:-mt-[2.7vw]"
        >
          <span className="block bg-gradient-accent bg-clip-text p-2">
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
