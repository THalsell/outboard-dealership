'use client';

import { Part } from '@/types/models/part';
import { allParts } from '@/lib/data/parts';
import PartCard from './PartCard';

interface RelatedProductsProps {
  currentPart?: Part;
  category?: string;
  compatibleMotorId?: string;
  title?: string;
  maxItems?: number;
  excludePartIds?: string[];
}

export default function RelatedProducts({ 
  currentPart, 
  category, 
  compatibleMotorId,
  title = "Related Parts",
  maxItems = 8,
  excludePartIds = []
}: RelatedProductsProps) {
  
  const getRelatedParts = (): Part[] => {
    const relatedParts: Part[] = [];
    
    // If we have a current part, use its related parts list first
    if (currentPart?.relatedParts) {
      const explicitlyRelated = allParts.filter(part => 
        currentPart.relatedParts.includes(part.id) && !excludePartIds.includes(part.id)
      );
      relatedParts.push(...explicitlyRelated);
    }
    
    // If we still need more parts, find by category and compatibility
    if (relatedParts.length < maxItems) {
      const categoryMatches = allParts.filter(part => {
        // Skip if already included or excluded
        if (relatedParts.some(rp => rp.id === part.id) || excludePartIds.includes(part.id)) {
          return false;
        }
        
        // Match by category
        const categoryMatch = category ? part.category === category : 
                             currentPart ? part.category === currentPart.category : false;
        
        // Match by compatible motor
        const motorMatch = compatibleMotorId ? 
                          part.compatibleMotors.includes(compatibleMotorId) : 
                          currentPart ? part.compatibleMotors.some(motor => 
                            currentPart.compatibleMotors.includes(motor)
                          ) : false;
        
        return categoryMatch || motorMatch;
      });
      
      // Sort by relevance: same brand first, then bestsellers, then by rating
      categoryMatches.sort((a, b) => {
        const currentBrand = currentPart?.brand;
        
        // Same brand bonus
        const aBrandMatch = currentBrand && a.brand === currentBrand ? 1 : 0;
        const bBrandMatch = currentBrand && b.brand === currentBrand ? 1 : 0;
        if (aBrandMatch !== bBrandMatch) return bBrandMatch - aBrandMatch;
        
        // Bestseller bonus
        const aBestseller = a.bestseller ? 1 : 0;
        const bBestseller = b.bestseller ? 1 : 0;
        if (aBestseller !== bBestseller) return bBestseller - aBestseller;
        
        // Rating comparison
        const aRating = a.rating || 0;
        const bRating = b.rating || 0;
        if (aRating !== bRating) return bRating - aRating;
        
        // Price comparison (lower price first for similar items)
        const aPrice = a.salePrice || a.price;
        const bPrice = b.salePrice || b.price;
        return aPrice - bPrice;
      });
      
      relatedParts.push(...categoryMatches.slice(0, maxItems - relatedParts.length));
    }
    
    // If we still need more parts, add popular parts from the same brand
    if (relatedParts.length < maxItems && currentPart?.brand) {
      const brandMatches = allParts.filter(part => 
        part.brand === currentPart.brand &&
        !relatedParts.some(rp => rp.id === part.id) &&
        !excludePartIds.includes(part.id)
      ).sort((a, b) => {
        const aRating = a.rating || 0;
        const bRating = b.rating || 0;
        return bRating - aRating;
      });
      
      relatedParts.push(...brandMatches.slice(0, maxItems - relatedParts.length));
    }
    
    // Finally, if we still need more, add any popular parts
    if (relatedParts.length < maxItems) {
      const popularParts = allParts.filter(part => 
        !relatedParts.some(rp => rp.id === part.id) &&
        !excludePartIds.includes(part.id) &&
        (part.bestseller || part.featured || (part.rating && part.rating >= 4.5))
      ).sort((a, b) => {
        const aRating = a.rating || 0;
        const bRating = b.rating || 0;
        return bRating - aRating;
      });
      
      relatedParts.push(...popularParts.slice(0, maxItems - relatedParts.length));
    }
    
    return relatedParts.slice(0, maxItems);
  };

  const relatedParts = getRelatedParts();

  if (relatedParts.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {relatedParts.length === maxItems && (
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View all →
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {relatedParts.map((part) => (
          <PartCard 
            key={part.id} 
            part={part} 
            showCompatibility={!!compatibleMotorId}
          />
        ))}
      </div>
      
      {currentPart && relatedParts.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Why these parts?</p>
              <ul className="space-y-1 text-xs">
                <li>• Compatible with the same motors</li>
                <li>• Frequently bought together by other customers</li>
                <li>• From the same category or brand</li>
                <li>• Recommended for complete maintenance</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}