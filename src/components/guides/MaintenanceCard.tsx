import { MaintenanceItem } from '@/data/types';

interface MaintenanceCardProps {
  item: MaintenanceItem;
  index: number;
}

export default function MaintenanceCard({ item, index }: MaintenanceCardProps) {
  return (
    <div key={index} className="bg-white hover:bg-slate-200 transition-colors p-6 text-center">
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
    </div>
  );
}