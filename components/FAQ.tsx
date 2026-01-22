"use client";

import { useState } from "react";
import { MessageCircleQuestion, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Is Tingy completely free?",
    answer:
      "Yes, Tingy is 100% free forever. No hidden fees, no subscriptions, no paywalls. You can compress unlimited images without any restrictions.",
  },
  {
    question: "What image formats does Tingy support?",
    answer:
      "Tingy supports JPG, PNG, WEBP, and AVIF image formats. You can compress images up to 20MB in size with smart presets optimized for different use cases.",
  },
  {
    question: "Does Tingy store my images?",
    answer:
      "No, Tingy does not store your images. All compression happens securely in your browser (client-side) and your images are never uploaded to any server. Your privacy is our priority.",
  },
  {
    question: "How does Tingy compare to TinyPNG?",
    answer:
      "Tingy offers similar high-quality compression to TinyPNG but with no upload limits, complete privacy (client-side processing), support for more formats (including WEBP and AVIF), and advanced features like batch compression and smart presets - all completely free.",
  },
  {
    question: "Can I compress images without losing quality?",
    answer:
      "Yes! Tingy uses advanced compression algorithms to reduce file size while maintaining visual quality. You can choose from smart presets or adjust quality settings manually to achieve the perfect balance between file size and image quality.",
  },
  {
    question: "How much can I reduce image file size?",
    answer:
      "On average, you can reduce image file size by 60-80% without noticeable quality loss. The exact compression depends on the original image, format, and quality settings you choose.",
  },
  {
    question: "Do I need to sign up or create an account?",
    answer:
      "No signup required! Tingy works instantly in your browser without any registration, login, or account creation. Just upload your images and start compressing.",
  },
  {
    question: "Can I compress multiple images at once?",
    answer:
      "Yes! Tingy supports batch compression, allowing you to compress multiple images simultaneously. Simply upload multiple files and download them all as a convenient ZIP archive.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full mx-auto max-w-4xl py-16 px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6">
          <MessageCircleQuestion className="w-4 h-4" />
          <span className="text-sm font-medium">FAQ</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about Tingy's free image compression
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={cn(
                "border rounded-2xl overflow-hidden transition-all duration-300",
                isOpen
                  ? "bg-card border-primary/20 shadow-lg shadow-primary/5"
                  : "bg-card/50 border-border hover:border-primary/20 hover:bg-card",
              )}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex items-center justify-between w-full p-6 text-left group"
              >
                <span
                  className={cn(
                    "font-semibold text-lg pr-8 transition-colors duration-200",
                    isOpen
                      ? "text-primary"
                      : "text-foreground group-hover:text-primary/80",
                  )}
                >
                  {faq.question}
                </span>
                <div
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                    isOpen
                      ? "bg-primary text-primary-foreground rotate-180"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                  )}
                >
                  {isOpen ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>

              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground leading-relaxed text-base border-t border-border/50 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
