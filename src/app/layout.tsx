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
  variable: "--font-bebas-neue",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Outboard Motors Dealership",
    default: "Authorized Yamaha, Honda, Mercury Outboard Motors Dealer | Celina, TN",
  },
  description:
    "Authorized dealer for Yamaha, Honda, Mercury, Suzuki, Tohatsu & Freedom outboard motors in Celina, TN. New engines, parts, service & repairs.",
  keywords: getAllSearchQueries().slice(0, 200), // Include comprehensive AI keywords
  authors: [{ name: "Outboard Motors Dealership" }],
  creator: "Outboard Motors Dealership",
  publisher: "Outboard Motors Dealership",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://outboardmotorsales.com"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://outboardmotorsales.com",
    siteName: "Outboard Motors Dealership",
    title: "Outboard Motors Dealership - Premium Marine Motors & Service",
    description:
      "Your trusted source for new and used outboard motors. Yamaha, Mercury, Honda, Suzuki authorized dealer. Expert service, parts, and financing available.",
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
    description:
      "Your trusted source for new and used outboard motors. Expert service, parts, and financing available.",
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
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/apple-icon',
    other: [
      {
        rel: 'icon',
        url: '/favicon-32x32.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/favicon-32x32.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon" />

        {/* Klaviyo Integration */}
        <script
          async
          type="text/javascript"
          src="https://static.klaviyo.com/onsite/js/S4ipJR/klaviyo.js?company_id=S4ipJR"
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              !function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();
            `
          }}
        />
      </head>
      <body
        className={`${bebasNeue.variable} ${roboto.variable} antialiased flex flex-col min-h-screen bg-light-gray text-text-blue font-body overflow-x-hidden`}
        suppressHydrationWarning={true}
        style={{
          fontSize: "16px",
          fontWeight: "400",
          lineHeight: "1.6",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <AppProviders>
          <TopBanner />
          <EnhancedHeader />

          <main className="overflow-x-hidden pt-[156px] sm:pt-[104px]">
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
