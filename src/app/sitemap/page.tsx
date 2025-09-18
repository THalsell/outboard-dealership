import Link from 'next/link';

export const metadata = {
  title: 'Sitemap',
  description: 'Browse all pages on Outboard Motor Sales',
};

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-deep-blue mb-8">Sitemap</h1>

        <div className="grid gap-8">
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Main Pages</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-deep-blue hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-deep-blue hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-deep-blue hover:underline">
                  Compare Motors
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Inventory</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/inventory" className="text-deep-blue hover:underline">
                  All Motors
                </Link>
              </li>
              <li>
                <Link href="/inventory?condition=new" className="text-deep-blue hover:underline">
                  New Motors
                </Link>
              </li>
              <li>
                <Link href="/inventory?condition=used" className="text-deep-blue hover:underline">
                  Used Motors
                </Link>
              </li>
              <li>
                <Link href="/inventory?status=sale" className="text-deep-blue hover:underline">
                  On Sale
                </Link>
              </li>
              <li>
                <Link href="/inventory?status=overstock" className="text-deep-blue hover:underline">
                  Overstock
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Shop by Brand</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/inventory?brand=yamaha" className="text-deep-blue hover:underline">
                  Yamaha
                </Link>
              </li>
              <li>
                <Link href="/inventory?brand=mercury" className="text-deep-blue hover:underline">
                  Mercury
                </Link>
              </li>
              <li>
                <Link href="/inventory?brand=honda" className="text-deep-blue hover:underline">
                  Honda
                </Link>
              </li>
              <li>
                <Link href="/inventory?brand=suzuki" className="text-deep-blue hover:underline">
                  Suzuki
                </Link>
              </li>
              <li>
                <Link href="/inventory?brand=tohatsu" className="text-deep-blue hover:underline">
                  Tohatsu
                </Link>
              </li>
              <li>
                <Link href="/inventory?brand=freedom" className="text-deep-blue hover:underline">
                  Freedom
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Parts & Accessories</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/parts" className="text-deep-blue hover:underline">
                  Parts & Accessories
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Financing</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/financing/application" className="text-deep-blue hover:underline">
                  Apply for Financing
                </Link>
              </li>
              <li>
                <Link href="/financing/offers" className="text-deep-blue hover:underline">
                  Special Offers
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Resources</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/learn/guides" className="text-deep-blue hover:underline">
                  Buying Guides
                </Link>
              </li>
              <li>
                <Link href="/learn/faqs" className="text-deep-blue hover:underline">
                  FAQs
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}