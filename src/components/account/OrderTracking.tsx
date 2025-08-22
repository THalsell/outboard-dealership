"use client";

import { useState, useEffect } from "react";
import {
  OrderTracking as OrderTrackingType,
  OrderStatus,
} from "@/types/models";

interface OrderTrackingProps {
  orderId: string;
}

// Mock tracking data - replace with API call
const mockTrackingData: OrderTrackingType = {
  orderId: "2",
  status: OrderStatus.SHIPPED,
  statusHistory: [
    {
      status: OrderStatus.PENDING,
      message: "Order received and being processed",
      timestamp: new Date("2024-02-01T10:00:00"),
    },
    {
      status: OrderStatus.CONFIRMED,
      message: "Payment confirmed and order approved",
      timestamp: new Date("2024-02-01T14:30:00"),
    },
    {
      status: OrderStatus.PROCESSING,
      message: "Items picked and prepared for shipment",
      timestamp: new Date("2024-02-02T09:15:00"),
    },
    {
      status: OrderStatus.SHIPPED,
      message: "Package shipped via FedEx Ground",
      timestamp: new Date("2024-02-03T08:00:00"),
      location: "Celina, TN Distribution Center",
    },
    {
      status: OrderStatus.SHIPPED,
      message: "In transit to destination",
      timestamp: new Date("2024-02-04T12:30:00"),
      location: "Jacksonville, FL Sorting Facility",
    },
  ],
  trackingNumber: "FEDEX987654321",
  carrier: "FedEx Ground",
  estimatedDelivery: new Date("2024-02-05T18:00:00"),
  deliveryAddress: {
    id: "1",
    type: "shipping",
    isDefault: true,
    firstName: "John",
    lastName: "Doe",
    street1: "615 West Lake Avenue",
    city: "Celina",
    state: "TN",
    postalCode: "38551",
    country: "US",
  },
};

export default function OrderTracking({ orderId }: OrderTrackingProps) {
  const [tracking, setTracking] = useState<OrderTrackingType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracking = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTracking(mockTrackingData);
      setLoading(false);
    };

    fetchTracking();
  }, [orderId]);

  const getStatusIndex = (status: OrderStatus) => {
    const statusOrder = [
      OrderStatus.PENDING,
      OrderStatus.CONFIRMED,
      OrderStatus.PROCESSING,
      OrderStatus.SHIPPED,
      OrderStatus.DELIVERED,
    ];
    return statusOrder.indexOf(status);
  };

  const getCurrentStepIndex = () => {
    if (!tracking) return 0;
    return getStatusIndex(tracking.status);
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!tracking) {
    return (
      <div className="text-center py-12">
        <svg
          className="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Tracking Information Unavailable
        </h3>
        <p className="text-gray-600">
          We couldn&apos;t find tracking information for this order.
        </p>
      </div>
    );
  }

  const currentStepIndex = getCurrentStepIndex();
  const steps = [
    { status: OrderStatus.PENDING, label: "Order Placed", icon: "📋" },
    { status: OrderStatus.CONFIRMED, label: "Confirmed", icon: "✅" },
    { status: OrderStatus.PROCESSING, label: "Processing", icon: "📦" },
    { status: OrderStatus.SHIPPED, label: "Shipped", icon: "🚚" },
    { status: OrderStatus.DELIVERED, label: "Delivered", icon: "🏠" },
  ];

  return (
    <div className="space-y-8">
      {/* Order Status Progress */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Order Progress
        </h3>

        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            {steps.map((step, index) => (
              <div key={step.status} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 ${
                    index <= currentStepIndex
                      ? "bg-blue-100 border-2 border-blue-600"
                      : "bg-gray-100 border-2 border-gray-300"
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-sm font-medium ${
                    index <= currentStepIndex
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Progress line */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-300 -z-10">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tracking Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipping Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Shipping Information
          </h3>

          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">Tracking Number:</span>
              <p className="font-medium text-gray-900">
                {tracking.trackingNumber}
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-600">Carrier:</span>
              <p className="font-medium text-gray-900">{tracking.carrier}</p>
            </div>

            <div>
              <span className="text-sm text-gray-600">Estimated Delivery:</span>
              <p className="font-medium text-gray-900">
                {tracking.estimatedDelivery?.toLocaleDateString()} by{" "}
                {tracking.estimatedDelivery?.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }) || "TBD"}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <span className="text-sm text-gray-600">Delivery Address:</span>
            <div className="mt-1 text-sm text-gray-900">
              <p>
                {tracking.deliveryAddress.firstName}{" "}
                {tracking.deliveryAddress.lastName}
              </p>
              <p>{tracking.deliveryAddress.street1}</p>
              {tracking.deliveryAddress.street2 && (
                <p>{tracking.deliveryAddress.street2}</p>
              )}
              <p>
                {tracking.deliveryAddress.city},{" "}
                {tracking.deliveryAddress.state}{" "}
                {tracking.deliveryAddress.postalCode}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>

          <div className="space-y-3">
            <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="font-medium">Download Invoice</span>
              </div>
            </button>

            <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="font-medium">Contact Support</span>
              </div>
            </button>

            <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="font-medium">Return/Exchange</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Tracking History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tracking History
        </h3>

        <div className="flow-root">
          <ul className="-mb-8">
            {tracking.statusHistory.map((event, eventIdx) => (
              <li key={eventIdx}>
                <div className="relative pb-8">
                  {eventIdx !== tracking.statusHistory.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-900 font-medium">
                          {event.message}
                        </p>
                        {event.location && (
                          <p className="text-sm text-gray-500">
                            {event.location}
                          </p>
                        )}
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <div>{event.timestamp.toLocaleDateString()}</div>
                        <div>
                          {event.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
