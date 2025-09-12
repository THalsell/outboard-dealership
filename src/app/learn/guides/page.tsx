'use client';

import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function BuyingGuidePage() {
  return (
    <>
    
      <Head>
        <title>Outboard Motor Buying Guide | Expert Tips & Advice</title>
        <meta 
          name="description" 
          content="Complete guide to buying the perfect outboard motor. Learn about horsepower, features, brands, and more from our marine experts." 
        />
      </Head>
      <div 
        className="min-h-screen relative"
        style={{
          background: '#1e293b'
        }}
      >
        {/* Fixed background layer */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: 'url(/background.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundColor: '#1e293b'
          }}
        ></div>
        
        {/* Content wrapper */}
        <div className="relative z-20">

        <div className="mb-8 w-full relative h-24 md:h-32 lg:h-80">
              <Image
                src="/pic10.png"
                alt="Quick Navigation"
                fill
                sizes="100vw"
                className="object-cover w-full object-center"
              />
            </div>
        
        {/* Hero Section */}
        <section className="text-white py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">

            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold  drop-shadow-lg">
                Outboard Motor Buying Guide
              </h1>
              
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-none xl:max-w-8xl 2xl:max-w-9xl">
        <div className="relative">
          {/* Mobile Quick Navigation */}
          <nav className="lg:hidden bg-white/95 backdrop-blur-sm shadow-2xl p-6 mb-12 max-w-4xl mx-auto rounded-lg">
            <h2 className="text-xl font-semibold text-blue-900 mb-4 text-center">Quick Navigation</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <a href="#horsepower" className="text-blue-900 hover:text-blue-700 font-medium transition-colors text-lg">Horsepower Selection</a>
              <a href="#shaft-length" className="text-blue-900 hover:text-blue-700 font-medium transition-colors text-lg">Shaft Length</a>
              <a href="#features" className="text-blue-900 hover:text-blue-700 font-medium transition-colors text-lg">Key Features</a>
              <a href="#brands" className="text-blue-900 hover:text-blue-700 font-medium transition-colors text-lg">Brand Comparison</a>
              <a href="#maintenance" className="text-blue-900 hover:text-blue-700 font-medium transition-colors text-lg">Maintenance</a>
            </div>
          </nav>

          {/* Desktop Quick Navigation - Top */}
          <nav className="hidden lg:block mb-12">
            
            <div className="max-w-6xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="#horsepower" 
                className="bg-white/95 backdrop-blur-sm border-2 border-blue-300 px-8 py-4 rounded-lg text-blue-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Horsepower Selection
              </a>
              <a 
                href="#shaft-length" 
                className="bg-white/95 backdrop-blur-sm border-2 border-blue-300 px-8 py-4 rounded-lg text-blue-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Shaft Length
              </a>
              <a 
                href="#features" 
                className="bg-white/95 backdrop-blur-sm border-2 border-blue-300 px-8 py-4 rounded-lg text-blue-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Key Features
              </a>
              <a 
                href="#brands" 
                className="bg-white/95 backdrop-blur-sm border-2 border-blue-300 px-8 py-4 rounded-lg text-blue-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Brand Comparison
              </a>
              <a 
                href="#maintenance" 
                className="bg-white/95 backdrop-blur-sm border-2 border-blue-300 px-8 py-4 rounded-lg text-blue-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Maintenance
              </a>
            </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto">

            {/* Horsepower Selection */}
            <section id="horsepower" className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">Choosing the Right Horsepower</h2>
            
            <div className="mb-6">
              <p className="text-white mb-4 drop-shadow">
                Selecting the correct horsepower is crucial for optimal performance, fuel efficiency, and safety. 
                Here&apos;s how to determine what you need:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-blue-300 p-4 rounded">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Factors to Consider</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Boat length and weight</li>
                  <li>• Maximum capacity rating</li>
                  <li>• Typical passenger/cargo load</li>
                  <li>• Water conditions you&apos;ll navigate</li>
                  <li>• Desired top speed and acceleration</li>
                  <li>• Fuel efficiency priorities</li>
                </ul>
              </div>
              
              <div className="bg-white border border-blue-300 p-4 rounded">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">General Guidelines</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• <strong>14-16 ft:</strong> 25-60 HP</li>
                  <li>• <strong>17-19 ft:</strong> 75-150 HP</li>
                  <li>• <strong>20-24 ft:</strong> 150-300 HP</li>
                  <li>• <strong>25+ ft:</strong> 300+ HP</li>
                </ul>
                <p className="text-sm text-blue-700 mt-3">
                  *Always check your boat&apos;s maximum HP rating
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-blue-400 rounded p-4">
              <p className="text-blue-900 font-medium">
                <strong>Pro Tip:</strong> It&apos;s often better to have slightly more power than you think you need. 
                This gives you better hole shot, allows you to maintain speed in rough conditions, and provides 
                a safety margin for emergencies.
              </p>
            </div>
          </section>

          {/* Shaft Length Measurement */}
          <section id="shaft-length" className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">Measuring for Correct Shaft Length</h2>
            
            <div className="mb-6">
              <p className="text-white mb-4 drop-shadow">
                Selecting the correct shaft length is critical for optimal performance and preventing damage to your motor. 
                An incorrectly sized shaft can cause cavitation, poor performance, and even engine damage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 drop-shadow">How to Measure</h3>
                <ol className="space-y-3 text-white drop-shadow">
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

                <div className="bg-white border border-blue-300 p-4 rounded mt-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Standard Shaft Lengths</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
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
                <p className="text-sm text-white mt-2 text-center drop-shadow">
                  Visual guide for measuring transom height
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-blue-400 rounded p-4">
              <p className="text-blue-900 font-medium">
                <strong>Important:</strong> The anti-ventilation plate on your outboard should be level with or slightly below the bottom of the boat when properly mounted. 
                If you&apos;re between sizes, it&apos;s generally better to go with the longer shaft to ensure the propeller stays submerged in choppy water.
              </p>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-blue-300 p-4 rounded">
                <h4 className="font-semibold text-blue-900 mb-2">Common Mistakes to Avoid</h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Measuring with the boat on an uneven surface</li>
                  <li>• Not accounting for transom modifications or jack plates</li>
                  <li>• Confusing shaft length with overall motor height</li>
                  <li>• Ignoring manufacturer recommendations</li>
                </ul>
              </div>

              <div className="bg-white border border-blue-300 p-4 rounded">
                <h4 className="font-semibold text-blue-900 mb-2">When to Consider Jack Plates</h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Fine-tuning motor height for performance</li>
                  <li>• Shallow water operation needs</li>
                  <li>• Compensating for non-standard transom heights</li>
                  <li>• Improving hole shot and top-end speed</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section id="features" className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">Essential Features to Consider</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white border border-blue-300 p-4 rounded">
                  <h3 className="font-semibold text-blue-900 mb-2">Power Steering</h3>
                  <p className="text-blue-800 text-sm">
                    Essential for larger motors (150+ HP). Makes maneuvering effortless and 
                    reduces fatigue during long trips.
                  </p>
                </div>

                <div className="bg-white border border-blue-300 p-4 rounded">
                  <h3 className="font-semibold text-blue-900 mb-2">Electric Start</h3>
                  <p className="text-blue-800 text-sm">
                    Standard on most modern outboards. Much more convenient than pull-start, 
                    especially in emergency situations.
                  </p>
                </div>

                <div className="bg-white border border-blue-300 p-4 rounded">
                  <h3 className="font-semibold text-blue-900 mb-2">Tilt & Trim</h3>
                  <p className="text-blue-800 text-sm">
                    Power tilt allows you to adjust motor angle for optimal performance, 
                    better fuel economy, and easier trailering.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white border border-blue-300 p-4 rounded">
                  <h3 className="font-semibold text-blue-900 mb-2">Digital Gauges</h3>
                  <p className="text-blue-800 text-sm">
                    Modern displays provide real-time engine data, fuel consumption, 
                    maintenance alerts, and diagnostic information.
                  </p>
                </div>

                <div className="bg-white border border-blue-300 p-4 rounded">
                  <h3 className="font-semibold text-blue-900 mb-2">Alternator Output</h3>
                  <p className="text-blue-800 text-sm">
                    Higher output alternators (60A+) are essential if you run multiple 
                    electronics or need to charge batteries while running.
                  </p>
                </div>

                <div className="bg-white border border-blue-300 p-4 rounded">
                  <h3 className="font-semibold text-blue-900 mb-2">Corrosion Protection</h3>
                  <p className="text-blue-800 text-sm">
                    Look for quality anti-corrosion coatings and sacrificial anodes, 
                    especially important for saltwater use.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Brand Comparison */}
          <section id="brands" className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">Brand Overview</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white border border-blue-300 p-4 rounded">
                <h3 className="font-semibold text-blue-900 mb-2">Honda</h3>
                <p className="text-sm text-blue-800 mb-2">
                  Known for reliability, quiet operation, and excellent fuel efficiency. 
                  4-stroke technology leader.
                </p>
                <div className="text-xs text-blue-700">
                  Best for: Fuel economy, quiet operation
                </div>
              </div>

              <div className="bg-white border border-blue-300 p-4 rounded">
                <h3 className="font-semibold text-blue-900 mb-2">Yamaha</h3>
                <p className="text-sm text-blue-800 mb-2">
                  Industry leader in innovation with excellent performance across 
                  all horsepower ranges. Strong dealer network.
                </p>
                <div className="text-xs text-blue-700">
                  Best for: Overall performance, reliability
                </div>
              </div>

              <div className="bg-white border border-blue-300 p-4 rounded">
                <h3 className="font-semibold text-blue-900 mb-2">Mercury</h3>
                <p className="text-sm text-blue-800 mb-2">
                  High-performance engines with advanced technology. 
                  Excellent for speed and power applications.
                </p>
                <div className="text-xs text-blue-700">
                  Best for: Performance, high-speed applications
                </div>
              </div>

              <div className="bg-white border border-blue-300 p-4 rounded">
                <h3 className="font-semibold text-blue-900 mb-2">Suzuki</h3>
                <p className="text-sm text-blue-800 mb-2">
                  Lightweight designs with good fuel efficiency. 
                  Competitive pricing with solid performance.
                </p>
                <div className="text-xs text-blue-700">
                  Best for: Value, lightweight applications
                </div>
              </div>

              <div className="bg-white border border-blue-300 p-4 rounded">
                <h3 className="font-semibold text-blue-900 mb-2">Freedom</h3>
                <p className="text-sm text-blue-800 mb-2">
                  Emerging brand offering competitive features and pricing 
                  with modern technology.
                </p>
                <div className="text-xs text-blue-700">
                  Best for: Value, modern features
                </div>
              </div>

              <div className="bg-white border border-blue-300 p-4 rounded">
                <h3 className="font-semibold text-blue-900 mb-2">Tohatsu</h3>
                <p className="text-sm text-blue-800 mb-2">
                  Reliable, no-frills engines with good value. 
                  Popular for commercial and utility applications.
                </p>
                <div className="text-xs text-blue-700">
                  Best for: Commercial use, value pricing
                </div>
              </div>
            </div>
          </section>


          {/* Maintenance */}
          <section id="maintenance" className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">Maintenance Considerations</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 drop-shadow">Regular Maintenance Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-blue-200 overflow-hidden rounded">
                    <thead>
                      <tr className="bg-blue-50 text-blue-900 border-b-2 border-blue-300">
                        <th className="px-4 py-2 text-left">Interval</th>
                        <th className="px-4 py-2 text-left">Service Required</th>
                      </tr>
                    </thead>
                    <tbody className="text-blue-800">
                      <tr className="border-b border-blue-200">
                        <td className="px-4 py-2 font-medium text-blue-900">After first 20 hours</td>
                        <td className="px-4 py-2">Initial service - oil change, filter replacement</td>
                      </tr>
                      <tr className="border-b border-blue-200">
                        <td className="px-4 py-2 font-medium text-blue-900">Every 100 hours / Annually</td>
                        <td className="px-4 py-2">Oil change, gear oil, spark plugs, fuel filter</td>
                      </tr>
                      <tr className="border-b border-blue-200">
                        <td className="px-4 py-2 font-medium text-blue-900">Every 200 hours / 2 years</td>
                        <td className="px-4 py-2">Impeller, thermostats, fuel pump inspection</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-medium text-blue-900">Every 300 hours / 3 years</td>
                        <td className="px-4 py-2">Major service - timing belt, valve adjustment</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white border-2 border-blue-400 rounded p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Professional Service Benefits</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Warranty compliance and protection</li>
                  <li>• Expert diagnosis of potential issues</li>
                  <li>• Genuine parts and proper tools</li>
                  <li>• Service records for resale value</li>
                </ul>
              </div>
            </div>
          </section>

            {/* Call to Action */}
            <section className="p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Ready to Find Your Perfect Outboard?</h2>
              <p className="text-white mb-6 drop-shadow">
                Our expert team is here to help you choose the right outboard motor for your needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link 
                  href="/inventory" 
                  className="text-white hover:text-white/80 font-semibold transition-colors underline hover:no-underline drop-shadow"
                >
                  Browse Inventory
                </Link>
                <a 
                  href="tel:9312434555" 
                  className="text-white hover:text-white/80 font-semibold transition-colors underline hover:no-underline drop-shadow"
                >
                  Call (931) 243-4555
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}