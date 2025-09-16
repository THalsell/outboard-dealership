import { Feature } from '@/data/types';

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <div key={index} className="bg-white hover:bg-slate-200 transition-colors p-6 text-center">
      <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  );
}