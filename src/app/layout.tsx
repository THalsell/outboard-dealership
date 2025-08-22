import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import EnhancedHeader from "@/components/layout/EnhancedHeader";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext"; // ADDED BACK
import { CartProvider } from "@/contexts/CartContext";
import { FilterProvider } from "@/contexts/FilterContext";
import { PartsProvider } from "@/contexts/PartsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Outboard Motors Dealership",
    default: "Outboard Motors Dealership - Premium Marine Motors & Service"
  },
  description: "Your trusted source for new and used outboard motors. Yamaha, Mercury, Honda, Suzuki authorized dealer. Expert service, parts, and financing available.",
  keywords: ["outboard motors", "marine engines", "boat motors", "Yamaha", "Mercury", "Honda", "Suzuki", "boat parts", "marine service", "boat repair", "outboard service", "marine dealer"],
  authors: [{ name: "Outboard Motors Dealership" }],
  creator: "Outboard Motors Dealership",
  publisher: "Outboard Motors Dealership",
  metadataBase: new URL("https://outboard-dealership.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://outboard-dealership.com",
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
    <html lang="en">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <AuthProvider>
          <CartProvider>
            <FilterProvider>
              <PartsProvider>
                <EnhancedHeader />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </PartsProvider>
            </FilterProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}