// Parts and accessories main page
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outboard Motor Parts & Accessories',
  description: 'Find genuine parts and accessories for your outboard motor.',
};

export default function PartsPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Parts & Accessories</h1>
      {/* Parts catalog will be implemented here */}
    </div>
  );
}