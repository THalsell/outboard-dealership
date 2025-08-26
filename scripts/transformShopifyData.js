import fs from 'fs';
import path from 'path';

// Read and parse CSV
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const rows = [];
  let currentRow = [];
  let inQuotes = false;
  let currentField = '';
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    
    for (let j = 0; j < line.length;จ++) {
      const char = line[j];
      const nextChar = line[j + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          currentField += '"';
          j++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        currentRow.push(currentField);
        currentField = '';
      } else {
        currentField += char;
      }
    }
    
    if (!inQuotes) {
      currentRow.push(currentField);
      if (currentRow.length === headers.length) {
        rows.push(currentRow);
        currentRow = [];
        currentField = '';
      } else {
        currentField += '\n';
      }
    } else {
      currentField += '\n';
    }
  }
  
  return { headers, rows };
}

// Transform Shopify data to our format
function transformShopifyProducts(csvPath) {
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  
  // Parse CSV - it's actually comma-delimited with quoted fields
  const lines = [];
  let currentLine = '';
  let inQuotes = false;
  
  for (let i = 0; i < csvContent.length; i++) {
    const char = csvContent[i];
    const nextChar = csvContent[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentLine += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === '\n' && !inQuotes) {
      if (currentLine.trim()) {
        lines.push(currentLine);
      }
      currentLine = '';
    } else {
      currentLine += char;
    }
  }
  if (currentLine.trim()) {
    lines.push(currentLine);
  }
  
  // Parse header and rows
  const parseRow = (line) => {
    const values = [];
    let currentValue = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          currentValue += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue);
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue);
    return values;
  };
  
  const headers = parseRow(lines[0]);
  
  const products = new Map();
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseRow(lines[i]);
    const row = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
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
      const hp = parseInt(title.match(/(\d+)HP/i)?.[1] || '0');
      
      if (hp <= 30) powerCategory = 'portable';
      else if (hp <= 100) powerCategory = 'mid-range';
      else if (hp <= 200) powerCategory = 'high-performance';
      else powerCategory = 'commercial';
      
      products.set(handle, {
        id: handle,
        handle,
        title: row['Title'],
        description,
        vendor: row['Vendor'],
        type: row['Type'] || 'Outboard Motor',
        tags,
        category,
        powerCategory,
        published: row['Published'] === 'true',
        images: [],
        specs,
        variants: [],
        priceRange: { min: Infinity, max: 0 },
        inStock: false
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
      product.priceRange.min = Math.min(product.priceRange.min, price);
      product.priceRange.max = Math.max(product.priceRange.max, price);
      
      // Update stock status
      if (quantity > 0) product.inStock = true;
    }
    
    // Add image if present
    if (row['Image Src'] && !product.images.some(img => img.src === row['Image Src'])) {
      product.images.push({
        src: row['Image Src'],
        position: parseInt(row['Image Position']) || 1,
        alt: row['Image Alt Text'] || product.title
      });
    }
  }
  
  return Array.from(products.values());
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
  type: string;
  tags: string[];
  category: string;
  powerCategory: string;
  published: boolean;
  images: ProductImage[];
  specs: Record<string, string>;
  variants: ProductVariant[];
  priceRange: {
    min: number;
    max: number;
  };
  inStock: boolean;
}

export const products: Product[] = ${JSON.stringify(products, null, 2)};

// Helper functions
export function getProductByHandle(handle: string): Product | undefined {
  return products.find(p => p.handle === handle);
}

export function getProductsByVendor(vendor: string): Product[] {
  return products.filter(p => p.vendor === vendor);
}

export function getProductsByPowerCategory(category: string): Product[] {
  return products.filter(p => p.powerCategory === category);
}

export function getProductsByPriceRange(min: number, max: number): Product[] {
  return products.filter(p => p.priceRange.min >= min && p.priceRange.max <= max);
}

export function getFeaturedProducts(limit: number = 8): Product[] {
  return products
    .filter(p => p.published && p.inStock)
    .sort((a, b) => b.variants[0]?.inventory - a.variants[0]?.inventory)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return products.filter(p => 
    p.title.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    p.vendor.toLowerCase().includes(searchTerm) ||
    p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
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
  const summary = {
    totalProducts: products.length,
    vendors: [...new Set(products.map(p => p.vendor))],
    totalVariants: products.reduce((sum, p) => sum + p.variants.length, 0),
    inStock: products.filter(p => p.inStock).length,
    priceRange: {
      min: Math.min(...products.map(p => p.priceRange.min)),
      max: Math.max(...products.map(p => p.priceRange.max))
    }
  };
  
  console.log('\nSummary:', summary);
  
} catch (error) {
  console.error('Error transforming Shopify data:', error);
  process.exit(1);
}