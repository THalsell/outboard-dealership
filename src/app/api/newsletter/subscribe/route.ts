import { NextResponse } from 'next/server';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

export async function POST(request: Request) {
  try {
    // Check if environment variables are set
    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ADMIN_ACCESS_TOKEN) {
      console.error('Missing Shopify environment variables');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    const { email, firstName, lastName } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('Processing newsletter signup for:', email);

    // Check if customer already exists
    const searchResponse = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/customers/search.json?query=email:${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN!,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!searchResponse.ok) {
      const errorData = await searchResponse.text();
      console.error('Shopify search error details:', errorData);
      throw new Error(`Shopify search error: ${searchResponse.status} - ${errorData}`);
    }

    const searchData = await searchResponse.json();

    if (searchData.customers && searchData.customers.length > 0) {
      const existingCustomer = searchData.customers[0];
      
      // Update existing customer to accept marketing
      const updateResponse = await fetch(
        `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/customers/${existingCustomer.id}.json`,
        {
          method: 'PUT',
          headers: {
            'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN!,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer: {
              id: existingCustomer.id,
              email_marketing_consent: {
                state: 'subscribed',
                opt_in_level: 'confirmed_opt_in',
                consent_updated_at: new Date().toISOString()
              },
              tags: existingCustomer.tags 
                ? `${existingCustomer.tags}, newsletter-subscriber`
                : 'newsletter-subscriber'
            }
          })
        }
      );

      if (!updateResponse.ok) {
        const updateErrorData = await updateResponse.text();
        console.error('Failed to update customer:', updateResponse.status, updateErrorData);
        throw new Error(`Failed to update customer: ${updateResponse.status}`);
      }

      const updateData = await updateResponse.json();
      console.log('Customer updated successfully:', updateData.customer.email_marketing_consent);

      return NextResponse.json({ 
        success: true, 
        message: 'Successfully updated your newsletter preferences!',
        existing: true 
      });
    }

    // Create new customer
    const createResponse = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/customers.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: {
            email: email,
            first_name: firstName || '',
            last_name: lastName || '',
            email_marketing_consent: {
              state: 'subscribed',
              opt_in_level: 'confirmed_opt_in',
              consent_updated_at: new Date().toISOString()
            },
            tags: 'newsletter-subscriber',
            verified_email: false,
            send_email_welcome: false
          }
        })
      }
    );

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      console.error('Failed to create customer:', errorData);
      throw new Error(`Failed to create customer: ${JSON.stringify(errorData)}`);
    }

    const customerData = await createResponse.json();
    console.log('Customer created successfully:', customerData.customer.email_marketing_consent);

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed to our newsletter!',
      customer: customerData.customer
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}