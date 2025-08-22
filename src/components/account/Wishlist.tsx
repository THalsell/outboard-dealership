'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Wishlist as WishlistType, WishlistItem } from '@/types/models';

// Mock data - replace with API call
const mockWishlist: WishlistType = {
  id: '1',
  userId: '1',
  name: 'My Wishlist',
  isDefault: true,
  items: [
    {
      id: '1',
      productId: 'yamaha-f300',
      productType: 'motor',
      name: 'Yamaha F300 V6 4.2L Outboard',
      brand: 'Yamaha',
      model: 'F300',
      price: 24500,
      imageUrl: '/images/motors/yamaha-f300.jpg',
      availability: 'in_stock',
      addedAt: new Date('2024-01-15'),
      notes: 'For my new center console build'
    },
    {
      id: '2',
      productId: 'mercury-prop-17x19',
      productType: 'part',
      name: 'Mercury Revolution 4 Propeller 17x19',
      brand: 'Mercury',
      price: 485,
      imageUrl: '/images/parts/mercury-prop-revolution.jpg',
      availability: 'in_stock',
      addedAt: new Date('2024-01-20'),
    },
    {
      id: '3',
      productId: 'suzuki-df140a',
      productType: 'motor',
      name: 'Suzuki DF140A Outboard Motor',
      brand: 'Suzuki',
      model: 'DF140A',
      price: 13500,
      imageUrl: '/images/motors/suzuki-df140a.jpg',
      availability: 'back_order',
      addedAt: new Date('2024-02-01'),
    },
    {
      id: '4',
      productId: 'garmin-striker-7sv',
      productType: 'accessory',
      name: 'Garmin Striker 7sv Fish Finder',
      brand: 'Garmin',
      price: 299,
      imageUrl: '/images/accessories/garmin-striker-7sv.jpg',
      availability: 'out_of_stock',
      addedAt: new Date('2024-02-05'),
    },
  ],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-02-05'),
};

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWishlist(mockWishlist);
      setLoading(false);
    };

    fetchWishlist();
  }, []);

  const handleRemoveItem = async (itemId: string) => {
    if (!wishlist) return;

    // Optimistically update UI
    const updatedWishlist = {
      ...wishlist,
      items: wishlist.items.filter(item => item.id !== itemId)
    };
    setWishlist(updatedWishlist);

    // Remove from selected items
    const newSelectedItems = new Set(selectedItems);
    newSelectedItems.delete(itemId);
    setSelectedItems(newSelectedItems);

    // TODO: Make API call to remove item
    console.log('Removing item:', itemId);
  };

  const handleToggleSelect = (itemId: string) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId);
    } else {
      newSelectedItems.add(itemId);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleSelectAll = () => {
    if (!wishlist) return;
    
    if (selectedItems.size === wishlist.items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(wishlist.items.map(item => item.id)));
    }
  };

  const handleAddToCart = (item: WishlistItem) => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', item);
    alert(`${item.name} added to cart!`);
  };

  const handleAddSelectedToCart = () => {
    if (!wishlist || selectedItems.size === 0) return;
    
    const selectedWishlistItems = wishlist.items.filter(item => selectedItems.has(item.id));
    // TODO: Implement bulk add to cart
    console.log('Adding selected items to cart:', selectedWishlistItems);
    alert(`${selectedItems.size} item(s) added to cart!`);
  };

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'in_stock':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">In Stock</span>;
      case 'out_of_stock':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Out of Stock</span>;
      case 'back_order':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Back Order</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
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

  if (!wishlist || wishlist.items.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your Wishlist is Empty</h3>
        <p className="text-gray-600 mb-6">
          Save items you&apos;re interested in to your wishlist for easy access later.
        </p>
        <Link
          href="/inventory"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Browse Products
        </Link>
      </div>
    );
  }

  const totalValue = wishlist.items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{wishlist.name}</h2>
          <p className="text-gray-600">
            {wishlist.items.length} item{wishlist.items.length !== 1 ? 's' : ''} • Total value: ${totalValue.toLocaleString()}
          </p>
        </div>

        <div className="flex gap-2">
          {selectedItems.size > 0 && (
            <button
              onClick={handleAddSelectedToCart}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Selected to Cart ({selectedItems.size})
            </button>
          )}
          
          <button
            onClick={handleSelectAll}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {selectedItems.size === wishlist.items.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.items.map((item) => (
          <div key={item.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <input
                type="checkbox"
                checked={selectedItems.has(item.id)}
                onChange={() => handleToggleSelect(item.id)}
                className="absolute top-3 left-3 w-4 h-4 text-blue-600 rounded z-10"
              />
              
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="absolute top-3 right-3 p-1 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors z-10"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-48">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  <Link href={`/inventory/${item.productId}`} className="hover:text-blue-600 transition-colors">
                    {item.name}
                  </Link>
                </h3>
                {getAvailabilityBadge(item.availability)}
              </div>

              <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-gray-900">
                  ${item.price.toLocaleString()}
                </span>
              </div>

              {item.notes && (
                <p className="text-sm text-gray-600 mb-3 italic">&quot;{item.notes}&quot;</p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={item.availability === 'out_of_stock'}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  {item.availability === 'out_of_stock' ? 'Out of Stock' : 'Add to Cart'}
                </button>
                
                <Link
                  href={`/inventory/${item.productId}`}
                  className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </Link>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Added {item.addedAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {wishlist.items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No items in your wishlist yet.</p>
        </div>
      )}
    </div>
  );
}