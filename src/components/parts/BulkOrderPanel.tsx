'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParts } from '@/contexts/PartsContext';
import { useCart } from '@/contexts/CartContext';
import { allParts } from '@/lib/data/parts';

interface BulkOrderPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BulkOrderPanel({ isOpen, onClose }: BulkOrderPanelProps) {
  const { bulkOrder, updateBulkOrderQuantity, removeFromBulkOrder, clearBulkOrder, getBulkOrderTotal } = useParts();
  const { addItem, setIsOpen: setCartOpen } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const bulkOrderWithDetails = bulkOrder.map(item => {
    const part = allParts.find(p => p.id === item.partId);
    return { ...item, part };
  }).filter(item => item.part);

  const handleQuantityChange = (partId: string, newQuantity: number) => {
    updateBulkOrderQuantity(partId, newQuantity);
  };

  const handleAddAllToCart = () => {
    setIsProcessing(true);
    
    bulkOrderWithDetails.forEach(item => {
      if (item.part) {
        addItem({
  id: item.partId,
  productId: item.partId,     // Add this line
  productType: 'part',        // Add this line
  name: item.part.name,
  price: item.unitPrice,
  quantity: item.quantity,
  image: item.part.images[0] || '/placeholder-part.svg',
  type: 'part',
  partNumber: item.part.partNumber
});
      }
    });

    setTimeout(() => {
      setIsProcessing(false);
      clearBulkOrder();
      onClose();
      setCartOpen(true);
    }, 1000);
  };

  const totalSavings = bulkOrderWithDetails.reduce((savings, item) => {
    if (!item.part) return savings;
    const regularPrice = item.part.salePrice || item.part.price;
    const bulkSavings = (regularPrice - item.unitPrice) * item.quantity;
    return savings + Math.max(0, bulkSavings);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-orange-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Bulk Order</h2>
                <p className="text-orange-100">
                  {bulkOrder.length} item{bulkOrder.length !== 1 ? 's' : ''} • ${getBulkOrderTotal().toFixed(2)} total
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-orange-100 hover:text-white p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {bulkOrder.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your bulk order is empty</h3>
                <p className="text-gray-600 mb-4">
                  Add parts with bulk pricing to get volume discounts
                </p>
                <button
                  onClick={onClose}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {bulkOrderWithDetails.map((item) => {
                    if (!item.part) return null;
                    
                    const regularPrice = item.part.salePrice || item.part.price;
                    const itemSavings = (regularPrice - item.unitPrice) * item.quantity;
                    
                    return (
                      <div key={item.partId} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex gap-4">
                          <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.part.images[0] || '/placeholder-part.svg'}
                              alt={item.part.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900 line-clamp-1">
                                  {item.part.name}
                                </h4>
                                <p className="text-sm text-gray-500 font-mono">
                                  {item.part.partNumber}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  {item.part.isOEM ? (
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                      OEM
                                    </span>
                                  ) : (
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                      Aftermarket
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              <button
                                onClick={() => removeFromBulkOrder(item.partId)}
                                className="text-gray-400 hover:text-red-600 p-1"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700">Qty:</label>
                                <input
                                  type="number"
                                  min={item.part.minOrderQuantity}
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(
                                    item.partId,
                                    parseInt(e.target.value) || (item.part ? item.part.minOrderQuantity : 1)
                                  )}
                                  className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                                />
                              </div>
                              
                              <div className="text-right">
                                <div className="text-lg font-bold text-gray-900">
                                  ${item.totalPrice.toFixed(2)}
                                </div>
                                <div className="text-sm text-gray-600">
                                  ${item.unitPrice.toFixed(2)} each
                                </div>
                                {itemSavings > 0 && (
                                  <div className="text-sm text-green-600">
                                    Save ${itemSavings.toFixed(2)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t bg-white p-4">
                <div className="space-y-4">
                  {/* Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Items ({bulkOrder.length}):</span>
                      <span>${getBulkOrderTotal().toFixed(2)}</span>
                    </div>
                    {totalSavings > 0 && (
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Total Savings:</span>
                        <span>${totalSavings.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                      <span>Total:</span>
                      <span>${getBulkOrderTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={clearBulkOrder}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={handleAddAllToCart}
                      disabled={isProcessing}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                        isProcessing
                          ? 'bg-green-600 text-white'
                          : 'bg-orange-600 hover:bg-orange-700 text-white'
                      }`}
                    >
                      {isProcessing ? '✓ Added to Cart!' : 'Add All to Cart'}
                    </button>
                  </div>

                  {/* Bulk Order Benefits */}
                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-sm text-orange-800">
                        <p className="font-medium mb-1">Bulk Order Benefits:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• Volume discounts automatically applied</li>
                          <li>• Single consolidated shipment</li>
                          <li>• Priority processing for large orders</li>
                          <li>• Dedicated support for bulk customers</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}