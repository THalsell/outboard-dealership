// Shopify configuration without SDK dependency

// Storefront API client for public data
export const storefrontClient = {
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN as string,
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
  apiVersion: '2024-01',
};

// Helper function to fetch products from Storefront API
export async function fetchProducts(query: string = '', first: number = 20): Promise<unknown[]> {
  const graphqlQuery = `
    query getProducts($first: Int!, $query: String) {
      products(first: $first, query: $query) {
        edges {
          node {
            id
            title
            handle
            description
            vendor
            productType
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  sku
                  availableForSale
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            metafields(identifiers: [
              {namespace: "custom", key: "horsepower"},
              {namespace: "custom", key: "manufacturer"},
              {namespace: "custom", key: "model_number"},
              {namespace: "custom", key: "condition"},
              {namespace: "custom", key: "displacement"},
              {namespace: "custom", key: "cylinders"},
              {namespace: "custom", key: "stroke_type"},
              {namespace: "custom", key: "engine_type"},
              {namespace: "custom", key: "cooling_system"},
              {namespace: "custom", key: "ignition"},
              {namespace: "custom", key: "starting_system"},
              {namespace: "custom", key: "fuel_induction_system"},
              {namespace: "custom", key: "compression_ratio"},
              {namespace: "custom", key: "bore_x_stroke"},
              {namespace: "custom", key: "weight"},
              {namespace: "custom", key: "shaft_length"},
              {namespace: "custom", key: "width"},
              {namespace: "custom", key: "width_w"},
              {namespace: "custom", key: "gear_ratio"},
              {namespace: "custom", key: "propeller"},
              {namespace: "custom", key: "tilt_positions"},
              {namespace: "custom", key: "power_trim_tilt"},
              {namespace: "custom", key: "fuel_tank_type"},
              {namespace: "custom", key: "tank_type"},
              {namespace: "custom", key: "fuel_type"},
              {namespace: "custom", key: "recommended_oil"},
              {namespace: "custom", key: "lubrication_system"},
              {namespace: "custom", key: "throttle_control"},
              {namespace: "custom", key: "steering"},
              {namespace: "custom", key: "shift_system"},
              {namespace: "custom", key: "control_type"},
              {namespace: "custom", key: "steering_type"},
              {namespace: "custom", key: "warranty_period"},
              {namespace: "custom", key: "extended_warranty_available"},
              {namespace: "custom", key: "service_intervals"},
              {namespace: "custom", key: "brand"},
              {namespace: "custom", key: "model"},
              {namespace: "custom", key: "sku"},
              {namespace: "custom", key: "type"},
              {namespace: "custom", key: "power_category"},
              {namespace: "custom", key: "stock_status"}
            ]) {
              namespace
              key
              value
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${storefrontClient.domain}/api/${storefrontClient.apiVersion}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontClient.storefrontAccessToken,
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { first, query },
      }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.data || !data.data.products) {
      console.error('No products data found:', data);
      return [];
    }
    
    return data.data.products.edges.map((edge: { node: unknown }) => edge.node);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Helper function to fetch a single product by handle
export async function fetchProduct(handle: string): Promise<unknown> {
  const graphqlQuery = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              quantityAvailable
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
        options {
          name
          values
        }
        metafields(identifiers: [
          {namespace: "custom", key: "displacement"},
          {namespace: "custom", key: "cylinders"},
          {namespace: "custom", key: "stroke_type"},
          {namespace: "custom", key: "engine_type"},
          {namespace: "custom", key: "cooling_system"},
          {namespace: "custom", key: "ignition"},
          {namespace: "custom", key: "starting_system"},
          {namespace: "custom", key: "fuel_induction_system"},
          {namespace: "custom", key: "compression_ratio"},
          {namespace: "custom", key: "bore_x_stroke"},
          {namespace: "custom", key: "weight"},
          {namespace: "custom", key: "shaft_length"},
          {namespace: "custom", key: "width"},
          {namespace: "custom", key: "width_w"},
          {namespace: "custom", key: "gear_ratio"},
          {namespace: "custom", key: "propeller"},
          {namespace: "custom", key: "tilt_positions"},
          {namespace: "custom", key: "power_trim_tilt"},
          {namespace: "custom", key: "fuel_tank_type"},
          {namespace: "custom", key: "tank_type"},
          {namespace: "custom", key: "fuel_type"},
          {namespace: "custom", key: "recommended_oil"},
          {namespace: "custom", key: "lubrication_system"},
          {namespace: "custom", key: "throttle_control"},
          {namespace: "custom", key: "steering"},
          {namespace: "custom", key: "shift_system"},
          {namespace: "custom", key: "control_type"},
          {namespace: "custom", key: "steering_type"},
          {namespace: "custom", key: "warranty_period"},
          {namespace: "custom", key: "extended_warranty_available"},
          {namespace: "custom", key: "service_intervals"},
          {namespace: "custom", key: "horsepower"},
          {namespace: "custom", key: "brand"},
          {namespace: "custom", key: "model"},
          {namespace: "custom", key: "sku"},
          {namespace: "custom", key: "type"},
          {namespace: "custom", key: "power_category"},
          {namespace: "custom", key: "condition"},
          {namespace: "custom", key: "stock_status"}
        ]) {
          namespace
          key
          value
          type
        }
      }
    }
  `;

  try {
    console.log('Making Shopify API call for handle:', handle);
    console.log('Store domain:', storefrontClient.domain);
    console.log('API version:', storefrontClient.apiVersion);
    console.log('Has access token:', !!storefrontClient.storefrontAccessToken);
    
    const response = await fetch(`https://${storefrontClient.domain}/api/${storefrontClient.apiVersion}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontClient.storefrontAccessToken,
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { handle },
      }),
    });

    console.log('Shopify API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Shopify API error response:', errorText);
      throw new Error(`Shopify API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Shopify API response data:', JSON.stringify(data, null, 2));
    
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
    }
    
    return data.data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Helper function to create checkout
export async function createCheckout(lineItems: unknown[] = []): Promise<unknown> {
  const graphqlQuery = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          totalTax {
            amount
            currencyCode
          }
          subtotalPrice {
            amount
            currencyCode
          }
          totalPrice {
            amount
            currencyCode
          }
          lineItems(first: 10) {
            edges {
              node {
                id
                title
                quantity
              }
            }
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${storefrontClient.domain}/api/${storefrontClient.apiVersion}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontClient.storefrontAccessToken,
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: {
          input: {
            lineItems,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.data.checkoutCreate.checkoutUserErrors.length > 0) {
      throw new Error(data.data.checkoutCreate.checkoutUserErrors[0].message);
    }

    return data.data.checkoutCreate.checkout;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
}

// Export functions for use in API routes