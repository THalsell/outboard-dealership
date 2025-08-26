const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Transform Shopify data to our format
function transformShopifyProducts(csvPath) {
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  
  // Parse CSV using csv-parse library
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    trim: true
  });
  
  const products = new Map();
  
  for (const row of records) {
    const handle = row['Handle'];
    if (!handle) continue;
    
    if (!products.has(handle)) {
      // Parse HTML body to extract specs
      const bodyHtml = row['Body (HTML)'] || '';
      const specs = {};
      
      // Extract list items from HTML
      const listItems = bodyHtml.match(/<li>(.*?)<\/li>/g) || [];
      listItems.forEach(item => {
        const text = item.replace(/<\/?li>/g, '').trim();
        const [key, ...valueParts] = text.split(':');
        if (key && valueParts.length > 0) {
          specs[key.trim()] = valueParts.join(':').trim();
        }
      });
      
      // Extract description (paragraph text)
      const descMatch = bodyHtml.match(/<p>(.*?)<\/p>/);
      const description = descMatch ? descMatch[1].replace(/<[^>]*>/g, '') : '';
      
      // Parse tags
      const tags = (row['Tags'] || '').split(',').map(t => t.trim()).filter(Boolean);
      
      // Determine category based on tags and title
      let category = 'outboard';
      let powerCategory = 'mid-range';
      
      const title = row['Title'] || '';
      // Parse horsepower from title - handle formats like "250HP", "9.9HP", "F150", "VF250"
      let hp = 0;
      const hpMatch = title.match(/(\d+(?:\.\d+)?)\s*HP/i);
      if (hpMatch) {
        hp = parseFloat(hpMatch[1]);
      } else {
        // Try to extract from model numbers like F150, VF250, BF115
        const modelMatch = title.match(/[A-Z]*(\d+)/);
        if (modelMatch && parseInt(modelMatch[1]) > 1 && parseInt(modelMatch[1]) < 500) {
          hp = parseInt(modelMatch[1]);
        }
      }
      
      if (hp <= 30) powerCategory = 'portable';
      else if (hp <= 100) powerCategory = 'mid-range';
      else if (hp <= 200) powerCategory = 'high-performance';
      else powerCategory = 'commercial';
      
      // Extract brand from vendor
      let brand = row['Vendor'] || '';
      if (brand.includes('Yamaha')) brand = 'Yamaha';
      else if (brand.includes('Mercury')) brand = 'Mercury';
      else if (brand.includes('Honda')) brand = 'Honda';
      else if (brand.includes('Suzuki')) brand = 'Suzuki';
      else if (brand.includes('Tohatsu')) brand = 'Tohatsu';
      
      products.set(handle, {
        id: handle,
        handle,
        title: row['Title'],
        description,
        vendor: row['Vendor'],
        brand,
        type: row['Type'] || 'Outboard Motor',
        tags,
        category,
        powerCategory,
        horsepower: hp,
        published: row['Published'] === 'true',
        images: [],
        specs,
        variants: [],
        priceRange: { min: Infinity, max: 0 },
        inStock: false,
        status: row['Status'] || 'active'
      });
    }
    
    const product = products.get(handle);
    
    // Add variant
    if (row['Variant SKU']) {
      const price = parseFloat(row['Variant Price']) || 0;
      const comparePrice = parseFloat(row['Variant Compare At Price']) || price;
      const quantity = parseInt(row['Variant Inventory Qty']) || 0;
      
      const variant = {
        sku: row['Variant SKU'],
        option1Name: row['Option1 Name'],
        option1Value: row['Option1 Value'],
        option2Name: row['Option2 Name'],
        option2Value: row['Option2 Value'],
        price,
        compareAtPrice: comparePrice,
        weight: parseFloat(row['Variant Grams']) || 0,
        weightUnit: row['Variant Weight Unit'] || 'kg',
        inventory: quantity,
        available: quantity > 0,
        barcode: row['Variant Barcode'],
        taxable: row['Variant Taxable'] === 'true',
        requiresShipping: row['Variant Requires Shipping'] === 'true',
        costPerItem: parseFloat(row['Cost per item']) || 0
      };
      
      product.variants.push(variant);
      
      // Update price range
      if (price > 0) {
        product.priceRange.min = Math.min(product.priceRange.min, price);
        product.priceRange.max = Math.max(product.priceRange.max, price);
      }
      
      // Update stock status
      if (quantity > 0) product.inStock = true;
    }
    
    // Add image if present
    if (row['Image Src'] && row['Image Src'].startsWith('http')) {
      if (!product.images.some(img => img.src === row['Image Src'])) {
        product.images.push({
          src: row['Image Src'],
          position: parseInt(row['Image Position']) || 1,
          alt: row['Image Alt Text'] || product.title
        });
      }
    }
  }
  
  // Fix price ranges for products with no valid prices
  return Array.from(products.values()).map(product => {
    if (product.priceRange.min === Infinity) {
      product.priceRange.min = 0;
      product.priceRange.max = 0;
    }
    return product;
  });
}

// Generate TypeScript data file
function generateDataFile(products) {
  const content = `// Auto-generated from Shopify product export
// Generated on ${new Date().toISOString()}

export interface ProductVariant {
  sku: string;
  option1Name?: string;
  option1Value?: string;
  option2Name?: string;
  option2Value?: string;
  price: number;
  compareAtPrice: number;
  weight: number;
  weightUnit: string;
  inventory: number;
  available: boolean;
  barcode?: string;
  taxable: boolean;
  requiresShipping: boolean;
  costPerItem: number;
}

export interface ProductImage {
  src: string;
  position: number;
  alt: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  brand: string;
  type: string;
  tags: string[];
  category: string;
  powerCategory: string;
  horsepower: number;
  published: boolean;
  images: ProductImage[];
  specs: Record<string, string>;
  variants: ProductVariant[];
  priceRange: {
    min: number;
    max: number;
  };
  inStock: boolean;
  status: string;
}

export const products: Product[] = ${JSON.stringify(products, null, 2)};

// Helper functions
export function getProductByHandle(handle: string): Product | undefined {
  return products.find(p => p.handle === handle);
}

export function getProductsByVendor(vendor: string): Product[] {
  return products.filter(p => p.vendor === vendor);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter(p => p.brand === brand);
}

export function getProductsByPowerCategory(category: string): Product[] {
  return products.filter(p => p.powerCategory === category);
}

export function getProductsByHorsepowerRange(min: number, max: number): Product[] {
  return products.filter(p => p.horsepower >= min && p.horsepower <= max);
}

export function getProductsByPriceRange(min: number, max: number): Product[] {
  return products.filter(p => 
    p.priceRange.min <= max && p.priceRange.max >= min
  );
}

export function getFeaturedProducts(limit: number = 8): Product[] {
  return products
    .filter(p => p.published && p.inStock)
    .sort((a, b) => {
      // Sort by inventory count (highest first)
      const aInventory = a.variants.reduce((sum, v) => sum + v.inventory, 0);
      const bInventory = b.variants.reduce((sum, v) => sum + v.inventory, 0);
      return bInventory - aInventory;
    })
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return products.filter(p => 
    p.title.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    p.vendor.toLowerCase().includes(searchTerm) ||
    p.brand.toLowerCase().includes(searchTerm) ||
    p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

// Get unique brands
export function getBrands(): string[] {
  return [...new Set(products.map(p => p.brand).filter(Boolean))];
}

// Get unique power categories
export function getPowerCategories(): string[] {
  return [...new Set(products.map(p => p.powerCategory).filter(Boolean))];
}
`;
  
  return content;
}

// Main execution
try {
  console.log('Starting Shopify data transformation...');
  
  const csvPath = path.join(__dirname, '..', 'products_export_1 (1).csv');
  const products = transformShopifyProducts(csvPath);
  
  console.log(`Transformed ${products.length} products`);
  
  // Generate TypeScript data file
  const dataContent = generateDataFile(products);
  const outputPath = path.join(__dirname, '..', 'src', 'lib', 'data', 'products.ts');
  
  // Ensure directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, dataContent);
  console.log(`Generated product data file at: ${outputPath}`);
  
  // Generate summary
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
  const summary = {
    totalProducts: products.length,
    brands,
    vendors: [...new Set(products.map(p => p.vendor))],
    totalVariants: products.reduce((sum, p) => sum + p.variants.length, 0),
    inStock: products.filter(p => p.inStock).length,
    priceRange: {
      min: Math.min(...products.filter(p => p.priceRange.min > 0).map(p => p.priceRange.min)),
      max: Math.max(...products.map(p => p.priceRange.max))
    },
    powerCategories: [...new Set(products.map(p => p.powerCategory))],
    horsepowerRange: {
      min: Math.min(...products.filter(p => p.horsepower > 0).map(p => p.horsepower)),
      max: Math.max(...products.map(p => p.horsepower))
    }
  };
  
  console.log('\nSummary:', JSON.stringify(summary, null, 2));
  
} catch (error) {
  console.error('Error transforming Shopify data:', error);
  process.exit(1);
}