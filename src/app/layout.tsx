import type { Metadata } from "next";
import { Bebas_Neue, Roboto } from "next/font/google";
import "./globals.css";
import TopBanner from "@/components/layout/header/TopBanner";
import EnhancedHeader from "@/components/layout/header/EnhancedHeader";
import Footer from "@/components/layout/footer/Footer";
import AppProviders from "@/providers/AppProviders";
import { getAllSearchQueries } from "@/lib/seo/ai-keywords";

const bebasNeue = Bebas_Neue({ 
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bebas-neue"
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-roboto"
});

export const metadata: Metadata = {
  title: {
    template: "%s | Outboard Motors Dealership",
    default: "Outboard Motors Dealership - Premium Marine Motors & Service"
  },
  description: "Your trusted source for new and used outboard motors. Honda, Yamaha, Mercury, Freedom, Suzuki, Tohatsu authorized dealer. Expert service, parts, and financing available.",
  keywords: getAllSearchQueries().slice(0, 200), // Include comprehensive AI keywords
  authors: [{ name: "Outboard Motors Dealership" }],
  creator: "Outboard Motors Dealership",
  publisher: "Outboard Motors Dealership",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://outboardmotorsales.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://outboardmotorsales.com",
    siteName: "Outboard Motors Dealership",
    title: "Outboard Motors Dealership - Premium Marine Motors & Service",
    description: "Your trusted source for new and used outboard motors. Yamaha, Mercury, Honda, Suzuki authorized dealer. Expert service, parts, and financing available.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Outboard Motors Dealership - Premium Marine Motors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@outboarddealer",
    creator: "@outboarddealer",
    title: "Outboard Motors Dealership - Premium Marine Motors & Service",
    description: "Your trusted source for new and used outboard motors. Expert service, parts, and financing available.",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${bebasNeue.variable} ${roboto.variable} antialiased flex flex-col min-h-screen bg-light-gray text-text-blue font-body overflow-x-hidden`} suppressHydrationWarning={true} style={{ fontSize: '16px', fontWeight: '400', lineHeight: '1.6', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
        <AppProviders>
          <TopBanner />
          <EnhancedHeader />

          <main className="overflow-x-hidden pt-[178px] sm:pt-[130px]">
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}