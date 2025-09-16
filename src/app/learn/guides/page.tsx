'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

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
      <div className="w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] relative mt-[160px] sm:mt-[55px]">
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
            <p className="text-xl text-white/90 mt-2">
              Find your perfect outboard motor with our interactive tools
            </p>
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
                  <div className="border-b border-gray-200">
                    <button
                      onClick={() => toggleSection('factors')}
                      className="w-full py-4 text-left hover:text-blue-dark transition-colors flex justify-between items-center"
                    >
                      <span className="font-semibold text-xl">
                        What factors should I consider when choosing horsepower?
                      </span>
                      <span className="text-2xl text-gray-500 ml-4">
                        {expandedSections.includes('factors') ? '-' : '+'}
                      </span>
                    </button>
                    {expandedSections.includes('factors') && (
                      <div className="pb-4 animate-slideDown">
                        <ul className="space-y-2 text-base text-gray-700 ml-4">
                          <li>• Boat length and weight</li>
                          <li>• Maximum capacity rating on your boat&apos; plate</li>
                          <li>• Typical passenger and cargo load</li>
                          <li>• Water conditions you&apos;ll navigate</li>
                          <li>• Desired top speed and acceleration</li>
                          <li>• Fuel efficiency priorities</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-gray-200">
                    <button
                      onClick={() => toggleSection('guidelines')}
                      className="w-full py-4 text-left hover:text-blue-dark transition-colors flex justify-between items-center"
                    >
                      <span className="font-semibold text-xl">
                        What are the general horsepower guidelines by boat size?
                      </span>
                      <span className="text-2xl text-gray-500 ml-4">
                        {expandedSections.includes('guidelines') ? '−' : '+'}
                      </span>
                    </button>
                    {expandedSections.includes('guidelines') && (
                      <div className="pb-4 animate-slideDown">
                        <div className="ml-4 space-y-2 text-gray-700">
                          <p><strong>14-16 ft boats:</strong> 25-60 HP</p>
                          <p><strong>17-19 ft boats:</strong> 75-150 HP</p>
                          <p><strong>20-24 ft boats:</strong> 150-300 HP</p>
                          <p><strong>25+ ft boats:</strong> 300+ HP</p>
                          <p className="text-sm text-gray-600 mt-3 italic">
                            *Always check your boat&apos;s maximum HP rating on the capacity plate
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-gray-200">
                    <button
                      onClick={() => toggleSection('underpowered')}
                      className="w-full py-4 text-left hover:text-blue-dark transition-colors flex justify-between items-center"
                    >
                      <span className="font-semibold text-xl">
                        What happens if my boat is underpowered?
                      </span>
                      <span className="text-2xl text-gray-500 ml-4">
                        {expandedSections.includes('underpowered') ? '−' : '+'}
                      </span>
                    </button>
                    {expandedSections.includes('underpowered') && (
                      <div className="pb-4 animate-slideDown">
                        <div className="ml-4 text-base text-gray-700">
                          <p>An underpowered boat can experience:</p>
                          <ul className="mt-2 space-y-1">
                            <li>• Poor hole shot and slow planing</li>
                            <li>• Difficulty in rough water conditions</li>
                            <li>• Excessive fuel consumption trying to reach plane</li>
                            <li>• Safety concerns in emergency situations</li>
                            <li>• Increased engine wear from constant high RPM operation</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-gray-200">
                    <button
                      onClick={() => toggleSection('overpowered')}
                      className="w-full py-4 text-left hover:text-blue-dark transition-colors flex justify-between items-center"
                    >
                      <span className="font-semibold text-xl">
                        Is it okay to have more horsepower than recommended?
                      </span>
                      <span className="text-2xl text-gray-500 ml-4">
                        {expandedSections.includes('overpowered') ? '−' : '+'}
                      </span>
                    </button>
                    {expandedSections.includes('overpowered') && (
                      <div className="pb-4 animate-slideDown">
                        <div className="ml-4 text-base text-gray-700">
                          <p>
                            <strong>Never exceed your boat&apos;s maximum HP rating</strong> - this is dangerous and may void insurance.
                            However, having power at the upper end of the recommended range offers:
                          </p>
                          <ul className="mt-2 space-y-1">
                            <li>• Better performance in rough conditions</li>
                            <li>• Improved hole shot with heavy loads</li>
                            <li>• Safety margin for emergencies</li>
                            <li>• Ability to cruise at lower RPMs</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-gray-200">
                    <button
                      onClick={() => toggleSection('fuel')}
                      className="w-full py-4 text-left hover:text-blue-dark transition-colors flex justify-between items-center"
                    >
                      <span className="font-semibold text-xl">
                        How does horsepower affect fuel consumption?
                      </span>
                      <span className="text-2xl text-gray-500 ml-4">
                        {expandedSections.includes('fuel') ? '−' : '+'}
                      </span>
                    </button>
                    {expandedSections.includes('fuel') && (
                      <div className="pb-4 animate-slideDown">
                        <div className="ml-4 text-base text-gray-700">
                          <p>
                            Fuel consumption depends more on how you use the motor than its size. A properly sized motor
                            running at optimal RPM is often more efficient than an undersized motor working at full throttle.
                            Consider:
                          </p>
                          <ul className="mt-2 space-y-1">
                            <li>• Larger motors at cruising speed can be very efficient</li>
                            <li>• 4-stroke engines typically use 40% less fuel than 2-strokes</li>
                            <li>• Proper propping is crucial for fuel efficiency</li>
                            <li>• Weight distribution affects fuel consumption</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-gray-200">
                    <button
                      onClick={() => toggleSection('protip')}
                      className="w-full py-4 text-left hover:text-blue-dark transition-colors flex justify-between items-center"
                    >
                      <span className="font-semibold text-xl">
                        What&apos;s your pro tip for choosing horsepower?
                      </span>
                      <span className="text-2xl text-gray-500 ml-4">
                        {expandedSections.includes('protip') ? '−' : '+'}
                      </span>
                    </button>
                    {expandedSections.includes('protip') && (
                      <div className="pb-4 animate-slideDown">
                        <div className="ml-4 text-base text-gray-700">
                          <p>
                            <strong>It&apos;s often better to have slightly more power than you think you need.</strong>
                            This gives you better hole shot, allows you to maintain speed in rough conditions, and provides
                            a safety margin for emergencies. You don&apos;t have to use all the power all the time, but it&apos;s
                            there when you need it. Always check your boat&apos;s maximum HP rating on the capacity plate.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Shaft Length Tab */}
            {activeTab === 'shaft' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-4xl font-bold text-deep-blue text-center mb-6">
                  Shaft Length Measurement Guide
                </h2>

                <p className="text-lg text-gray-700 mb-6 text-center max-w-3xl mx-auto">
                  Selecting the correct shaft length is critical for optimal performance and preventing damage to your motor.
                  An incorrectly sized shaft can cause cavitation, poor performance, and even engine damage.
                </p>

                <div className="grid md:grid-cols-2 gap-6 md:divide-x md:divide-gray-200">
                  <div className="space-y-4 md:pr-6">
                    <h3 className="text-xl font-bold text-blue-dark">How to Measure</h3>

                    {['Position Boat', 'Locate Transom', 'Measure', 'Account for Angle'].map((step, index) => (
                      <div key={step}>
                        <div className="pb-4">
                          <h4 className="font-semibold text-blue-dark">
                            {index + 1}. {step}
                          </h4>
                          <p className="text-base text-gray-600 mt-1 ml-4">
                            {index === 0 && 'Make sure your boat is on a level surface'}
                            {index === 1 && 'Find the vertical back wall where motor mounts'}
                            {index === 2 && 'Measure from top to bottom of transom'}
                            {index === 3 && 'Measure along the transom face, not diagonally'}
                          </p>
                        </div>
                        {index < 3 && <hr className="mb-4 border-gray-200" />}
                      </div>
                    ))}
                  </div>

                  <div className="md:pl-6">
                    <h3 className="text-xl font-bold text-blue-dark mb-4">Standard Lengths</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Short (S)', length: '15"', transom: '15-16"' },
                        { name: 'Long (L)', length: '20"', transom: '19-21"' },
                        { name: 'Extra Long (XL)', length: '25"', transom: '24-26"' },
                        { name: 'Ultra Long (XXL)', length: '30"', transom: '29-31"' }
                      ].map((size, index) => (
                        <div key={size.name}>
                          <div className="pb-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-blue-dark">{size.name}</span>
                              <span className="text-gray-700 font-medium">{size.length}</span>
                            </div>
                            <p className="text-base text-gray-600 mt-1">For transoms {size.transom}</p>
                          </div>
                          {index < 3 && <hr className="mb-3 border-gray-200" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <hr className="my-8 border-gray-200" />

                <div className="relative w-full h-64 md:h-96 overflow-hidden">
                  <Image
                    src="/shaft.jpg"
                    alt="Shaft length measurement guide"
                    fill
                    className="object-contain"
                  />
                </div>

                <hr className="my-8 border-gray-200" />

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-blue-dark mb-3">Important</h3>
                  <p className="text-base text-gray-700">
                    The anti-ventilation plate on your outboard should be level with or slightly below the bottom of the boat when properly mounted.
                    If you&apos;re between sizes, it&apos;s generally better to go with the longer shaft to ensure the propeller stays submerged in choppy water.
                  </p>
                </div>

                <hr className="my-8 border-gray-200" />

                <div className="grid md:grid-cols-2 gap-6 md:divide-x md:divide-gray-200">
                  <div className="md:pr-6">
                    <h3 className="text-xl font-bold text-blue-dark mb-3">Common Mistakes to Avoid</h3>
                    <ul className="space-y-2 text-base text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-500">-</span>
                        Measuring with the boat on an uneven surface
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-500">-</span>
                        Not accounting for transom modifications or jack plates
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-500">-</span>
                        Confusing shaft length with overall motor height
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-500">-</span>
                        Ignoring manufacturer recommendations
                      </li>
                    </ul>
                  </div>

                  <div className="md:pl-6">
                    <h3 className="text-xl font-bold text-blue-dark mb-3">When to Consider Jack Plates</h3>
                    <ul className="space-y-2 text-base text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-600">-</span>
                        Fine-tuning motor height for performance
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-600">-</span>
                        Shallow water operation needs
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-600">-</span>
                        Compensating for non-standard transom heights
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-600">-</span>
                        Improving hole shot and top-end speed
                      </li>
                    </ul>
                    <div className="mt-4 w-3/4 h-px bg-gray-200"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                  Essential Features to Consider
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 max-w-full xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Power Steering */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">Power Steering</h3>
                      <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">High Priority</span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Essential for larger motors (150+ HP). Makes maneuvering effortless and reduces fatigue during long trips.
                    </p>
                  </div>

                  {/* Electric Start */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">Electric Start</h3>
                      <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">High Priority</span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Standard on most modern outboards. Much more convenient than pull-start, especially in emergency situations.
                    </p>
                  </div>

                  {/* Tilt & Trim */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">Tilt & Trim</h3>
                      <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">High Priority</span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Power tilt allows you to adjust motor angle for optimal performance, better fuel economy, and easier trailering.
                    </p>
                  </div>

                  {/* Digital Gauges */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">Digital Gauges</h3>
                      <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">Recommended</span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Modern displays provide real-time engine data, fuel consumption, maintenance alerts, and diagnostic information.
                    </p>
                  </div>

                  {/* High Output Alternator */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">High Output Alternator</h3>
                      <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">Recommended</span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Higher output alternators (60A+) are essential if you run multiple electronics or need to charge batteries while running.
                    </p>
                  </div>

                  {/* Corrosion Protection */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">Corrosion Protection</h3>
                      <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">High Priority</span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Look for quality anti-corrosion coatings and sacrificial anodes, especially important for saltwater use.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Brands Tab */}
            {activeTab === 'brands' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                  Brand Comparison Guide
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 max-w-full xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Honda */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Honda</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xl ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                        ))}
                        <span className="text-lg text-gray-500 ml-2">4.8/5.0</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Strengths</p>
                        <ul className="text-lg text-gray-600 space-y-2">
                          <li>• Fuel efficiency</li>
                          <li>• Quiet operation</li>
                          <li>• Reliability</li>
                        </ul>
                      </div>
                      <div className="text-lg">
                        <span className="text-gray-500">Best for:</span>
                        <span className="text-gray-900 font-medium ml-1">Fuel economy buyers</span>
                      </div>
                    </div>
                  </div>

                  {/* Yamaha */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Yamaha</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xl ${i < 5 ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                        ))}
                        <span className="text-lg text-gray-500 ml-2">4.9/5.0</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Strengths</p>
                        <ul className="text-lg text-gray-600 space-y-2">
                          <li>• Performance</li>
                          <li>• Innovation</li>
                          <li>• Dealer network</li>
                        </ul>
                      </div>
                      <div className="text-lg">
                        <span className="text-gray-500">Best for:</span>
                        <span className="text-gray-900 font-medium ml-1">All-around excellence</span>
                      </div>
                    </div>
                  </div>

                  {/* Mercury */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Mercury</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xl ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                        ))}
                        <span className="text-lg text-gray-500 ml-2">4.7/5.0</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Strengths</p>
                        <ul className="text-lg text-gray-600 space-y-2">
                          <li>• Speed</li>
                          <li>• Power</li>
                          <li>• Technology</li>
                        </ul>
                      </div>
                      <div className="text-lg">
                        <span className="text-gray-500">Best for:</span>
                        <span className="text-gray-900 font-medium ml-1">Performance enthusiasts</span>
                      </div>
                    </div>
                  </div>

                  {/* Suzuki */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Suzuki</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xl ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                        ))}
                        <span className="text-lg text-gray-500 ml-2">4.5/5.0</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Strengths</p>
                        <ul className="text-lg text-gray-600 space-y-2">
                          <li>• Lightweight</li>
                          <li>• Value</li>
                          <li>• Efficiency</li>
                        </ul>
                      </div>
                      <div className="text-lg">
                        <span className="text-gray-500">Best for:</span>
                        <span className="text-gray-900 font-medium ml-1">Budget-conscious buyers</span>
                      </div>
                    </div>
                  </div>

                  {/* Freedom */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Freedom</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xl ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                        ))}
                        <span className="text-lg text-gray-500 ml-2">4.3/5.0</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Strengths</p>
                        <ul className="text-lg text-gray-600 space-y-2">
                          <li>• Modern features</li>
                          <li>• Competitive pricing</li>
                          <li>• Warranty</li>
                        </ul>
                      </div>
                      <div className="text-lg">
                        <span className="text-gray-500">Best for:</span>
                        <span className="text-gray-900 font-medium ml-1">Value seekers</span>
                      </div>
                    </div>
                  </div>

                  {/* Tohatsu */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Tohatsu</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xl ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                        ))}
                        <span className="text-lg text-gray-500 ml-2">4.4/5.0</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Strengths</p>
                        <ul className="text-lg text-gray-600 space-y-2">
                          <li>• Reliability</li>
                          <li>• Simple design</li>
                          <li>• Commercial grade</li>
                        </ul>
                      </div>
                      <div className="text-lg">
                        <span className="text-gray-500">Best for:</span>
                        <span className="text-gray-900 font-medium ml-1">Commercial use</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Maintenance Tab */}
            {activeTab === 'maintenance' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                  Maintenance Schedule & Best Practices
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 max-w-full xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* First 20 Hours */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">First 20 Hours</h3>
                      <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">Critical</span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Initial break-in service - oil change, filter replacement
                    </p>
                  </div>

                  {/* 100 Hours */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">100 Hours / Annually</h3>
                      <span className="text-sm font-semibold text-orange-600 uppercase tracking-wide">High</span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Oil change, gear oil, spark plugs, fuel filter
                    </p>
                  </div>

                  {/* 200 Hours */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">200 Hours / 2 Years</h3>
                      <span className="text-sm font-semibold text-orange-600 uppercase tracking-wide">High</span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Impeller, thermostats, fuel pump inspection
                    </p>
                  </div>

                  {/* 300 Hours */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">300 Hours / 3 Years</h3>
                      <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">Medium</span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Major service - timing belt, valve adjustment
                    </p>
                  </div>

                  {/* Pro Maintenance Tips */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro Maintenance Tips</h3>
                    <ul className="text-lg text-gray-600 space-y-3">
                      <li>• Use manufacturer-recommended parts</li>
                      <li>• Keep detailed service records</li>
                      <li>• Flush after saltwater use</li>
                      <li>• Store with full fuel tank</li>
                    </ul>
                  </div>

                  {/* Professional Service Benefits */}
                  <div className="bg-white shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Service</h3>
                    <ul className="text-lg text-gray-600 space-y-3">
                      <li>✓ Warranty compliance</li>
                      <li>✓ Expert diagnosis</li>
                      <li>✓ Genuine parts</li>
                      <li>✓ Service records</li>
                    </ul>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <section className="mt-16 text-center">
            <h2 className="text-4xl font-bold text-dark mb-4">
              Ready to Find Your Perfect Outboard?
            </h2>
            <p className="text-gray-600 mb-8 text-xl">
              Our expert team is here to help you choose the right motor for your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/inventory"
                className="text-deep-blue hover:text-blue-700 font-semibold text-lg transition-colors"
              >
                Browse Inventory
              </Link>
              <a
                href="tel:9312434555"
                className="text-deep-blue hover:text-blue-700 font-semibold text-lg transition-colors"
              >
                Call (931) 243-4555
              </a>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { max-height: 0; opacity: 0; }
          to { max-height: 500px; opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #2563eb;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #2563eb;
          cursor: pointer;
          border-radius: 50%;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </>
  );
}