import { Metadata } from 'next';
import ComparePageClient from '@/components/inventory/ComparePageClient';

export const metadata: Metadata = {
  title: 'Compare Motors | Outboard Motor Comparison Tool',
  description: 'Compare outboard motors side-by-side. View detailed specifications, features, and pricing to find the perfect motor for your boat.',
};

export default function ComparePage() {
  return <ComparePageClient />;
}