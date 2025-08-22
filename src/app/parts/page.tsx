import { Metadata } from 'next';
import PartsPageClient from '@/components/parts/PartsPageClient';

export const metadata: Metadata = {
  title: 'Outboard Motor Parts & Accessories | OEM & Aftermarket Parts',
  description: 'Browse our complete catalog of outboard motor parts and accessories. Find OEM and aftermarket parts by category or motor model with bulk pricing available.',
};

export default function PartsPage() {
  return <PartsPageClient />;
}