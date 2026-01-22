"use client";

import { motion } from "framer-motion";
import {
  Upload,
  Settings2,
  Download,
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Upload,
    title: "Upload Images",
    description: "Drag & drop JPG, PNG, WEBP, or AVIF files. No upload limits.",
    color: "bg-blue-500",
    gradient: "from-blue-500/20 to-blue-500/0",
  },
  {
    icon: Settings2,
    title: "Smart Optimize",
    description:
      "We automatically apply the best compression settings for your format.",
    color: "bg-purple-500",
    gradient: "from-purple-500/20 to-purple-500/0",
  },
  {
    icon: Sparkles,
    title: "Instant Magic",
    description:
      "Algorithms crunch pixels in milliseconds inside your browser.",
    color: "bg-amber-500",
    gradient: "from-amber-500/20 to-amber-500/0",
  },
  {
    icon: Download,
    title: "Download & Joy",
    description: "Save space instantly. Your privacy stays 100% intact.",
    color: "bg-green-500",
    gradient: "from-green-500/20 to-green-500/0",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full mx-auto max-w-5xl py-24 px-4 overflow-hidden">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6"
        >
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">The Process</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight"
        >
          From Heavy to Light in Seconds
        </motion.h2>
      </div>

      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border/50 -translate-x-1/2 hidden md:block rounded-full" />

        {/* Connecting Line (Mobile) */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-border/50 hidden max-md:block rounded-full" />

        <div className="space-y-12 md:space-y-24 relative">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "flex flex-col md:flex-row items-start md:items-center gap-8 relative",
                  isEven ? "md:flex-row" : "md:flex-row-reverse",
                )}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background border-4 border-primary z-10 shrink-0 shadow-[0_0_0_4px_rgba(0,0,0,0.1)]">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>

                {/* Content Card */}
                <div
                  className={cn(
                    "w-full md:w-[calc(50%-3rem)] pl-24 md:pl-0",
                    isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12",
                  )}
                >
                  <div
                    className={cn(
                      "group relative p-6 md:p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/20 transition-all duration-300 hover:shadow-xl overflow-hidden",
                      !isEven && "md:text-left",
                    )}
                  >
                    {/* Hover Gradient Effect */}
                    <div
                      className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                        step.gradient,
                      )}
                    />

                    <div
                      className={cn(
                        "relative z-10 flex flex-col gap-4",
                        isEven ? "md:items-end" : "md:items-start",
                      )}
                    >
                      <div
                        className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg",
                          step.color,
                        )}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-2 text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for the other side (Desktop only) */}
                <div className="hidden md:block w-[calc(50%-3rem)]" />
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-24"
      >
        <div className="inline-flex items-center gap-2 text-muted-foreground bg-secondary/30 px-6 py-3 rounded-full border border-border/50 backdrop-blur-sm">
          <ShieldCheck className="w-5 h-5 text-green-500" />
          <span>Your images never leave your browser. 100% Private.</span>
        </div>
      </motion.div>
    </section>
  );
}
