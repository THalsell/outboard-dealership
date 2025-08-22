'use client';

import Link from 'next/link';
import Image from 'next/image';

interface MegaMenuProps {
  category: string;
  isOpen: boolean;
}

const megaMenuContent = {
  Inventory: {
    featured: {
      title: 'Featured Deals',
      image: '/placeholder-motor.svg',
      link: '/inventory/sale',
      description: 'Save up to 20% on select models'
    },
    sections: [
      {
        title: 'Shop by Condition',
        links: [
          { name: 'New Motors', href: '/inventory/new', badge: 'Hot' },
          { name: 'Used Motors', href: '/inventory/used' },
          { name: 'Certified Pre-Owned', href: '/inventory/certified' },
          { name: 'Clearance', href: '/inventory/clearance', badge: 'Sale' },
        ]
      },
      {
        title: 'Shop by Brand',
        links: [
          { name: 'Yamaha', href: '/inventory/brand/yamaha' },
          { name: 'Mercury', href: '/inventory/brand/mercury' },
          { name: 'Honda', href: '/inventory/brand/honda' },
          { name: 'Suzuki', href: '/inventory/brand/suzuki' },
        ]
      },
      {
        title: 'Shop by Power',
        links: [
          { name: '2.5-30 HP', href: '/inventory/power/small' },
          { name: '40-100 HP', href: '/inventory/power/medium' },
          { name: '115-200 HP', href: '/inventory/power/large' },
          { name: '225+ HP', href: '/inventory/power/xlarge' },
        ]
      }
    ]
  },
  Parts: {
    featured: {
      title: 'Part Finder Tool',
      image: '/placeholder-motor.svg',
      link: '/parts/finder',
      description: 'Find the exact part you need'
    },
    sections: [
      {
        title: 'Popular Categories',
        links: [
          { name: 'Propellers', href: '/parts/propellers', badge: 'Popular' },
          { name: 'Oil & Lubricants', href: '/parts/oil' },
          { name: 'Fuel Systems', href: '/parts/fuel' },
          { name: 'Ignition Parts', href: '/parts/ignition' },
        ]
      },
      {
        title: 'Maintenance',
        links: [
          { name: 'Service Kits', href: '/parts/service-kits' },
          { name: 'Filters', href: '/parts/filters' },
          { name: 'Spark Plugs', href: '/parts/spark-plugs' },
          { name: 'Water Pumps', href: '/parts/water-pumps' },
        ]
      },
      {
        title: 'Accessories',
        links: [
          { name: 'Controls & Steering', href: '/parts/controls' },
          { name: 'Gauges', href: '/parts/gauges' },
          { name: 'Covers', href: '/parts/covers' },
          { name: 'Tools', href: '/parts/tools' },
        ]
      }
    ]
  }
};

export default function MegaMenu({ category, isOpen }: MegaMenuProps) {
  if (!isOpen || !megaMenuContent[category as keyof typeof megaMenuContent]) return null;

  const content = megaMenuContent[category as keyof typeof megaMenuContent];

  return (
    <div className="absolute left-0 right-0 top-full mt-1 bg-white shadow-2xl border-t border-gray-200 z-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Sections */}
          <div className="col-span-9">
            <div className="grid grid-cols-3 gap-8">
              {content.sections.map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
                        >
                          {link.name}
                          {link.badge && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Section */}
          <div className="col-span-3">
            <Link
              href={content.featured.link}
              className="block bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Image
                src={content.featured.image}
                alt={content.featured.title}
                width={300}
                height={200}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{content.featured.title}</h3>
                <p className="text-sm text-gray-600">{content.featured.description}</p>
                <span className="text-blue-600 text-sm font-medium mt-2 inline-block">
                  Learn more →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}