
interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  // TODO: Fetch order details by ID
  // For now, return a placeholder
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Order Details
          </h1>
          <p className="text-gray-600">
            Order ID: {params.id}
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Detailed order view coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}