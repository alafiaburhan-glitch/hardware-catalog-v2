import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import "./globals.css";

import Navbar from "@/components/Navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nooragencies.in"),

  title: {
    default: "Noor Agencies | Industrial Hardware Supplier in Coimbatore",
    template: "%s | Noor Agencies",
  },

  description:
    "Noor Agencies supplies emery paper, emery rolls, Loctite adhesives, tarpaulins, shade nets, ropes, hoses, safety products and industrial hardware in Coimbatore.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Noor Agencies | Industrial Hardware Supplier in Coimbatore",
    description:
      "Emery paper, Loctite adhesives, tarpaulins, shade nets and industrial hardware supplier in Coimbatore.",
    url: "https://www.nooragencies.in",
    siteName: "Noor Agencies",
    locale: "en_IN",
    type: "website",
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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ overflowX: "hidden" }}
    >
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PE619MSD5B"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('js', new Date());

            gtag('config', 'G-PE619MSD5B', {
              cookie_flags: 'SameSite=None;Secure',
              page_path: window.location.pathname,
              send_page_view: !window.location.pathname.startsWith('/admin')
            });

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

        {/* Schema.org */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HardwareStore",

              name: "Noor Agencies",

              url: "https://www.nooragencies.in",

              logo: "https://www.nooragencies.in/logo.png",

              image: "https://www.nooragencies.in/logo.png",

              telephone: "+91-9626652275",

              email: "nooragenciescbe@gmail.com",

              description:
                "Industrial hardware supplier in Coimbatore dealing in ropes, tarpaulins, lifting equipment, safety products, hoses, ladders, industrial adhesives, sealants and hardware supplies.",

              address: {
                "@type": "PostalAddress",
                addressLocality: "Coimbatore",
                addressRegion: "Tamil Nadu",
                postalCode: "641018",
                addressCountry: "IN",
              },

              areaServed: "India",

              sameAs: [],
            }),
          }}
        />
      </head>

      <body className="min-h-screen bg-white overflow-x-hidden">
        <Navbar />

        <main>{children}</main>

        <FloatingWhatsApp />

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
      </body>
    </html>
  );
}
