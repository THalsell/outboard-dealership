import { Metadata } from 'next';
import ServiceDashboard from '@/components/service/ServiceDashboard';

export const metadata: Metadata = {
  title: 'Service Center | Clay Powersports',
  description: 'Professional outboard motor service, maintenance, and support. Schedule appointments, track service status, and access owner resources.',
  keywords: 'outboard motor service, marine maintenance, boat motor repair, service scheduling, warranty registration',
  openGraph: {
    title: 'Service Center | Clay Powersports',
    description: 'Professional outboard motor service, maintenance, and support',
    type: 'website',
    siteName: 'Clay Powersports',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicePage() {
  return <ServiceDashboard />;
}