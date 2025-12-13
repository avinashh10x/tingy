"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  text: string;
  className?: string;
};

export default function HoverSwapText({ text, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const letters1 = gsap.utils.toArray(".hs-text-1 span") as HTMLElement[];
      const letters2 = gsap.utils.toArray(".hs-text-2 span") as HTMLElement[];

      // Initial state (important)
      gsap.set(letters2, { yPercent: 150, opacity: 0 });

      tlRef.current = gsap.timeline({ paused: true });

      tlRef.current
        .to(letters1, {
          yPercent: -150,
          opacity: 0,
          //   stagger: 0.03,
          ease: "power1.out",
        })
        .to(
          letters2,
          {
            yPercent: 0,
            opacity: 1,
            // stagger: 0.03,
            ease: "power1.out",
          },
          "<"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (value: string) =>
    value.split("").map((char, i) => (
      <span key={i} className="inline-block will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <div
      ref={containerRef}
      className={`relative inline-block overflow-hidden cursor-pointer
         ${className}`}
      onMouseEnter={() => tlRef.current?.play()}
      onMouseLeave={() => tlRef.current?.reverse()}
    >
      {/* Visible text */}
      <span className="hs-text-1 flex">{splitText(text)}</span>

      {/* Hidden duplicate text */}
      <span className="hs-text-2 absolute inset-0 flex">{splitText(text)}</span>
    </div>
  );
}
