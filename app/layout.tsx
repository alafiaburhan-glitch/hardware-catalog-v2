import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noor Agencies",
  description: "Industrial Hardware Solutions",
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
        {/* Google tag (gtag.js) — excludes /admin/* paths */}
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

            // Override page_view tracking to skip /admin pages
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
      </head>
      <body className="min-h-screen bg-white overflow-x-hidden">
        <Navbar />
        <main>
          {children}
        </main>
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