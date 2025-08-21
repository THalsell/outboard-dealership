// Main inventory page - displays all outboard motors
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outboard Motor Inventory | Shop New & Used Motors',
  description: 'Browse our complete inventory of new and used outboard motors from top brands.',
};

export default function InventoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Outboard Motor Inventory</h1>
      {/* InventoryGrid component will go here */}
      {/* Filters sidebar component will go here */}
      {/* Pagination component will go here */}
    </div>
  );
}