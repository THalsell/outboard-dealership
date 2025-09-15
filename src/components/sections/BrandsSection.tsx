import Image from 'next/image';
import Link from 'next/link';

export default function BrandsSection() {
  const brands = [
    { name: "Honda", hasLogo: true, logo: "/hondaLogo.png" },
    { name: "Yamaha", hasLogo: true, logo: "/yamahaLogo.png" },
    { name: "Mercury", hasLogo: true, logo: "/Mercurylogo.png" },
    { name: "Freedom", hasLogo: true, logo: "/FreedomLogo.png" },
    { name: "Suzuki", hasLogo: true, logo: "/suzukiLogo.png" },
    { name: "Tohatsu", hasLogo: true, logo: "/TohatsuLogo.png" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-300 via-blue-50 to-blue-400">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
            <div className="hidden sm:block flex-1 h-px bg-gray-300"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center px-2">Authorized Dealer For</h2>
            <div className="hidden sm:block flex-1 h-px bg-gray-300"></div>
          </div>
          <p className="text-lg sm:text-xl text-charcoal opacity-80 px-2">Industry-leading manufacturers</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {brands.map((brand, index) => (
            <Link
              key={index}
              href={`/inventory?brand=${brand.name}`}
              className="flex items-center justify-center h-[100px] w-full cursor-pointer"
            >
              <Image
                src={brand.logo}
                alt={`Shop ${brand.name} outboard motors`}
                width={300}
                height={150}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}