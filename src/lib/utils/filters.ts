import { Motor } from '@/types/models/motor';

export interface FilterParams {
  hp?: string;
  brand?: string;
  condition?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: string;
  fuelType?: string;
}

export function parseHorsepowerRange(hpRange: string): { min: number; max: number } {
  if (hpRange.includes('+')) {
    const min = parseFloat(hpRange.replace('+', ''));
    return { min, max: 9999 };
  }
  
  const [minStr, maxStr] = hpRange.split('-');
  return {
    min: parseFloat(minStr),
    max: parseFloat(maxStr)
  };
}

export function filterMotors(motors: Motor[], filters: FilterParams): Motor[] {
  let filtered = [...motors];

  // Filter by horsepower range
  if (filters.hp) {
    const { min, max } = parseHorsepowerRange(filters.hp);
    filtered = filtered.filter(motor => 
      motor.horsepower >= min && motor.horsepower <= max
    );
  }

  // Filter by brand
  if (filters.brand) {
    filtered = filtered.filter(motor => 
      motor.brand.toLowerCase() === filters.brand!.toLowerCase()
    );
  }

  // Filter by condition
  if (filters.condition) {
    filtered = filtered.filter(motor => 
      motor.condition === filters.condition
    );
  }

  // Filter by status (sale, overstock, etc.)
  if (filters.status) {
    switch (filters.status) {
      case 'sale':
        filtered = filtered.filter(motor => motor.salePrice && motor.salePrice < motor.price);
        break;
      case 'overstock':
        filtered = filtered.filter(motor => motor.stockQuantity && motor.stockQuantity > 10);
        break;
      case 'instock':
        filtered = filtered.filter(motor => motor.inStock);
        break;
    }
  }

  // Filter by price range
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(motor => {
      const price = motor.salePrice || motor.price;
      return price >= filters.minPrice!;
    });
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(motor => {
      const price = motor.salePrice || motor.price;
      return price <= filters.maxPrice!;
    });
  }

  // Filter by type
  if (filters.type) {
    filtered = filtered.filter(motor => 
      motor.type === filters.type
    );
  }

  // Filter by fuel type
  if (filters.fuelType) {
    filtered = filtered.filter(motor => 
      motor.fuelType === filters.fuelType
    );
  }

  return filtered;
}

export function getFilterTitle(filters: FilterParams): string {
  const titles: string[] = [];

  if (filters.hp) {
    const hpDisplay = filters.hp.includes('+') 
      ? `${filters.hp.replace('+', '')}+ HP` 
      : `${filters.hp.replace('-', '-')} HP`;
    titles.push(hpDisplay);
  }

  if (filters.brand) {
    titles.push(filters.brand.charAt(0).toUpperCase() + filters.brand.slice(1));
  }

  if (filters.condition) {
    titles.push(filters.condition.charAt(0).toUpperCase() + filters.condition.slice(1));
  }

  if (filters.status === 'sale') {
    titles.push('On Sale');
  } else if (filters.status === 'overstock') {
    titles.push('Overstock');
  }

  return titles.length > 0 ? titles.join(' - ') : 'All Motors';
}

export function getFilterDescription(filters: FilterParams, totalCount: number): string {
  const parts: string[] = [];

  if (filters.hp) {
    const hpDisplay = filters.hp.includes('+') 
      ? `${filters.hp.replace('+', '')}+ horsepower` 
      : `${filters.hp.replace('-', ' to ')} horsepower`;
    parts.push(hpDisplay);
  }

  if (filters.brand) {
    parts.push(`${filters.brand} brand`);
  }

  if (filters.condition) {
    parts.push(`${filters.condition} condition`);
  }

  if (filters.status === 'sale') {
    parts.push('currently on sale');
  } else if (filters.status === 'overstock') {
    parts.push('overstock items');
  }

  const description = parts.length > 0 
    ? `Browse ${totalCount} outboard motors with ${parts.join(', ')}`
    : `Browse all ${totalCount} outboard motors in our inventory`;

  return description;
}