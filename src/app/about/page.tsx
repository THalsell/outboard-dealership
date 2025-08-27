import Link from 'next/link';

export const metadata = {
  title: 'About Us | Clay Powersports',
  description: 'Learn about Clay Powersports - your trusted outboard motor dealership in Celina, TN.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-charcoal mb-8">About Clay Powersports</h1>
        
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-deep-blue mb-4">Our Story</h2>
            <p className="text-charcoal mb-4">
              For over 20 years, Clay Powersports has been the premier destination for outboard motors
              in Middle Tennessee. What started as a small family business has grown into the region's
              most trusted marine dealership.
            </p>
            <p className="text-charcoal mb-4">
              We pride ourselves on offering the highest quality outboard motors, exceptional customer
              service, and expert maintenance to keep you on the water.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-deep-blue mb-4">Our Mission</h2>
            <p className="text-charcoal mb-4">
              To provide boaters with reliable, high-performance outboard motors and unmatched service,
              ensuring every customer enjoys their time on the water with confidence and peace of mind.
            </p>
            <ul className="space-y-2 text-charcoal">
              <li>✓ Authorized dealer for top brands</li>
              <li>✓ Factory-trained technicians</li>
              <li>✓ Competitive pricing</li>
              <li>✓ Full-service maintenance center</li>
            </ul>
          </div>
        </div>

        <div className="bg-light-gray rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-deep-blue mb-6">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-semibold text-charcoal mb-2">Award Winning Service</h3>
              <p className="text-charcoal">Recognized as Tennessee's top marine dealership 3 years running</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="font-semibold text-charcoal mb-2">Expert Technicians</h3>
              <p className="text-charcoal">Factory-certified technicians for all major brands</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-semibold text-charcoal mb-2">Best Price Guarantee</h3>
              <p className="text-charcoal">We'll match any competitor's advertised price</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-deep-blue mb-4">Visit Our Showroom</h2>
          <p className="text-charcoal mb-6">
            615 West Lake Avenue, Celina, TN 38551
          </p>
          <Link
            href="/inventory"
            className="inline-block bg-deep-blue text-white px-8 py-3 rounded-lg hover:bg-teal transition-colors"
          >
            Browse Our Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}