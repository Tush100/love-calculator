import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tush Love Calculator - Test Your Love Compatibility",
  description:
    "Discover your love compatibility with our fun and romantic love calculator. Test your relationship compatibility, get daily love horoscopes, take love language quizzes, and explore couple challenges. Free online love compatibility test.",
  keywords: [
    "love calculator",
    "love compatibility",
    "relationship test",
    "love percentage",
    "compatibility test",
    "love horoscope",
    "love language quiz",
    "couple challenges",
    "relationship compatibility",
    "romantic calculator",
    "love match",
    "soulmate test",
  ],
  authors: [{ name: "Tush Love Calculator" }],
  creator: "Tush Love Calculator",
  publisher: "Tush Love Calculator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tush-love-calculator.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tush Love Calculator - Test Your Love Compatibility",
    description:
      "Discover your love compatibility with our fun and romantic love calculator. Test your relationship compatibility and explore romantic features.",
    url: "https://tush-love-calculator.vercel.app",
    siteName: "Tush Love Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tush Love Calculator - Test Your Love Compatibility",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tush Love Calculator - Test Your Love Compatibility",
    description:
      "Discover your love compatibility with our fun and romantic love calculator. Test your relationship compatibility and explore romantic features.",
    images: ["/og-image.png"],
    creator: "@tushlovecalc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#ec4899" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Love Calculator" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ec4899" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
