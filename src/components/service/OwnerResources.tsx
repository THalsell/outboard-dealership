'use client';

import { useState, useEffect } from 'react';
import { OwnerResource, ResourceType, ResourceCategory } from '@/types/models';

// Mock data - replace with API call
const mockResources: OwnerResource[] = [
  {
    id: '1',
    title: 'Yamaha F200 Owner\'s Manual',
    description: 'Complete owner\'s manual for the Yamaha F200 outboard motor including operation, maintenance, and troubleshooting.',
    type: ResourceType.MANUAL,
    category: ResourceCategory.OPERATION,
    motorCompatibility: ['Yamaha F200', 'Yamaha F*'],
    fileUrl: '/manuals/yamaha-f200-owners-manual.pdf',
    thumbnailUrl: '/thumbnails/yamaha-f200-manual.jpg',
    downloadCount: 1245,
    rating: 4.8,
    ratingCount: 89,
    tags: ['Yamaha', 'F200', 'Manual', 'Operation'],
    featured: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-06-10'),
  },
  {
    id: '2',
    title: 'Proper Engine Break-In Procedure',
    description: 'Step-by-step video guide for properly breaking in your new outboard motor for optimal performance and longevity.',
    type: ResourceType.VIDEO,
    category: ResourceCategory.OPERATION,
    motorCompatibility: ['*'],
    videoUrl: 'https://youtube.com/watch?v=engine-breakin',
    thumbnailUrl: '/thumbnails/engine-breakin-video.jpg',
    downloadCount: 2156,
    rating: 4.9,
    ratingCount: 167,
    tags: ['Break-in', 'New Engine', 'Performance', 'Video'],
    featured: true,
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-03-20'),
  },
  {
    id: '3',
    title: 'Winterization Checklist',
    description: 'Comprehensive checklist for preparing your outboard motor for winter storage.',
    type: ResourceType.MAINTENANCE_GUIDE,
    category: ResourceCategory.SEASONAL,
    motorCompatibility: ['*'],
    content: 'Complete winterization steps...',
    downloadCount: 3422,
    rating: 4.7,
    ratingCount: 234,
    tags: ['Winterization', 'Storage', 'Seasonal', 'Maintenance'],
    featured: false,
    createdAt: new Date('2023-09-15'),
    updatedAt: new Date('2023-10-01'),
  },
  {
    id: '4',
    title: 'Mercury Verado Parts Catalog',
    description: 'Detailed parts diagram and catalog for Mercury Verado series outboards.',
    type: ResourceType.PARTS_CATALOG,
    category: ResourceCategory.PARTS,
    motorCompatibility: ['Mercury Verado*'],
    fileUrl: '/catalogs/mercury-verado-parts.pdf',
    downloadCount: 987,
    rating: 4.6,
    ratingCount: 45,
    tags: ['Mercury', 'Verado', 'Parts', 'Diagram'],
    featured: false,
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-05-15'),
  },
  {
    id: '5',
    title: 'Troubleshooting Engine Overheating',
    description: 'Common causes and solutions for engine overheating issues.',
    type: ResourceType.TROUBLESHOOTING,
    category: ResourceCategory.TROUBLESHOOTING,
    motorCompatibility: ['*'],
    content: 'Engine overheating troubleshooting steps...',
    downloadCount: 1876,
    rating: 4.5,
    ratingCount: 123,
    tags: ['Overheating', 'Troubleshooting', 'Cooling System'],
    featured: false,
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-04-05'),
  },
  {
    id: '6',
    title: 'Oil Change Procedure Video',
    description: 'Step-by-step video showing proper oil change procedure for outboard motors.',
    type: ResourceType.VIDEO,
    category: ResourceCategory.MAINTENANCE,
    motorCompatibility: ['*'],
    videoUrl: 'https://youtube.com/watch?v=oil-change-guide',
    thumbnailUrl: '/thumbnails/oil-change-video.jpg',
    downloadCount: 4521,
    rating: 4.8,
    ratingCount: 298,
    tags: ['Oil Change', 'Maintenance', 'Video', 'DIY'],
    featured: true,
    createdAt: new Date('2023-01-30'),
    updatedAt: new Date('2023-01-30'),
  },
];

export default function OwnerResources() {
  const [resources, setResources] = useState<OwnerResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ResourceCategory | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ResourceType | 'all'>('all');
  const [motorFilter, setMotorFilter] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResources(mockResources);
      setLoading(false);
    };

    fetchResources();
  }, []);

  const handleDownload = async (resourceId: string) => {
    // Update download count
    setResources(prev => 
      prev.map(resource => 
        resource.id === resourceId 
          ? { ...resource, downloadCount: resource.downloadCount + 1 }
          : resource
      )
    );
    // TODO: Track download analytics
    console.log('Downloaded resource:', resourceId);
  };

  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case ResourceType.MANUAL:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case ResourceType.VIDEO:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case ResourceType.ARTICLE:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case ResourceType.DIAGRAM:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case ResourceType.TROUBLESHOOTING:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case ResourceType.MAINTENANCE_GUIDE:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case ResourceType.PARTS_CATALOG:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
    const matchesType = typeFilter === 'all' || resource.type === typeFilter;
    
    const matchesMotor = motorFilter === '' ||
      resource.motorCompatibility.some(compat => 
        compat.toLowerCase().includes(motorFilter.toLowerCase()) || compat === '*'
      );

    return matchesSearch && matchesCategory && matchesType && matchesMotor;
  });

  const featuredResources = filteredResources.filter(r => r.featured);
  const regularResources = filteredResources.filter(r => !r.featured);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="h-48 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Owner Resources</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Access manuals, videos, troubleshooting guides, and maintenance information for your outboard motor.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Resources
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search manuals, videos, guides..."
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as ResourceCategory | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value={ResourceCategory.OPERATION}>Operation</option>
              <option value={ResourceCategory.MAINTENANCE}>Maintenance</option>
              <option value={ResourceCategory.TROUBLESHOOTING}>Troubleshooting</option>
              <option value={ResourceCategory.PARTS}>Parts</option>
              <option value={ResourceCategory.SAFETY}>Safety</option>
              <option value={ResourceCategory.SEASONAL}>Seasonal</option>
              <option value={ResourceCategory.PERFORMANCE}>Performance</option>
            </select>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              id="type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as ResourceType | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value={ResourceType.MANUAL}>Manuals</option>
              <option value={ResourceType.VIDEO}>Videos</option>
              <option value={ResourceType.ARTICLE}>Articles</option>
              <option value={ResourceType.DIAGRAM}>Diagrams</option>
              <option value={ResourceType.TROUBLESHOOTING}>Troubleshooting</option>
              <option value={ResourceType.MAINTENANCE_GUIDE}>Maintenance Guides</option>
              <option value={ResourceType.PARTS_CATALOG}>Parts Catalogs</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="motor" className="block text-sm font-medium text-gray-700 mb-2">
            Motor Compatibility (optional)
          </label>
          <input
            id="motor"
            type="text"
            value={motorFilter}
            onChange={(e) => setMotorFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Yamaha F200, Mercury Verado"
          />
        </div>
      </div>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <div key={resource.id} className="bg-white border-2 border-blue-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    {resource.thumbnailUrl ? (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Thumbnail</span>
                      </div>
                    ) : (
                      <div className="text-blue-600">{getResourceIcon(resource.type)}</div>
                    )}
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {resource.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span>{resource.rating} ({resource.ratingCount})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{resource.downloadCount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {resource.tags.length > 3 && (
                      <span className="text-gray-500 text-xs">+{resource.tags.length - 3}</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleDownload(resource.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {resource.type === ResourceType.VIDEO ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2 4H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" />
                        </svg>
                        Watch Video
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Resources */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          All Resources ({filteredResources.length})
        </h2>
        
        {filteredResources.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Resources Found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularResources.map((resource) => (
              <div key={resource.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    {resource.thumbnailUrl ? (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Thumbnail</span>
                      </div>
                    ) : (
                      <div className="text-gray-600">{getResourceIcon(resource.type)}</div>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {resource.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span>{resource.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{resource.downloadCount}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(resource.id)}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm"
                  >
                    {resource.type === ResourceType.VIDEO ? 'Watch' : 'Download'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Need Help Finding Resources?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Can&apos;t find your manual?</h4>
            <p className="mb-2">Contact us with your motor&apos;s serial number and we&apos;ll help locate the right documentation.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Need technical support?</h4>
            <p className="mb-2">Our certified technicians are available to answer questions about maintenance and troubleshooting.</p>
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}