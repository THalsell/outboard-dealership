import OrderTracking from '@/components/account/OrderTracking';

interface OrderTrackingPageProps {
  params: {
    id: string;
  };
}

export const metadata = {
  title: 'Track Order | Clay Powersports',
  description: 'Track your order status and delivery information.',
};

export default function OrderTrackingPage({ params }: OrderTrackingPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
          <p className="text-gray-600 mt-2">Order #{params.id}</p>
        </div>
        
        <OrderTracking orderId={params.id} />
      </div>
    </div>
  );
}