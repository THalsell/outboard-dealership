'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order, OrderStatus, PaymentStatus } from '@/types/models';

// Mock data - replace with API call
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    userId: '1',
    status: OrderStatus.DELIVERED,
    items: [
      {
        id: 'item-1',
        productId: 'yamaha-f200',
        productType: 'motor',
        name: 'Yamaha F200 Outboard Motor',
        sku: 'YAM-F200-2024',
        price: 18500,
        quantity: 1,
        total: 18500,
      }
    ],
    subtotal: 18500,
    tax: 1480,
    shipping: 0,
    total: 19980,
    paymentMethod: {
      type: 'credit_card',
      last4: '4242',
      brand: 'Visa',
    },
    paymentStatus: PaymentStatus.COMPLETED,
    shippingAddress: {
      
      firstName: 'John',
      lastName: 'Doe',
      street1: '615 West Lake Avenue',
      city: 'Celina',
      state: 'TN',
      postalCode: '38551',
      country: 'US',
    },
    billingAddress: {
      
      firstName: 'John',
      lastName: 'Doe',
      street1: '615 West Lake Avenue',
      city: 'Celina',
      state: 'TN',
      postalCode: '38551',
      country: 'US',
    },
    trackingNumber: 'UPS123456789',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    userId: '1',
    status: OrderStatus.SHIPPED,
    items: [
      {
        id: 'item-2',
        productId: 'mercury-prop-15x21',
        productType: 'part',
        name: 'Mercury Propeller 15x21',
        sku: 'MERC-PROP-15x21',
        price: 285,
        quantity: 1,
        total: 285,
      },
      {
        id: 'item-3',
        productId: 'oil-filter-35-8m0061183',
        productType: 'part',
        name: 'Oil Filter 35-8M0061183',
        sku: 'MERC-FILTER-8M0061183',
        price: 24,
        quantity: 2,
        total: 48,
      }
    ],
    subtotal: 333,
    tax: 27,
    shipping: 15,
    total: 375,
    paymentMethod: {
      type: 'credit_card',
      last4: '4242',
      brand: 'Visa',
    },
    paymentStatus: PaymentStatus.COMPLETED,
    shippingAddress: {
     
      
      firstName: 'John',
      lastName: 'Doe',
      street1: '615 West Lake Avenue',
      city: 'Celina',
      state: 'TN',
      postalCode: '38551',
      country: 'US',
    },
    billingAddress: {
      
      
      firstName: 'John',
      lastName: 'Doe',
      street1: '615 West Lake Avenue',
      city: 'Celina',
      state: 'TN',
      postalCode: '38551',
      country: 'US',
    },
    trackingNumber: 'FEDEX987654321',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-03'),
  },
];

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrders(mockOrders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case OrderStatus.CONFIRMED:
        return 'bg-blue-100 text-blue-800';
      case OrderStatus.PROCESSING:
        return 'bg-purple-100 text-purple-800';
      case OrderStatus.SHIPPED:
        return 'bg-orange-100 text-orange-800';
      case OrderStatus.DELIVERED:
        return 'bg-green-100 text-green-800';
      case OrderStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      case OrderStatus.REFUNDED:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case OrderStatus.CONFIRMED:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case OrderStatus.PROCESSING:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case OrderStatus.SHIPPED:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        );
      case OrderStatus.DELIVERED:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case OrderStatus.CANCELLED:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        );
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-6">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
        
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as OrderStatus | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Orders</option>
            <option value={OrderStatus.PENDING}>Pending</option>
            <option value={OrderStatus.CONFIRMED}>Confirmed</option>
            <option value={OrderStatus.PROCESSING}>Processing</option>
            <option value={OrderStatus.SHIPPED}>Shipped</option>
            <option value={OrderStatus.DELIVERED}>Delivered</option>
            <option value={OrderStatus.CANCELLED}>Cancelled</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Found</h3>
          <p className="text-gray-600 mb-4">
            {filter === 'all' ? "You haven't placed any orders yet." : `No orders with status "${filter}".`}
          </p>
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.orderNumber}
                    </h3>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    <p>Order Date: {order.createdAt.toLocaleDateString()}</p>
                    <p>Total: ${order.total.toLocaleString()}</p>
                    {order.trackingNumber && (
                      <p>Tracking: {order.trackingNumber}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 text-sm">
                        <span className="text-gray-600">({item.quantity}x)</span>
                        <span className="text-gray-900">{item.name}</span>
                        <span className="text-gray-600">${item.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
                  >
                    View Details
                  </Link>
                  
                  {order.trackingNumber && (
                    <Link
                      href={`/account/orders/${order.id}/track`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                    >
                      Track Order
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}