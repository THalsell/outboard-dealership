import { Product } from '@/lib/data/products';

export function getSpecValue(product: Product, key: string): string {
  switch (key) {
    case 'Price':
      return product.variants[0]?.price ? `$${product.variants[0].price.toLocaleString()}` : '';

    case 'Horsepower':
      return product.horsepower > 0 ? `${product.horsepower} HP` : '';

    case 'Brand':
      return product.brand || '';

    case 'Model':
      return product.title || '';

    case 'SKU':
      return product.variants[0]?.sku || '';

    case 'Type':
      return product.type || '';

    case 'Power Category':
      return product.powerCategory ?
        product.powerCategory.split('-').map(word =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ') : '';

    case 'Condition':
      return (product.condition || 'new').charAt(0).toUpperCase() + (product.condition || 'new').slice(1);

    case 'Weight':
      if (product.variants[0]?.weight && product.variants[0].weight > 0) {
        return `${product.variants[0].weight} ${product.variants[0].weightUnit || 'lbs'}`;
      }
      if (product.weight && product.weight > 0) return `${product.weight} lbs`;
      return product.specs?.['Weight'] || product.specs?.['weight'] || product.specs?.['weight_lbs'] || '';

    case 'Shaft Length':
      if (product.shaftLength) return product.shaftLength;
      if (product.variants[0]?.option1Name?.toLowerCase().includes('shaft')) {
        return product.variants[0].option1Value || '';
      }
      return product.specs?.['Shaft Length'] || product.specs?.['custom.shaft_length'] ||
             product.specs?.['shaft_length'] || product.specs?.['Physical.shaft_length'] || '';

    case 'Recommended Cooling':
      return product.specs?.['Cooling System'] || product.specs?.['cooling_system'] || '';

    case 'Starting Method':
      return product.specs?.['Starting System'] || product.specs?.['starting_system'] || '';

    case 'Fuel Induction':
      return product.specs?.['Fuel Induction System'] || product.specs?.['fuel_induction_system'] || '';

    case 'Lubrication':
      return product.specs?.['Lubrication System'] || product.specs?.['lubrication_system'] || '';

    case 'Full Throttle RPM Range':
      return product.specs?.['Throttle Control'] || product.specs?.['throttle_control'] || '';

    case 'Gear Shift':
      return product.specs?.['Shift System'] || product.specs?.['shift_system'] || '';

    default:
      // Try multiple key variations for specs lookup
      return product.specs?.[key] ||
             product.specs?.[key.toLowerCase()] ||
             product.specs?.[key.replace(/ /g, '_')] ||
             product.specs?.[key.replace(/ /g, '_').toLowerCase()] ||
             product.specs?.[key.replace(/\s+/g, '')] ||
             product.specs?.[key.replace(/\s+/g, '').toLowerCase()] ||
             '';
  }
}