import { Metadata } from 'next';
import InventoryPageClient from '@/components/inventory/InventoryPageClient';

export const metadata: Metadata = {
  title: 'Outboard Motor Inventory | Shop New & Used Motors',
  description: 'Browse our complete inventory of new and used outboard motors from top brands.',
};

export default function InventoryPage() {
  return <InventoryPageClient />;
}