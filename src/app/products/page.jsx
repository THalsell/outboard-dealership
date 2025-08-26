'use client';
import { useState, useEffect } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const updateInventory = async (variantId, inventoryItemId, newQuantity) => {
    try {
      // First, get the location ID
      const locationsResponse = await fetch('/api/locations');
      const locationsData = await locationsResponse.json();
      const locationId = locationsData.locations[0].id;

      // Update inventory
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inventory_item_id: inventoryItemId,
          location_id: locationId,
          available: newQuantity,
        }),
      });

      if (response.ok) {
        alert('Inventory updated successfully!');
        fetchProducts(); // Refresh products
      }
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };

  if (loading) return <div className="p-8">Loading products...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Outboard Motors Inventory</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">Vendor: {product.vendor}</p>
            <p className="text-gray-600 mb-4">SKU: {product.variants[0]?.sku}</p>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Variants:</h3>
              {product.variants.map((variant) => (
                <div key={variant.id} className="bg-gray-50 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{variant.title}</span>
                    <span className="font-semibold">${variant.price}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm">Inventory:</span>
                    <input
                      type="number"
                      defaultValue={variant.inventory_quantity}
                      className="w-20 px-2 py-1 border rounded"
                      onBlur={(e) => {
                        if (e.target.value !== variant.inventory_quantity.toString()) {
                          updateInventory(
                            variant.id,
                            variant.inventory_item_id,
                            parseInt(e.target.value)
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}