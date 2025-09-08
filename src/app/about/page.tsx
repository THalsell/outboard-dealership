import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

export const metadata = {
  title: 'About Us | Outboard Motor Sales',
  description: 'Learn about Outboard Motor Sales - your trusted outboard motor dealership.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <ol role="list" className="mx-auto flex max-w-7xl items-center space-x-2 px-4 py-4 sm:px-6 lg:px-8">
          <li>
            <div className="flex items-center">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-deep-blue transition-colors">
                Home
              </Link>
              <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
            </div>
          </li>
          <li className="text-sm font-medium text-deep-blue">About</li>
        </ol>
      </nav>

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