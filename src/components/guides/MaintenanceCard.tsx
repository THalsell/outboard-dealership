import { MaintenanceItem } from '@/data/types';
import Card from '@/components/ui/Card';

interface MaintenanceCardProps {
  item: MaintenanceItem;
  index: number;
}

export default function MaintenanceCard({ item, index }: MaintenanceCardProps) {
  return (
    <Card
      key={index}
      padding="lg"
      hover
      className="text-center hover:bg-slate-200 transition-colors"
    >
      <h4 className="text-xl font-bold mb-4">{item.title}</h4>
      {item.description && (
        <p className="text-gray-600 mb-4">{item.description}</p>
      )}
      {item.items && (
        <ul className="space-y-2">
          {item.items.map((listItem, idx) => (
            <li key={idx} className="text-gray-600">• {listItem}</li>
          ))}
        </ul>
      )}
    </Card>
  );
}