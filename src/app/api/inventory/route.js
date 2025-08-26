import { NextResponse } from 'next/server';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const inventoryItemIds = searchParams.get('inventory_item_ids');
  
  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/inventory_levels.json?inventory_item_ids=${inventoryItemIds}&limit=250`,
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
      { error: 'Failed to fetch inventory' },
      { status: 500 }
    );
  }
}

// Update inventory level
export async function POST(request) {
  const body = await request.json();
  const { inventory_item_id, location_id, available } = body;

  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/inventory_levels/set.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inventory_item_id,
          location_id,
          available,
        }),
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update inventory' },
      { status: 500 }
    );
  }
}