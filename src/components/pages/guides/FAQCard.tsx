import { HorsepowerFAQ } from '@/data/guides/types';

interface FAQCardProps {
  faq: HorsepowerFAQ;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function FAQCard({ faq, isExpanded, onToggle }: FAQCardProps) {
  const renderAnswer = () => {
    if (typeof faq.answer === 'string') {
      return <p className="ml-4 text-base text-gray-700">{faq.answer}</p>;
    }

    return (
      <div className="ml-4 text-base text-gray-700">
        {faq.answer.text && <p className="mb-2">{faq.answer.text}</p>}
        {faq.answer.list && (
          <ul className="space-y-1">
            {faq.answer.list.map((item, idx) => (
              <li key={idx}>• {item}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full py-4 text-left hover:text-blue-dark transition-colors flex justify-between items-center"
      >
        <span className="font-semibold text-xl">{faq.question}</span>
        <span className="text-2xl text-gray-500 ml-4">
          {isExpanded ? '−' : '+'}
        </span>
      </button>
      {isExpanded && (
        <div className="pb-4 animate-slideDown">
          {renderAnswer()}
        </div>
      )}
    </div>
  );
}