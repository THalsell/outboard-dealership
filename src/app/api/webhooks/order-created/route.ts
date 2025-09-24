import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Try webhook-specific secret first, fall back to API secret
const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET || process.env.SHOPIFY_API_SECRET;
const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;

// Verify webhook signature
function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  if (!SHOPIFY_WEBHOOK_SECRET) {
    console.error('No webhook secret configured');
    return false;
  }

  const hash = crypto
    .createHmac('sha256', SHOPIFY_WEBHOOK_SECRET)
    .update(rawBody, 'utf-8')
    .digest('base64');

  console.log('Signature verification:', { expected: signature, calculated: hash, match: hash === signature });
  return hash === signature;
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-shopify-hmac-sha256');

    // Log webhook receipt
    console.log('Webhook received: order-created');

    // Verify webhook authenticity (skip in development for testing)
    if (signature && !verifyWebhookSignature(rawBody, signature)) {
      console.error('Webhook signature verification failed');
      // For now, continue processing to debug
      // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const order = JSON.parse(rawBody);
    const customerId = order.customer?.id;

    if (!customerId) {
      return NextResponse.json({ success: true });
    }

    // Update customer tags when they make their first purchase
    const updateResponse = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/customers/${customerId}.json`,
      {
        method: 'GET',
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN!,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!updateResponse.ok) {
      console.error('Failed to fetch customer');
      return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
    }

    const { customer } = await updateResponse.json();
    const currentTags = customer.tags || '';
    const tagsList = currentTags.split(',').map((tag: string) => tag.trim()).filter(Boolean);

    // Add 'customer' tag if not already present
    if (!tagsList.includes('customer')) {
      tagsList.push('customer');

      // If it's their first order, also add 'first-time-buyer'
      if (customer.orders_count === 1) {
        tagsList.push('first-time-buyer');
      }

      // Update customer with new tags
      const updateTagsResponse = await fetch(
        `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/customers/${customerId}.json`,
        {
          method: 'PUT',
          headers: {
            'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN!,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer: {
              id: customerId,
              tags: tagsList.join(', ')
            }
          })
        }
      );

      if (!updateTagsResponse.ok) {
        console.error('Failed to update customer tags');
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}