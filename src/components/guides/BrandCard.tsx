import { Brand } from '@/data/types';
import StarRating from './StarRating';
import Card from '@/components/ui/Card';

interface BrandCardProps {
  brand: Brand;
  index: number;
}

export default function BrandCard({ brand, index }: BrandCardProps) {
  return (
    <Card
      key={index}
      padding="lg"
      hover
      className="text-center hover:bg-slate-200 transition-colors"
    >
      <h4 className="text-xl font-bold mb-4">{brand.name}</h4>
      <StarRating rating={brand.rating} maxStars={brand.maxStars} />
      <ul className="mt-4 space-y-2">
        {brand.strengths.map((strength, idx) => (
          <li key={idx} className="text-gray-600">• {strength}</li>
        ))}
      </ul>
    </Card>
  );
}