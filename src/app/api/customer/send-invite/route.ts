import { NextResponse } from 'next/server';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

export async function POST(request: Request) {
  try {
    const { customerId } = await request.json();

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    // Send account invite
    const inviteResponse = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/customers/${customerId}/send_invite.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_invite: {
            subject: 'Welcome to Our Store!',
            custom_message: 'Thank you for subscribing! Activate your account to track orders and manage your preferences.'
          }
        })
      }
    );

    if (!inviteResponse.ok) {
      const errorData = await inviteResponse.text();
      console.error('Failed to send invite:', errorData);
      return NextResponse.json(
        { error: 'Failed to send account invite' },
        { status: 500 }
      );
    }

    const inviteData = await inviteResponse.json();

    return NextResponse.json({
      success: true,
      message: 'Account invite sent successfully',
      invite: inviteData
    });

  } catch (error) {
    console.error('Send invite error:', error);
    return NextResponse.json(
      { error: 'Failed to send invite' },
      { status: 500 }
    );
  }
}