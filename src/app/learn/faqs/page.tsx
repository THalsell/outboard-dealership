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
    <div className="min-h-screen bg-light-gray">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-deep-blue mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-charcoal">
              Find answers to common questions about outboard motors, maintenance, and more.
            </p>
          </div>

          {/* General FAQs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-deep-blue mb-6">General Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-light-gray hover:bg-opacity-50 transition-colors"
                  >
                    <h3 className="font-semibold text-deep-blue">{faq.question}</h3>
                    <svg
                      className={`w-5 h-5 transform transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-charcoal leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Manufacturer FAQs */}
          <div>
            <h2 className="text-2xl font-bold text-deep-blue mb-6">Manufacturer FAQs</h2>
            <p className="text-charcoal mb-6">
              For brand-specific questions and technical support, visit these manufacturer FAQ pages:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {manufacturerFaqs.map((manufacturer, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-deep-blue mb-2">{manufacturer.brand}</h3>
                  <p className="text-charcoal text-sm mb-4">{manufacturer.description}</p>
                  <a
                    href={manufacturer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-teal hover:text-deep-blue font-medium transition-colors"
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

          {/* Contact Section */}
          <div className="mt-12 bg-white rounded-lg p-8 text-center shadow-md">
            <h2 className="text-2xl font-bold text-deep-blue mb-4">
              Still Have Questions?
            </h2>
            <p className="text-charcoal mb-6">
              Can&#39;t find what you&#39;re looking for? Our expert team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:9312434555"
                className="bg-deep-blue text-white px-6 py-3 rounded-lg hover:bg-teal transition-colors font-medium"
              >
                Call (931) 243-4555
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}