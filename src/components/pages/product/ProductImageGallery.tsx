'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types/product';

interface ProductImageGalleryProps {
  images: ProductImage[];
  title: string;
}

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Use placeholder if no images or image error
  const displayImages = images.length > 0 && !imageError 
    ? images 
    : [{ src: '/placeholder-motor.svg', alt: title, position: 1 }];

  const selectedImage = displayImages[selectedImageIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square bg-gradient-to-b from-gray-50 to-white rounded-xl overflow-hidden border border-gray-200">
        <div className="relative w-full h-full p-8">
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt || title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            priority
            onError={() => setImageError(true)}
          />
        </div>
      </div>

      {/* Thumbnail Images */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImageIndex === index
                  ? 'border-deep-blue ring-2 ring-deep-blue/20'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="relative w-full h-full bg-gray-50 p-2">
                <Image
                  src={image.src}
                  alt={image.alt || `${title} view ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {displayImages.length > 1 && (
        <div className="text-center text-sm text-gray-500">
          {selectedImageIndex + 1} of {displayImages.length}
        </div>
      )}
    </div>
  );
}