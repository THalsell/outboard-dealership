'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats] = useState({
    totalSales: 145000,
    newOrders: 12,
    serviceRequests: 8,
    lowStock: 5,
  });

  return (
    <div className="min-h-screen bg-light-gray">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-charcoal mb-8">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm text-gray-600 mb-2">Total Sales (Month)</h3>
            <p className="text-2xl font-bold text-deep-blue">${stats.totalSales.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm text-gray-600 mb-2">New Orders</h3>
            <p className="text-2xl font-bold text-teal">{stats.newOrders}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm text-gray-600 mb-2">Service Requests</h3>
            <p className="text-2xl font-bold text-charcoal">{stats.serviceRequests}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm text-gray-600 mb-2">Low Stock Items</h3>
            <p className="text-2xl font-bold text-red-600">{stats.lowStock}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-charcoal mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/admin/inventory" className="block p-3 bg-light-gray rounded hover:bg-gray-200 transition-colors">
                Manage Inventory
              </Link>
              <Link href="/admin/orders" className="block p-3 bg-light-gray rounded hover:bg-gray-200 transition-colors">
                View Orders
              </Link>
              <Link href="/admin/customers" className="block p-3 bg-light-gray rounded hover:bg-gray-200 transition-colors">
                Customer Management
              </Link>
              <Link href="/admin/reports" className="block p-3 bg-light-gray rounded hover:bg-gray-200 transition-colors">
                Generate Reports
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-charcoal mb-4">Recent Activity</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>New order #1234</span>
                <span className="text-gray-600">2 hours ago</span>
              </div>
              <div className="flex justify-between">
                <span>Service completed #5678</span>
                <span className="text-gray-600">4 hours ago</span>
              </div>
              <div className="flex justify-between">
                <span>Inventory updated</span>
                <span className="text-gray-600">6 hours ago</span>
              </div>
              <div className="flex justify-between">
                <span>New customer registered</span>
                <span className="text-gray-600">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}