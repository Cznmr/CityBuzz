import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CityBuzzAIAssistant from "@/components/ai/CityBuzzAIAssistant";
import { AuthProvider } from "@/context/AuthContext";
import { SavedEventsProvider } from "@/context/SavedEventsContext";
import { RoleProvider } from "@/context/RoleContext";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "CityBuzz | Discover Events & Activities in Nizamabad",
    template: "%s | CityBuzz Nizamabad",
  },
  description:
    "Discover events, workshops, sports, cultural programs and activities happening in Nizamabad with CityBuzz — your local city platform.",
  keywords: [
    "Nizamabad events",
    "things to do in Nizamabad",
    "Nizamabad activities",
    "cultural events Nizamabad",
    "workshops Nizamabad",
    "sports events Nizamabad",
    "CityBuzz",
    "Telangana events",
    "local events",
  ],
  authors: [{ name: "CityBuzz", url: "https://citybuzz.in" }],
  creator: "CityBuzz",
  publisher: "CityBuzz",
  metadataBase: new URL("https://citybuzz.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://citybuzz.in",
    siteName: "CityBuzz",
    title: "CityBuzz | Discover Events & Activities in Nizamabad",
    description:
      "Discover events, workshops, sports, cultural programs and activities happening in Nizamabad with CityBuzz.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CityBuzz — Discover Everything Happening Around Your City",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CityBuzz | Discover Events in Nizamabad",
    description:
      "Find events, workshops, sports, cultural programs and activities in Nizamabad.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
};

// ─── Root Layout ─────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "CityBuzz",
              url: "https://citybuzz.in",
              description:
                "Discover events, activities and experiences in Nizamabad",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://citybuzz.in/events?q={search_term_string}",
                "query-input":
                  "required name=search_term_string",
              },
            }),
          }}
        />
      </head>

      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <RoleProvider>
            <SavedEventsProvider>
              <Navbar />

              <main className="flex-1" id="main-content">
                {children}
              </main>

              <Footer />
              <CityBuzzAIAssistant />
            </SavedEventsProvider>
          </RoleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}