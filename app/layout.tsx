import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ThemeScript } from "@/components/theme-script";
import { StructuredData } from "@/components/StructuredData";
import "./globals.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Analytics } from "@vercel/analytics/next";

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
      "Tingy - Free Online Image Compressor | Compress JPG, PNG, WEBP & AVIF",
    template: "%s | Tingy - Smart Image Compressor",
  },
  description:
    "Compress JPG, PNG, WEBP, and AVIF images up to 20MB instantly. Free online image optimizer with smart presets, no signup required. Reduce file size by up to 80% without losing quality.",
  keywords: [
    "image compressor",
    "online image compressor",
    "free online image compressor",
    "best online image compressor",
    "smart image compressor",
    "compress images online",
    "reduce image size",
    "optimize images",
    "image optimization tool",
    "free image compressor",
    "compress jpg online",
    "compress png online",
    "compress webp",
    "compress avif",
    "image converter",
    "resize images online",
    "reduce file size",
    "lossless compression",
    "lossy compression",
    "photo compressor",
    "online image tool",
    "tinypng alternative",
    "image optimizer",
    "web image compressor",
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
    title: "Tingy - Free Online Image Compressor | Reduce Image Size by 80%",
    description:
      "Compress JPG, PNG, WEBP & AVIF images up to 20MB for free. Smart presets for web, social media & email. No signup, no ads, completely free forever.",
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
    title: "Tingy - Free Online Image Compressor",
    description:
      "Compress images up to 20MB without losing quality. Fast, secure, and completely free. Supports JPG, PNG, WEBP, and AVIF formats.",
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
        <ThemeProvider defaultTheme="light" storageKey="tingy-theme">
          {children}
          <ThemeSwitcher />
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            duration={4000}
          />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
