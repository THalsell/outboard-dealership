import Image from 'next/image';

export default function WhyChooseUs() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <h2 className="text-3xl md:text-4xl font-bold whitespace-nowrap">Why Choose Outboard Motor Sale</h2>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
        </div>
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
              <ul className="space-y-24">
                <li>
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="w-20 md:w-32 lg:w-40 h-px bg-white/30"></div>
                    <h3 className="text-2xl md:text-4xl lg:text-6xl font-bold">Authorized Dealer</h3>
                    <div className="w-20 md:w-32 lg:w-40 h-px bg-white/30"></div>
                  </div>
                  <p className="text-sm md:text-base lg:text-xl font-light">Official dealer for all major brands with full warranty support</p>
                </li>
                <li>
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="w-20 md:w-32 lg:w-40 h-px bg-white/30"></div>
                    <h3 className="text-2xl md:text-4xl lg:text-6xl font-bold">Large Inventory</h3>
                    <div className="w-20 md:w-32 lg:w-40 h-px bg-white/30"></div>
                  </div>
                  <p className="text-sm md:text-base lg:text-xl font-light">Wide selection of new and used motors always in stock</p>
                </li>
                <li>
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="w-20 md:w-32 lg:w-40 h-px bg-white/30"></div>
                    <h3 className="text-2xl md:text-4xl lg:text-6xl font-bold">Best Price Guarantee</h3>
                    <div className="w-20 md:w-32 lg:w-40 h-px bg-white/30"></div>
                  </div>
                  <p className="text-sm md:text-base lg:text-xl font-light">We match any competitor&#39;s price on identical products</p>
                </li>
                <li>
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="w-20 md:w-32 lg:w-40 h-px bg-white/30"></div>
                    <h3 className="text-2xl md:text-4xl lg:text-6xl font-bold">Free Shipping</h3>
                    <div className="w-20 md:w-32 lg:w-40 h-px bg-white/30"></div>
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