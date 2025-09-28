import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
// ...existing code...
import './globals.css'
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Sora } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SectionsToggle } from "@/components/controls/sections-toggle";

const sora = Sora({ subsets: ["latin"], variable: "--font-geist-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: 'AstroKalki - Cosmic Services Reimagined | Astrology, Tarot, Numerology & Palmistry',
  description: 'Transform your life with AstroKalki\'s mystical guidance. From ₹100 Quick Cosmic Clarity to complete DIAMOND transformation packages. Expert astrology, tarot, numerology, and palmistry readings with practical, jargon-free guidance.',
  keywords: 'astrology, tarot reading, numerology, palmistry, birth chart, love compatibility, career guidance, spiritual guidance, cosmic guidance, life coaching, mystical services',
  authors: [{ name: 'AstroKalki' }],
  creator: 'AstroKalki',
  publisher: 'AstroKalki',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://astrokalki.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AstroKalki - Cosmic Services Reimagined',
    description: 'Transform your life with expert astrology, tarot, numerology, and palmistry guidance. From ₹100 quick clarity to complete life transformation.',
    url: 'https://astrokalki.com',
    siteName: 'AstroKalki',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AstroKalki - Cosmic Services Reimagined',
    description: 'Transform your life with expert astrology, tarot, numerology, and palmistry guidance.',
    creator: '@AstroKalki',
  },
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
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // WhatsApp CTA link for sticky header + floating button
  const finalWaText = encodeURIComponent("Hi! I'm ready to book a session with AstroKalki.")
  const finalWaLink = `https://wa.me/?text=${finalWaText}`

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${sora.variable} ${playfair.variable} antialiased relative font-sans`}>
        {/* Site-wide cosmic background */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b1020] via-[#151a36] to-[#1a0f29]" />
          {/* soft radial nebulas */}
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-3xl" />
          {/* starfield */}
          <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <defs>
              <radialGradient id="g" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white"/>
                <stop offset="100%" stopColor="transparent"/>
              </radialGradient>
            </defs>
            {Array.from({ length: 120 }).map((_, i) => (
              <circle
                key={i}
                cx={(((i * 37) % 100)).toFixed(2)}
                cy={(((i * 53) % 100)).toFixed(2)}
                r={((((i * 29) % 35) / 100) + 0.05).toFixed(2)}
                fill="url(#g)"
              />
            ))}
          </svg>
          {/* subtle vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#00000040_100%)]" />
        </div>

        {/* Sticky Top Bar */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
            <a href="#" className="font-semibold text-white">AstroKalki™</a>
            <div className="hidden sm:flex items-center gap-2">
              {/* Sections toggle */}
              <SectionsToggle />
              {/* Theme toggle */}
              <ThemeToggle />
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <a href="#packages">See Packages</a>
              </Button>
              <Button asChild className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-[0_0_30px_0_rgba(16,185,129,0.25)] ring-1 ring-emerald-300/30">
                <a href={finalWaLink} target="_blank" rel="noopener noreferrer">Book on WhatsApp</a>
              </Button>
            </div>
          </div>
        </header>

        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        {/* Floating WhatsApp Button (mobile) */}
        <div className="fixed bottom-5 right-5 sm:hidden z-50">
          <Button asChild className="rounded-full shadow-lg shadow-emerald-700/30 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 h-12 ring-1 ring-emerald-300/30">
            <a href={finalWaLink} target="_blank" rel="noopener noreferrer" aria-label="Book on WhatsApp">
              <span className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp</span>
              </span>
            </a>
          </Button>
        </div>
  {/* ...existing code... */}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}