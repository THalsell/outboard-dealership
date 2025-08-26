import { NextResponse } from 'next/server';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

export async function GET(request) {
  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/products.json?limit=250`,
      {
        method: 'GET',
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}