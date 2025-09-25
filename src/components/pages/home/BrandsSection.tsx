import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '@/components/ui/display/SectionHeader';

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
        <SectionHeader
          title="Authorized Dealer For"
          subtitle="Industry-leading manufacturers"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {brands.map((brand, index) => (
            <Link
              key={index}
              href={`/inventory?brand=${brand.name.toLowerCase()}`}
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