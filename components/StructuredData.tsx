export function StructuredData() {
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tingy - Free Image Compressor",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Modern browser recommended.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    description:
      "Free online image compression tool. Compress JPG, PNG, WEBP, and AVIF images up to 20MB without losing quality. Fast, secure, and privacy-focused image optimizer with smart presets.",
    url: "https://tingy.byavi.in",
    featureList: [
      "Compress JPG, PNG, WEBP, and AVIF images",
      "Support for images up to 20MB",
      "Lossless and lossy compression options",
      "Smart presets for web, social media, email, and print",
      "Batch image compression",
      "No signup or registration required",
      "Completely free with no limits",
      "Privacy-focused - client-side processing",
      "No file storage or tracking",
      "Download compressed images instantly",
    ],
    screenshot: "https://tingy.byavi.in/og-image.png",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Person",
      name: "Avinash Kumar",
      url: "https://tingy.byavi.in/about",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tingy",
    url: "https://tingy.byavi.in",
    logo: "https://tingy.byavi.in/og-image.png",
    description: "Free, fast, and secure online image compression tool",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Avinash Kumar",
    },
    sameAs: ["https://github.com/avinashh10x/tingy"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Tingy completely free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Tingy is 100% free forever. No hidden fees, no subscriptions, no paywalls. You can compress unlimited images without any restrictions.",
        },
      },
      {
        "@type": "Question",
        name: "What image formats does Tingy support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tingy supports JPG, PNG, WEBP, and AVIF image formats. You can compress images up to 20MB in size.",
        },
      },
      {
        "@type": "Question",
        name: "Does Tingy store my images?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, Tingy does not store your images. All compression happens securely and your images are never saved, indexed, or kept on any server. Your privacy is our priority.",
        },
      },
      {
        "@type": "Question",
        name: "How does Tingy compare to TinyPNG?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tingy offers similar high-quality compression to TinyPNG but with no upload limits, complete privacy (client-side processing), support for more formats (including WEBP and AVIF), and advanced features like batch compression and smart presets - all completely free.",
        },
      },
      {
        "@type": "Question",
        name: "Can I compress images without losing quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Tingy uses advanced compression algorithms to reduce file size while maintaining visual quality. You can choose from smart presets or adjust quality settings manually to achieve the perfect balance between file size and image quality.",
        },
      },
    ],
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Tingy",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
    </>
  );
}
