import { NextResponse } from 'next/server';

export async function GET() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
  
  console.log('Debug Shopify Connection:');
  console.log('Domain:', domain);
  console.log('Storefront token exists:', !!storefrontToken);
  console.log('Admin token exists:', !!adminToken);
  
  const results: {
    storefront?: {
      status: number;
      success: boolean;
      data?: unknown;
      error?: string;
    };
    admin_products?: {
      status: number;
      success: boolean;
      data?: unknown;
    };
    admin_metafields?: {
      status: number;
      success: boolean;
      data?: unknown;
    };
    admin?: {
      error: string;
    };
  } = {};
  
  // Test 1: Storefront API
  const storefrontQuery = `
    query {
      products(first: 1) {
        edges {
          node {
            id
            handle
            title
            metafields(first: 20) {
              namespace
              key
              value
              type
            }
          }
        }
      }
    }
  `;

  try {
    console.log('Testing Storefront API...');
    const storefrontResponse = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontToken!,
      },
      body: JSON.stringify({
        query: storefrontQuery,
      }),
    });

    const storefrontData = await storefrontResponse.json();
    results.storefront = {
      status: storefrontResponse.status,
      success: storefrontResponse.ok,
      data: storefrontData
    };
    
    console.log('Storefront API response:', JSON.stringify(storefrontData, null, 2));
    
  } catch (error) {
    console.error('Storefront API test failed:', error);
    results.storefront = {
      status: 0,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }

  // Test 2: Admin API (REST) - get first product and its metafields
  try {
    console.log('Testing Admin API...');
    const adminProductsResponse = await fetch(`https://${domain}/admin/api/2024-01/products.json?limit=1`, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': adminToken!,
      },
    });

    if (adminProductsResponse.ok) {
      const adminProductsData = await adminProductsResponse.json();
      results.admin_products = {
        status: adminProductsResponse.status,
        success: true,
        data: adminProductsData
      };

      // If we got a product, try to get its metafields
      if (adminProductsData.products && adminProductsData.products.length > 0) {
        const productId = adminProductsData.products[0].id;
        console.log('Getting metafields for product:', productId);
        
        const metafieldsResponse = await fetch(`https://${domain}/admin/api/2024-01/products/${productId}/metafields.json`, {
          method: 'GET',
          headers: {
            'X-Shopify-Access-Token': adminToken!,
          },
        });

        if (metafieldsResponse.ok) {
          const metafieldsData = await metafieldsResponse.json();
          results.admin_metafields = {
            status: metafieldsResponse.status,
            success: true,
            data: metafieldsData
          };
          console.log('Admin API metafields:', JSON.stringify(metafieldsData, null, 2));
        }
      }
    }
    
  } catch (error) {
    console.error('Admin API test failed:', error);
    results.admin = {
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }

  return NextResponse.json({
    results,
    environment: {
      domain: domain,
      hasStorefrontToken: !!storefrontToken,
      hasAdminToken: !!adminToken,
      storefrontTokenLength: storefrontToken?.length,
      adminTokenLength: adminToken?.length
    }
  });
}