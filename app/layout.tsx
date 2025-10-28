import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ThemeScript } from '@/components/theme-script';
import { StructuredData } from '@/components/StructuredData';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL('https://tingy.vercel.app'), // Update with your actual domain
  title: {
    default: "Tingy - Free Online Image Compressor | Reduce Image Size Without Losing Quality",
    template: "%s | Tingy"
  },
  description: "Compress JPG, PNG, WEBP, and AVIF images up to 20MB for free. Smart image optimization with no quality loss. No signup required, completely free forever.",
  keywords: [
    "image compressor",
    "compress images online",
    "reduce image size",
    "optimize images",
    "image optimization tool",
    "free image compressor",
    "compress jpg",
    "compress png",
    "compress webp",
    "image converter",
    "resize images",
    "reduce file size",
    "lossless compression",
    "photo compressor",
    "online image tool"
  ],
  authors: [{ name: "Tingy", url: "https://tingy.vercel.app" }],
  creator: "Tingy",
  publisher: "Tingy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tingy.vercel.app",
    title: "Tingy - Free Online Image Compressor",
    description: "Compress images up to 20MB without losing quality. Fast, secure, and completely free. Supports JPG, PNG, WEBP, and AVIF formats.",
    siteName: "Tingy",
    images: [
      {
        url: "/og-image.png", // You'll need to create this
        width: 1200,
        height: 630,
        alt: "Tingy - Smart Image Compressor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tingy - Free Online Image Compressor",
    description: "Compress images up to 20MB without losing quality. Fast, secure, and completely free.",
    images: ["/og-image.png"],
    creator: "@tingy", // Update with your Twitter handle
  },
  alternates: {
    canonical: "https://tingy.vercel.app",
  },
  category: "technology",
  verification: {
    google: '11fc782f0c5ff31a', // ← Extract code from filename: google[THIS_PART].html
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
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
      </body>
    </html>
  );
}
