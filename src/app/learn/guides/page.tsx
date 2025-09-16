'use client';

import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { featuresData, brandsData, maintenanceData, shaftLengthData, horsepowerFAQs } from '@/data/guidesData';
import FeatureCard from '@/components/guides/FeatureCard';
import BrandCard from '@/components/guides/BrandCard';
import MaintenanceCard from '@/components/guides/MaintenanceCard';
import FAQCard from '@/components/guides/FAQCard';


// Reusable Grid Component
interface GridSectionProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

const GridSection = <T,>({ data, renderItem }: GridSectionProps<T>) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-px bg-gray-200 max-w-full xl:max-w-7xl mx-auto">
    {data.map(renderItem)}
  </div>
);

export default function InteractiveBuyingGuidePage() {
  const [activeTab, setActiveTab] = useState('horsepower');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const tabs = [
    { id: 'horsepower', label: 'Horsepower' },
    { id: 'shaft', label: 'Shaft Length' },
    { id: 'features', label: 'Features' },
    { id: 'brands', label: 'Brands' },
    { id: 'maintenance', label: 'Maintenance' }
  ];

  return (
    <>
      <Head>
        <title>Outboard Motor Buying Guide | Expert Tips</title>
        <meta
          name="description"
          content="Interactive guide to buying the perfect outboard motor. Calculate horsepower, compare brands, and get expert advice."
        />
      </Head>

      {/* Hero Image */}
      <div className="w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] relative">
        <Image
          src="/pic10.png"
          alt="Outboard Motor Buying Guide"
          fill
          sizes="100vw"
          className="object-cover w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
              Outboard Motor Buying Guide
            </h1>
            
          </div>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-none xl:max-w-[1400px] 2xl:max-w-[1600px]">

          {/* Interactive Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center border-b-2 border-gray-200 pb-4">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-t-lg font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-deep-blue text-white shadow-lg transform -translate-y-1'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">

            {/* Horsepower Tab */}
            {activeTab === 'horsepower' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-4xl font-bold text-deep-blue text-center mb-6">
                  Choosing the Right Horsepower
                </h2>

                <p className="text-lg text-gray-700 mb-6 text-center max-w-3xl mx-auto">
                  Selecting the correct horsepower is crucial for optimal performance, fuel efficiency, and safety.
                  Here&apos;s how to determine what you need:
                </p>

                {/* FAQ Style Collapsible Sections */}
                <div className="space-y-3 max-w-6xl mx-auto">
                  {horsepowerFAQs.map((faq) => (
                    <FAQCard
                      key={faq.id}
                      faq={faq}
                      isExpanded={expandedSections.includes(faq.id)}
                      onToggle={() => toggleSection(faq.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Shaft Length Tab */}
            {activeTab === 'shaft' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-3xl font-bold text-deep-blue text-center mb-12">
                  Shaft Length Guide
                </h2>

                <GridSection
                  data={shaftLengthData}
                  renderItem={(item, index) => (
                    <div key={index} className="p-8 text-center bg-white">
                      <h3 className="text-2xl underline font-bold text-deep-blue mb-4">{item.title}</h3>
                      {item.length && (
                        <div className="mb-4">
                          <span className="text-xl font-bold text-gray-900">{item.length}</span>
                          <p className="text-gray-600 mt-1">For transoms {item.transom}</p>
                        </div>
                      )}
                      <p className="text-gray-700 text-lg leading-relaxed">{item.description}</p>
                    </div>
                  )}
                />

                <div className="relative w-full h-64 md:h-96 overflow-hidden mt-12">
                  <Image
                    src="/shaft.jpg"
                    alt="Shaft length measurement guide"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-3xl font-bold text-deep-blue text-center mb-12">
                  Essential Features to Consider
                </h2>

                <GridSection
                  data={featuresData}
                  renderItem={(feature, index) => (
                    <FeatureCard key={index} feature={feature} index={index} />
                  )}
                />
              </div>
            )}

            {/* Brands Tab */}
            {activeTab === 'brands' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-3xl font-bold text-deep-blue text-center mb-12">
                  Brand Comparison Guide
                </h2>

                <GridSection
                  data={brandsData}
                  renderItem={(brand, index) => (
                    <BrandCard key={index} brand={brand} index={index} />
                  )}
                />
              </div>
            )}

            {/* Maintenance Tab */}
            {activeTab === 'maintenance' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-3xl font-bold text-deep-blue text-center mb-12">
                  Maintenance Schedule & Best Practices
                </h2>

                <GridSection
                  data={maintenanceData}
                  renderItem={(item, index) => (
                    <MaintenanceCard key={index} item={item} index={index} />
                  )}
                />
              </div>
            )}
          </div>

         
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { max-height: 0; opacity: 0; }
          to { max-height: 500px; opacity: 1; }
        }
      `}</style>
    </>
  );
}