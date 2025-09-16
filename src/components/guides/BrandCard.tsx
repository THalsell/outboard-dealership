import { Brand } from '@/data/types';
import StarRating from './StarRating';

interface BrandCardProps {
  brand: Brand;
  index: number;
}

export default function BrandCard({ brand, index }: BrandCardProps) {
  return (
    <div key={index} className="bg-white hover:bg-slate-200 transition-colors p-6 text-center">
      <h4 className="text-xl font-bold mb-4">{brand.name}</h4>
      <StarRating rating={brand.rating} maxStars={brand.maxStars} />
      <ul className="mt-4 space-y-2">
        {brand.strengths.map((strength, idx) => (
          <li key={idx} className="text-gray-600">• {strength}</li>
        ))}
      </ul>
    </div>
  );
}