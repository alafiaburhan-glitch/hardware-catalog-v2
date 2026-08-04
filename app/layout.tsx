import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Suspense } from "react";

import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import NavigationProgress from "@/components/NavigationProgress";
import JourneyAnalytics from "@/components/JourneyAnalytics";
import { Toaster } from "sonner";
import { QuoteProvider } from "@/components/QuoteProvider";
import { jsonLd, SITE_NAME, SITE_URL } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Noor Agencies | Industrial Hardware Supplier in Coimbatore",
    template: "%s | Noor Agencies",
  },

  description:
    "Noor Agencies supplies emery paper, emery rolls, Loctite adhesives, tarpaulins, shade nets, ropes, hoses, safety products and industrial hardware in Coimbatore.",

  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Industrial hardware and tools",
  keywords: ["industrial hardware supplier Coimbatore", "hardware shop Coimbatore", "industrial tools Coimbatore", "industrial supplies Tamil Nadu"],
  alternates: { canonical: "/" },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },

  openGraph: {
    title: "Noor Agencies | Industrial Hardware Supplier in Coimbatore",
    description:
      "Emery paper, Loctite adhesives, tarpaulins, shade nets and industrial hardware supplier in Coimbatore.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Noor Agencies industrial hardware supplier in Coimbatore" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "Noor Agencies | Industrial Hardware Supplier in Coimbatore",
    description: "Industrial hardware, tools and supplies for businesses in Coimbatore and across India.",
    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const googleTagId = googleAdsId || "G-PE619MSD5B";
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["HardwareStore", "LocalBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    telephone: ["+91-9626652275", "+91-7708914004"],
    email: "nooragenciescbe@gmail.com",
    description: "Industrial hardware, tools, lifting equipment, safety products, hoses, ladders, adhesives and sealants supplier in Coimbatore.",
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    address: { "@type": "PostalAddress", streetAddress: "No. 21, Dr. Nanjappa Road", addressLocality: "Coimbatore", addressRegion: "Tamil Nadu", postalCode: "641018", addressCountry: "IN" },
    geo: { "@type": "GeoCoordinates", latitude: 11.0061266, longitude: 76.9667571 },
    areaServed: [{ "@type": "City", name: "Coimbatore" }, { "@type": "Country", name: "India" }],
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "19:00" }],
  };

  return (
    <html
      lang="en"
      style={{ overflowX: "hidden" }}
    >
      <head>
        {/* Google Analytics */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('js', new Date());

            gtag('config', 'G-PE619MSD5B', {
              cookie_flags: 'SameSite=None;Secure',
              send_page_view: false
            });
            ${googleAdsId ? `gtag('config', '${googleAdsId}');` : ""}

            const originalGtag = window.gtag;

            window.gtag = function() {
              const args = Array.from(arguments);

              if (
                args[0] === 'event' &&
                args[1] === 'page_view' &&
                window.location.pathname.startsWith('/admin')
              ) {
                return;
              }

              originalGtag.apply(this, arguments);
            };
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(businessSchema) }}
        />
      </head>

      <body className="min-h-screen bg-white overflow-x-hidden">
        <Suspense fallback={null}>
          <JourneyAnalytics />
        </Suspense>
        <QuoteProvider>
          <NavigationProgress />
          <Navbar />

          <main>{children}</main>

          <Footer />

          <FloatingWhatsApp />
        </QuoteProvider>

        <Toaster
          position="bottom-right"
          richColors
          toastOptions={{
            style: {
              borderRadius: "14px",
              fontFamily: "var(--font-geist-sans)",
            },
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
