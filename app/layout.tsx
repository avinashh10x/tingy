import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemedToaster } from "@/components/ThemedToaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ThemeScript } from "@/components/theme-script";
import { StructuredData } from "@/components/StructuredData";
import Footer from "@/components/Footer";
import "./globals.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Analytics } from "@vercel/analytics/next";
import { Separator } from "@/components/ui/separator";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

gsap.registerPlugin(ScrollTrigger);

export const metadata: Metadata = {
  metadataBase: new URL("https://tingy.byavi.in"),
  title: {
    default:
      "Tingy - Free Image Compressor Online | Compress JPG, PNG, WEBP & AVIF | Best TinyPNG Alternative",
    template: "%s | Tingy - Free Image Compression Tool",
  },
  description:
    "Free online image compressor - Compress JPG, PNG, WEBP, and AVIF images up to 20MB instantly. Best TinyPNG alternative with smart presets, batch compression, and no signup required. Reduce file size by up to 80% without losing quality. Privacy-focused image optimizer.",
  keywords: [
    "image compressor",
    "online image compressor",
    "free online image compressor",
    "best online image compressor",
    "free image compression",
    "compress images online free",
    "image optimizer",
    "compress jpg online",
    "compress png online",
    "compress webp online",
    "compress avif online",
    "compress jpeg online",
    "reduce image size",
    "reduce image file size",
    "optimize images online",
    "image optimization tool",
    "photo compressor",
    "picture compressor",
    "bulk image compressor",
    "batch image compression",
    "tinypng alternative",
    "compressor.io alternative",
    "optimizilla alternative",
    "squoosh alternative",
    "image compression without quality loss",
    "lossless image compression",
    "lossy compression",
    "web image optimizer",
    "resize images online",
    "reduce file size",
    "compress images for web",
    "compress images for website",
    "compress images for email",
    "compress photos online",
    "free photo compressor",
    "no signup image compressor",
    "privacy image compressor",
    "client side image compression",
    "fast image compressor",
    "smart image compression",
    "image compression tool",
    "online photo optimizer",
    "compress pictures online free",
  ],
  authors: [{ name: "Avinash Kumar", url: "https://tingy.byavi.in" }],
  creator: "Avinash Kumar",
  publisher: "Tingy",
  applicationName: "Tingy",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tingy.byavi.in",
    title:
      "Tingy - Free Image Compressor | Best TinyPNG Alternative | Compress JPG, PNG, WEBP & AVIF",
    description:
      "Free online image compressor - Compress JPG, PNG, WEBP & AVIF images up to 20MB without losing quality. Best alternative to TinyPNG and Compressor.io with batch compression, smart presets, and complete privacy. No signup, no limits, free forever.",
    siteName: "Tingy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tingy - Smart Image Compressor Tool",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tingy - Free Image Compressor | Best TinyPNG Alternative",
    description:
      "Compress JPG, PNG, WEBP, and AVIF images up to 20MB without losing quality. Best free alternative to TinyPNG - Fast, secure, privacy-focused, and completely free forever. No signup required.",
    images: ["/og-image.png"],
    creator: "@avinashh10x",
    site: "@avinashh10x",
  },
  alternates: {
    canonical: "https://tingy.byavi.in",
  },
  category: "technology",
  classification: "Image Compression Tool",
  verification: {
    google: "11fc782f0c5ff31a",
    // yandex: "your-yandex-code",
    // bing: "your-bing-code",
  },
  icons: {
    icon: [
      { url: "/og-image.png", sizes: "any" },
      { url: "/og-image.png", sizes: "16x16", type: "image/png" },
      { url: "/og-image.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/og-image.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/og-image.svg",
        color: "#3b82f6",
      },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#3b82f6",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <StructuredData />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="dark" storageKey="tingy-theme">
          {children}

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Separator
              orientation="horizontal"
              // className="w-40"
              style={{ width: "100%" }}
            />
          </div>

          <Footer />
          <ThemeSwitcher className="hidden lg:block" />
          <ThemedToaster />
        </ThemeProvider>
        <Analytics />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}
