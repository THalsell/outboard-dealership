'use client';

import { useState } from 'react';


interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Where is Outboard Motor Sales located?",
    answer: "Outboard Motor Sales is located at 615 West Lake Avenue, Celina, TN 38551, where we share our facility with Clay Powersports. We are your local authorized outboard motor dealer, serving customers throughout the region with our full-service dealership offering new and used outboard motors, parts, service, and financing. Call us at (931) 243-4555 or visit our showroom to see our inventory."
  },
  {
    question: "What areas do you serve for outboard motor sales and service?",
    answer: "We proudly serve customers throughout Tennessee and Kentucky, including the Dale Hollow Lake area. Located just a few miles from Dale Hollow Lake, we're perfectly positioned to serve boaters on this popular fishing destination. Our service technicians provide on-site outboard motor service and support throughout the region. Whether you're looking for a new Yamaha, Mercury, Honda, Suzuki, Tohatsu, or Freedom outboard, we deliver and service motors throughout the Dale Hollow Lake area and surrounding communities."
  },
  {
    question: "Do you offer outboard motor installation services?",
    answer: "Yes! Our certified technicians provide professional outboard motor installation at our facility. Customers bring their boats to our location at 615 West Lake Avenue, Celina, TN for expert installation. Professional installation ensures proper setup, rigging, and warranty compliance for your new or used outboard motor."
  },
  {
    question: "What financing options are available for outboard motors?",
    answer: "We offer competitive financing options for new and used outboard motors through multiple lenders. Our financing team can help you find the best rates and terms for your budget. We also accept trade-ins to reduce your total cost. Apply online or visit our dealership to discuss financing options."
  },
  {
    question: "What horsepower outboard motor do I need for my boat?",
    answer: "The horsepower you need depends on your boat's size, weight, and intended use. Check your boat's capacity plate for the maximum recommended horsepower. Generally, pontoon boats need 25-90 HP, small fishing boats need 25-60 HP, and larger boats may need 100+ HP. Consider factors like the number of passengers, gear weight, and desired performance."
  },
  {
    question: "What brands of outboard motors do you carry?",
    answer: "We are an authorized dealer for Honda, Yamaha, Mercury, Suzuki, Tohatsu, and Freedom outboard motors. Our inventory includes both new and certified pre-owned motors in various horsepower ranges. We also stock genuine parts and accessories for all major outboard motor brands."
  },
  {
    question: "Do you service all brands of outboard motors?",
    answer: "Our certified marine technicians service all major brands of outboard motors, including Honda, Yamaha, Mercury, Suzuki, Tohatsu, and Freedom. We provide routine maintenance, repairs, winterization, and warranty service. Our service department uses genuine OEM parts and follows manufacturer specifications."
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
    question: "Do you offer outboard motor trade-ins?",
    answer: "Yes, we accept trade-ins on all brands and models of outboard motors. Our experienced appraisers will evaluate your current motor and provide a fair trade-in value toward your new purchase. Trade-ins can significantly reduce the cost of upgrading to a newer, more efficient outboard motor."
  },
  {
    question: "What's the difference between 2-stroke and 4-stroke outboards?",
    answer: "2-stroke engines are lighter, more powerful per displacement, and less expensive. 4-stroke engines are more fuel-efficient, quieter, produce fewer emissions, and don't require oil mixing. Most new outboards are 4-stroke due to environmental regulations and improved technology."
  },
  {
    question: "Do you have outboard motors on sale or special pricing?",
    answer: "We regularly offer special pricing on new and used outboard motors, especially during boat show season and end-of-model-year clearances. Check our inventory for current sale prices and promotional financing offers. Sign up for our newsletter to be notified of special deals and seasonal promotions."
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-deep-blue mb-6">
          Frequently asked questions
        </h1>
      </div>

      {/* FAQ Items */}
      <div className="w-full">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full px-6 md:px-12 py-8 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-xl md:text-2xl font-medium text-gray-900 pr-8 leading-relaxed">{faq.question}</h3>
              <div className="flex-shrink-0">
                {openFaq === index ? (
                  <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </div>
            </button>
            {openFaq === index && (
              <div className="px-6 md:px-12 pb-8">
                <p className="text-gray-900 text-lg md:text-xl leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Manufacturer FAQs */}
      <div className="py-20 px-6 md:px-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-deep-blue mb-12 text-center">Manufacturer Support</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {manufacturerFaqs.map((manufacturer, index) => (
            <div key={index} className="border border-gray-300 p-6 hover:bg-gray-50 transition-colors text-center">
              <h3 className="font-bold text-deep-blue text-xl md:text-2xl mb-4">{manufacturer.brand}</h3>
              <p className="text-gray-900 text-base md:text-lg mb-4">{manufacturer.description}</p>
              <a
                href={manufacturer.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-900 hover:text-blue-700 font-medium transition-colors"
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
  );
}