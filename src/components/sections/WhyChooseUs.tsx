import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';

export default function WhyChooseUs() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Why Choose Outboard Motor Sales"
        />
      </div>
      <div className="relative h-[800px] md:h-[900px] lg:h-[1000px] w-full overflow-hidden">
          <Image
            src="/pic5.jpg"
            alt="Our dealership"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="max-w-4xl text-white text-center">
              <ul className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
                <li>
                  <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2">
                    <div className="hidden sm:block w-12 sm:w-20 md:w-32 lg:w-40 h-px bg-white/30"></div>
                    <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-center px-2">Authorized Dealer</h3>
                    <div className="hidden sm:block w-12 sm:w-20 md:w-32 lg:w-40 h-px bg-white/30"></div>
                  </div>
                  <p className="text-sm md:text-base lg:text-xl font-light">Official dealer for all major brands with full warranty support</p>
                </li>
                <li>
                  <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2">
                    <div className="hidden sm:block w-12 sm:w-20 md:w-32 lg:w-40 h-px bg-white/30"></div>
                    <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-center px-2">Large Inventory</h3>
                    <div className="hidden sm:block w-12 sm:w-20 md:w-32 lg:w-40 h-px bg-white/30"></div>
                  </div>
                  <p className="text-sm md:text-base lg:text-xl font-light">Wide selection of new and used motors always in stock</p>
                </li>
                <li>
                  <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2">
                    <div className="hidden sm:block w-12 sm:w-20 md:w-32 lg:w-40 h-px bg-white/30"></div>
                    <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-center px-2">Best Price Guarantee</h3>
                    <div className="hidden sm:block w-12 sm:w-20 md:w-32 lg:w-40 h-px bg-white/30"></div>
                  </div>
                  <p className="text-sm md:text-base lg:text-xl font-light">We match any competitor&#39;s price on identical products</p>
                </li>
                <li>
                  <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2">
                    <div className="hidden sm:block w-12 sm:w-20 md:w-32 lg:w-40 h-px bg-white/30"></div>
                    <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-center px-2">Free Shipping</h3>
                    <div className="hidden sm:block w-12 sm:w-20 md:w-32 lg:w-40 h-px bg-white/30"></div>
                  </div>
                  <p className="text-sm md:text-base lg:text-xl font-light">Free delivery to the Lower 48 States on every outboard motor</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </section>
  );
}