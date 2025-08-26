import Image from 'next/image';

export default function WhyChooseUs() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Our Dealership?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-deep-blue text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Authorized Dealer</h3>
                  <p className="text-charcoal opacity-80">Official dealer for all major brands with full warranty support.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-deep-blue text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Expert Service Team</h3>
                  <p className="text-charcoal opacity-80">Factory-trained technicians ensure your motor runs perfectly.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-deep-blue text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
                  <p className="text-charcoal opacity-80">We match any competitor&apos;s price on identical products.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/yamaha.jpg"
              alt="Our dealership"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}