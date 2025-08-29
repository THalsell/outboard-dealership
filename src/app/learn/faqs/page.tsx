'use client';

import { useState } from 'react';


interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What horsepower outboard motor do I need for my boat?",
    answer: "The horsepower you need depends on your boat's size, weight, and intended use. Check your boat's capacity plate for the maximum recommended horsepower. Generally, pontoon boats need 25-90 HP, small fishing boats need 25-60 HP, and larger boats may need 100+ HP. Consider factors like the number of passengers, gear weight, and desired performance."
  },
  {
    question: "What's the difference between a short shaft and long shaft outboard?",
    answer: "Short shaft outboards are typically 15 inches and used on boats with lower transoms. Long shaft outboards are 20 inches and used on boats with higher transoms. Extra-long shaft (25 inches) are used on pontoons and some larger boats. Using the wrong shaft length can affect performance and cooling."
  },
  {
    question: "How often should I service my outboard motor?",
    answer: "Most manufacturers recommend servicing every 100 hours of operation or annually, whichever comes first. This typically includes changing engine oil, gear oil, spark plugs, fuel filter, and checking the cooling system. More frequent service may be needed for saltwater use or harsh conditions."
  },
  {
    question: "Can I install an outboard motor myself?",
    answer: "While basic installation is possible for experienced DIYers, we recommend professional installation for safety and warranty reasons. Proper installation involves correct mounting height, steering and throttle connections, fuel system setup, and initial break-in procedures. Our certified technicians ensure everything is done correctly."
  },
  {
    question: "What's the difference between 2-stroke and 4-stroke outboards?",
    answer: "2-stroke engines are lighter, more powerful per displacement, and less expensive. 4-stroke engines are more fuel-efficient, quieter, produce fewer emissions, and don't require oil mixing. Most new outboards are 4-stroke due to environmental regulations and improved technology."
  },
  {
    question: "How do I winterize my outboard motor?",
    answer: "Winterization typically includes: running fuel stabilizer through the system, fogging the engine cylinders, changing engine oil and gear oil, removing the propeller, and storing in a dry location. For detailed procedures, consult your owner's manual or bring it to our service department."
  }
];

const manufacturerFaqs = [
  {
    brand: "Honda",
    link: "https://marine.honda.com/faq",
    description: "Honda Marine frequently asked questions covering their 4-stroke outboard engines."
  },
  {
    brand: "Yamaha", 
    link: "https://yamahaoutboards.com/owner-center/faqs",
    description: "Yamaha outboard motor FAQs including maintenance, troubleshooting, and specifications."
  },
  {
    brand: "Mercury",
    link: "https://www.mercurymarine.com/us/en/parts-and-service/service-and-support/faqs",
    description: "Mercury Marine support center with comprehensive FAQs and technical information."
  },
  {
    brand: "Freedom",
    link: "https://freedom-outboard.com/faqs/",
    description: "Freedom Outboard frequently asked questions and technical support."
  },
  {
    brand: "Suzuki",
    link: "https://www.suzukimarine.com/support-and-service/faq",
    description: "Suzuki Marine FAQs covering outboard motors and marine engines."
  },
  {
    brand: "Tohatsu",
    link: "https://tohatsu.com.au/faq/",
    description: "Tohatsu outboard motor support and frequently asked questions."
  }
];

export default function FAQsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently asked questions
            </h1>
          </div>

          {/* FAQ Items */}
          <div className="space-y-1">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-600">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-slate-700/50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-white pr-8">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    {openFaq === index ? (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Manufacturer FAQs */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Manufacturer Support</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {manufacturerFaqs.map((manufacturer, index) => (
                <div key={index} className="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition-colors">
                  <h3 className="font-bold text-white mb-2">{manufacturer.brand}</h3>
                  <p className="text-gray-300 text-sm mb-4">{manufacturer.description}</p>
                  <a
                    href={manufacturer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Visit {manufacturer.brand} FAQs
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}