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
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
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
        metafields(first: 10) {
          edges {
            node {
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
        variables: { handle },
      }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const data = await response.json();
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