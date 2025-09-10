import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  children?: React.ReactNode; // For additional content like promotion banner
}

export default function Breadcrumb({ items, children }: BreadcrumbProps) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between relative flex-wrap lg:flex-nowrap">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center text-sm mb-2 lg:mb-0">
            {items.map((item, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {item.href ? (
                  <Link 
                    href={item.href}
                    className="text-gray-600 hover:text-deep-blue"
                    onClick={item.onClick}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium">{item.label}</span>
                )}
              </div>
            ))}
          </nav>

          {/* Promotion banner with angled separation */}
          {children && (
            <div className="relative ml-auto hidden sm:block">
              {/* Content area with angled clip - responsive sizing */}
              <div 
                className="relative overflow-hidden flex items-center justify-center"
                style={{
                  clipPath: 'polygon(5% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  width: 'clamp(500px, 60vw, 1000px)',
                  height: 'clamp(80px, 10vw, 150px)'
                }}
              >
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}