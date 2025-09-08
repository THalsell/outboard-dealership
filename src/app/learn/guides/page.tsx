'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function BuyingGuidePage() {
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const footerElement = document.querySelector('footer');
      if (!footerElement) {
        setShowSidebar(true);
        return;
      }

      const footerRect = footerElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Hide sidebar when footer is within viewport (with some padding)
      const hideThreshold = viewportHeight * 0.8; // Hide when footer is 80% into viewport
      
      if (footerRect.top < hideThreshold) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Outboard Motor Buying Guide | Expert Tips & Advice</title>
        <meta 
          name="description" 
          content="Complete guide to buying the perfect outboard motor. Learn about horsepower, features, brands, and more from our marine experts." 
        />
      </Head>
      <div className="min-h-screen bg-slate-800">
      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Outboard Motor Buying Guide
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Everything you need to know to choose the perfect outboard motor
            </p>
            <p className="text-lg text-gray-400">
              Our comprehensive guide will help you make an informed decision based on your boat, 
              usage, and performance needs.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-none xl:max-w-8xl 2xl:max-w-9xl">
        <div className="relative">
          {/* Mobile Quick Navigation */}
          <nav className="lg:hidden bg-slate-700 shadow-2xl p-6 mb-12 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">Quick Navigation</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <a href="#horsepower" className="text-white hover:text-gray-300 transition-colors text-lg">Horsepower Selection</a>
              <a href="#shaft-length" className="text-white hover:text-gray-300 transition-colors text-lg">Shaft Length</a>
              <a href="#features" className="text-white hover:text-gray-300 transition-colors text-lg">Key Features</a>
              <a href="#brands" className="text-white hover:text-gray-300 transition-colors text-lg">Brand Comparison</a>
              <a href="#maintenance" className="text-white hover:text-gray-300 transition-colors text-lg">Maintenance</a>
              <a href="#budget" className="text-white hover:text-gray-300 transition-colors text-lg">Budget Planning</a>
            </div>
          </nav>

          {/* Floating Navigation Buttons */}
          <nav className="hidden lg:block">
            <div 
              className={`fixed right-8 top-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 ${
                showSidebar ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              <div className="space-y-3">
                <a 
                  href="#horsepower" 
                  className="block w-20 h-20 bg-slate-700/95 backdrop-blur-sm shadow-xl rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110 group"
                  title="Horsepower Selection"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold leading-tight">HORSE<br />POWER</div>
                  </div>
                </a>
                <a 
                  href="#shaft-length" 
                  className="block w-20 h-20 bg-slate-700/95 backdrop-blur-sm shadow-xl rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110 group"
                  title="Shaft Length"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold leading-tight">SHAFT<br />LENGTH</div>
                  </div>
                </a>
                <a 
                  href="#features" 
                  className="block w-20 h-20 bg-slate-700/95 backdrop-blur-sm shadow-xl rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110 group"
                  title="Key Features"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold leading-tight">KEY<br />FEATURES</div>
                  </div>
                </a>
                <a 
                  href="#brands" 
                  className="block w-20 h-20 bg-slate-700/95 backdrop-blur-sm shadow-xl rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110 group"
                  title="Brand Comparison"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold leading-tight">BRAND<br />COMPARE</div>
                  </div>
                </a>
                <a 
                  href="#maintenance" 
                  className="block w-20 h-20 bg-slate-700/95 backdrop-blur-sm shadow-xl rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110 group"
                  title="Maintenance"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold leading-tight">MAINTEN<br />ANCE</div>
                  </div>
                </a>
                <a 
                  href="#budget" 
                  className="block w-20 h-20 bg-slate-700/95 backdrop-blur-sm shadow-xl rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110 group"
                  title="Budget Planning"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold leading-tight">BUDGET<br />PLANNING</div>
                  </div>
                </a>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto">

            {/* Horsepower Selection */}
            <section id="horsepower" className="bg-slate-700 shadow-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Choosing the Right Horsepower</h2>
            
            <div className="mb-6">
              <p className="text-gray-300 mb-4">
                Selecting the correct horsepower is crucial for optimal performance, fuel efficiency, and safety. 
                Here&apos;s how to determine what you need:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-600 p-4 ">
                <h3 className="text-lg font-semibold text-white mb-3">Factors to Consider</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Boat length and weight</li>
                  <li>• Maximum capacity rating</li>
                  <li>• Typical passenger/cargo load</li>
                  <li>• Water conditions you&apos;ll navigate</li>
                  <li>• Desired top speed and acceleration</li>
                  <li>• Fuel efficiency priorities</li>
                </ul>
              </div>
              
              <div className="bg-slate-600 p-4 ">
                <h3 className="text-lg font-semibold text-white mb-3">General Guidelines</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>14-16 ft:</strong> 25-60 HP</li>
                  <li>• <strong>17-19 ft:</strong> 75-150 HP</li>
                  <li>• <strong>20-24 ft:</strong> 150-300 HP</li>
                  <li>• <strong>25+ ft:</strong> 300+ HP</li>
                </ul>
                <p className="text-sm text-gray-400 mt-3">
                  *Always check your boat&apos;s maximum HP rating
                </p>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500  p-4">
              <p className="text-white font-medium">
                <strong>Pro Tip:</strong> It&apos;s often better to have slightly more power than you think you need. 
                This gives you better hole shot, allows you to maintain speed in rough conditions, and provides 
                a safety margin for emergencies.
              </p>
            </div>
          </section>

          {/* Shaft Length Measurement */}
          <section id="shaft-length" className="bg-slate-700 shadow-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Measuring for Correct Shaft Length</h2>
            
            <div className="mb-6">
              <p className="text-gray-300 mb-4">
                Selecting the correct shaft length is critical for optimal performance and preventing damage to your motor. 
                An incorrectly sized shaft can cause cavitation, poor performance, and even engine damage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">How to Measure</h3>
                <ol className="space-y-3 text-gray-300">
                  <li>
                    <strong>1. Position Your Boat:</strong> Make sure your boat is on a level surface or properly supported on a trailer.
                  </li>
                  <li>
                    <strong>2. Locate the Transom:</strong> Find the vertical back wall of your boat where the motor mounts.
                  </li>
                  <li>
                    <strong>3. Measure from Top to Bottom:</strong> Using a tape measure, measure from the top of the transom (where the motor bracket sits) straight down to the bottom of the hull.
                  </li>
                  <li>
                    <strong>4. Account for Angle:</strong> If your transom has an angle, measure along the transom face, not diagonally.
                  </li>
                </ol>

                <div className="bg-slate-600 p-4  mt-4">
                  <h4 className="font-semibold text-white mb-2">Standard Shaft Lengths</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• <strong>Short (S):</strong> 15&quot; - For transoms 15-16&quot;</li>
                    <li>• <strong>Long (L):</strong> 20&quot; - For transoms 19-21&quot;</li>
                    <li>• <strong>Extra Long (XL):</strong> 25&quot; - For transoms 24-26&quot;</li>
                    <li>• <strong>Ultra Long (XXL):</strong> 30&quot; - For transoms 29-31&quot;</li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="relative w-full h-64 md:h-96  overflow-hidden bg-gray-50">
                  <Image
                    src="/shaft.jpg"
                    alt="How to measure outboard motor shaft length on boat transom"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2 text-center">
                  Visual guide for measuring transom height
                </p>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500  p-4">
              <p className="text-white font-medium">
                <strong>Important:</strong> The anti-ventilation plate on your outboard should be level with or slightly below the bottom of the boat when properly mounted. 
                If you&apos;re between sizes, it&apos;s generally better to go with the longer shaft to ensure the propeller stays submerged in choppy water.
              </p>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="bg-slate-600 p-4 ">
                <h4 className="font-semibold text-white mb-2">Common Mistakes to Avoid</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Measuring with the boat on an uneven surface</li>
                  <li>• Not accounting for transom modifications or jack plates</li>
                  <li>• Confusing shaft length with overall motor height</li>
                  <li>• Ignoring manufacturer recommendations</li>
                </ul>
              </div>

              <div className="bg-slate-600 p-4 ">
                <h4 className="font-semibold text-white mb-2">When to Consider Jack Plates</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Fine-tuning motor height for performance</li>
                  <li>• Shallow water operation needs</li>
                  <li>• Compensating for non-standard transom heights</li>
                  <li>• Improving hole shot and top-end speed</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section id="features" className="bg-slate-700 shadow-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Essential Features to Consider</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-slate-600 p-4 ">
                  <h3 className="font-semibold text-white mb-2">Power Steering</h3>
                  <p className="text-gray-300 text-sm">
                    Essential for larger motors (150+ HP). Makes maneuvering effortless and 
                    reduces fatigue during long trips.
                  </p>
                </div>

                <div className="bg-slate-600 p-4 ">
                  <h3 className="font-semibold text-white mb-2">Electric Start</h3>
                  <p className="text-gray-300 text-sm">
                    Standard on most modern outboards. Much more convenient than pull-start, 
                    especially in emergency situations.
                  </p>
                </div>

                <div className="bg-slate-600 p-4 ">
                  <h3 className="font-semibold text-white mb-2">Tilt & Trim</h3>
                  <p className="text-gray-300 text-sm">
                    Power tilt allows you to adjust motor angle for optimal performance, 
                    better fuel economy, and easier trailering.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-600 p-4 ">
                  <h3 className="font-semibold text-white mb-2">Digital Gauges</h3>
                  <p className="text-gray-300 text-sm">
                    Modern displays provide real-time engine data, fuel consumption, 
                    maintenance alerts, and diagnostic information.
                  </p>
                </div>

                <div className="bg-slate-600 p-4 ">
                  <h3 className="font-semibold text-white mb-2">Alternator Output</h3>
                  <p className="text-gray-300 text-sm">
                    Higher output alternators (60A+) are essential if you run multiple 
                    electronics or need to charge batteries while running.
                  </p>
                </div>

                <div className="bg-slate-600 p-4 ">
                  <h3 className="font-semibold text-white mb-2">Corrosion Protection</h3>
                  <p className="text-gray-300 text-sm">
                    Look for quality anti-corrosion coatings and sacrificial anodes, 
                    especially important for saltwater use.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Brand Comparison */}
          <section id="brands" className="bg-slate-700 shadow-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Brand Overview</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-slate-600 p-4 ">
                <h3 className="font-semibold text-white mb-2">Honda</h3>
                <p className="text-sm text-gray-300 mb-2">
                  Known for reliability, quiet operation, and excellent fuel efficiency. 
                  4-stroke technology leader.
                </p>
                <div className="text-xs text-gray-400">
                  Best for: Fuel economy, quiet operation
                </div>
              </div>

              <div className="bg-slate-600 p-4 ">
                <h3 className="font-semibold text-white mb-2">Yamaha</h3>
                <p className="text-sm text-gray-300 mb-2">
                  Industry leader in innovation with excellent performance across 
                  all horsepower ranges. Strong dealer network.
                </p>
                <div className="text-xs text-gray-400">
                  Best for: Overall performance, reliability
                </div>
              </div>

              <div className="bg-slate-600 p-4 ">
                <h3 className="font-semibold text-white mb-2">Mercury</h3>
                <p className="text-sm text-gray-300 mb-2">
                  High-performance engines with advanced technology. 
                  Excellent for speed and power applications.
                </p>
                <div className="text-xs text-gray-400">
                  Best for: Performance, high-speed applications
                </div>
              </div>

              <div className="bg-slate-600 p-4 ">
                <h3 className="font-semibold text-white mb-2">Suzuki</h3>
                <p className="text-sm text-gray-300 mb-2">
                  Lightweight designs with good fuel efficiency. 
                  Competitive pricing with solid performance.
                </p>
                <div className="text-xs text-gray-400">
                  Best for: Value, lightweight applications
                </div>
              </div>

              <div className="bg-slate-600 p-4 ">
                <h3 className="font-semibold text-white mb-2">Freedom</h3>
                <p className="text-sm text-gray-300 mb-2">
                  Emerging brand offering competitive features and pricing 
                  with modern technology.
                </p>
                <div className="text-xs text-gray-400">
                  Best for: Value, modern features
                </div>
              </div>

              <div className="bg-slate-600 p-4 ">
                <h3 className="font-semibold text-white mb-2">Tohatsu</h3>
                <p className="text-sm text-gray-300 mb-2">
                  Reliable, no-frills engines with good value. 
                  Popular for commercial and utility applications.
                </p>
                <div className="text-xs text-gray-400">
                  Best for: Commercial use, value pricing
                </div>
              </div>
            </div>
          </section>

          {/* Budget Planning */}
          <section id="budget" className="bg-slate-700 shadow-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Budget Planning</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Initial Costs</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>Motor price:</strong> Varies by HP and features</li>
                  <li>• <strong>Installation:</strong> $500-$1,500</li>
                  <li>• <strong>Controls & gauges:</strong> $300-$1,000</li>
                  <li>• <strong>Propeller:</strong> $200-$800</li>
                  <li>• <strong>Rigging:</strong> $200-$500</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Ongoing Costs</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>Annual maintenance:</strong> $200-$500</li>
                  <li>• <strong>Oil changes:</strong> $50-$100 each</li>
                  <li>• <strong>Fuel:</strong> Varies by usage</li>
                  <li>• <strong>Winterization:</strong> $100-$200</li>
                  <li>• <strong>Unexpected repairs:</strong> Budget 5-10% of motor value annually</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500  p-4 mt-6">
              <h4 className="font-semibold text-white mb-2">Financing Options</h4>
              <p className="text-gray-300 text-sm">
                We offer competitive financing options with terms up to 7 years for qualified buyers. 
                Consider total cost of ownership, not just monthly payments, when making your decision.
              </p>
            </div>
          </section>

          {/* Maintenance */}
          <section id="maintenance" className="bg-slate-700 shadow-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Maintenance Considerations</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Regular Maintenance Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-slate-600  overflow-hidden">
                    <thead>
                      <tr className="bg-slate-800 text-white">
                        <th className="px-4 py-2 text-left">Interval</th>
                        <th className="px-4 py-2 text-left">Service Required</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-slate-500">
                        <td className="px-4 py-2 font-medium text-white">After first 20 hours</td>
                        <td className="px-4 py-2">Initial service - oil change, filter replacement</td>
                      </tr>
                      <tr className="border-b border-slate-500">
                        <td className="px-4 py-2 font-medium text-white">Every 100 hours / Annually</td>
                        <td className="px-4 py-2">Oil change, gear oil, spark plugs, fuel filter</td>
                      </tr>
                      <tr className="border-b border-slate-500">
                        <td className="px-4 py-2 font-medium text-white">Every 200 hours / 2 years</td>
                        <td className="px-4 py-2">Impeller, thermostats, fuel pump inspection</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-medium text-white">Every 300 hours / 3 years</td>
                        <td className="px-4 py-2">Major service - timing belt, valve adjustment</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500  p-4">
                <h4 className="font-semibold text-white mb-2">Professional Service Benefits</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Warranty compliance and protection</li>
                  <li>• Expert diagnosis of potential issues</li>
                  <li>• Genuine parts and proper tools</li>
                  <li>• Service records for resale value</li>
                </ul>
              </div>
            </div>
          </section>

            {/* Call to Action */}
            <section className="bg-slate-800 text-white p-8 text-center shadow-2xl">
              <h2 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Outboard?</h2>
              <p className="text-gray-300 mb-6">
                Our expert team is here to help you choose the right outboard motor for your needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link 
                  href="/inventory" 
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors underline hover:no-underline"
                >
                  Browse Inventory
                </Link>
                <a 
                  href="tel:9312434555" 
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors underline hover:no-underline"
                >
                  Call (931) 243-4555
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}