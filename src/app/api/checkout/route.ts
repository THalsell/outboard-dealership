import { NextRequest, NextResponse } from 'next/server';
import { storefrontClient } from '@/lib/shopify/client';
import { CartItem } from '@/types/cart';

export async function POST(request: NextRequest) {
  try {
    if (!storefrontClient.domain || !storefrontClient.storefrontAccessToken) {
      return NextResponse.json(
        { error: 'Missing Shopify configuration' },
        { status: 500 }
      );
    }

    const { items }: { items: CartItem[] } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Create line items for Shopify Cart API
    const lineItems = items.map(item => {
      if (!item.variantId) {
        console.error('Missing variantId for item:', item);
        throw new Error(`Product ${item.name} is missing variant ID. Cannot create checkout.`);
      }
      return {
        merchandiseId: item.variantId, // Already includes gid://shopify/ProductVariant/ prefix
        quantity: item.quantity
      };
    });

    // GraphQL mutation to create cart
    const cartCreateMutation = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            lines(first: 250) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        lines: lineItems
      }
    };

    const response = await fetch(
      `https://${storefrontClient.domain}/api/${storefrontClient.apiVersion}/graphql.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token': storefrontClient.storefrontAccessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: cartCreateMutation,
          variables: variables
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return NextResponse.json(
        { error: 'Failed to create cart' },
        { status: 500 }
      );
    }

    if (data.data.cartCreate.userErrors.length > 0) {
      console.error('Cart user errors:', data.data.cartCreate.userErrors);
      return NextResponse.json(
        { error: 'Invalid cart data' },
        { status: 400 }
      );
    }

    const cart = data.data.cartCreate.cart;

    return NextResponse.json({
      success: true,
      checkoutUrl: cart.checkoutUrl,
      cartId: cart.id
    });

  } catch (error) {
    console.error('Checkout creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout' },
      { status: 500 }
    );
  }
}