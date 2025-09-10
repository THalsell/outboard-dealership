import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata = {
  title: 'About Us | Outboard Motor Sales',
  description: 'Learn about Outboard Motor Sales - your trusted outboard motor dealership.',
};

export default function AboutPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-charcoal mb-8">About Outboard Motor Sales</h1>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-light-gray rounded-xl p-12">
              <h2 className="text-3xl font-semibold text-deep-blue mb-6">Coming Soon</h2>
              <p className="text-lg text-charcoal mb-8">
                We&#39;re working hard to bring you the best outboard motor shopping experience. 
                Our comprehensive about page with company information, history, and team details 
                will be available soon.
              </p>
              <p className="text-charcoal">
                In the meantime, feel free to browse our inventory and contact us with any questions.
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <Link
              href="/inventory"
              className="text-deep-blue hover:text-[#0a3a6e] font-semibold underline transition-colors"
            >
              Browse Our Inventory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}