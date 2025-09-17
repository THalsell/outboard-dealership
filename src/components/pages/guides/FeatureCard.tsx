import { Feature } from '@/data/guides/types';
import Card from '@/components/ui/display/Card';

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <Card
      key={index}
      padding="lg"
      hover
      className="text-center hover:bg-slate-200 transition-colors"
    >
      <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
      <p className="text-gray-600">{feature.description}</p>
    </Card>
  );
}