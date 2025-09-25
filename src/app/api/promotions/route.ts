import { NextRequest, NextResponse } from 'next/server';

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get('brand');

  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: 'Shopify configuration missing' },
      { status: 500 }
    );
  }

  try {
    // GraphQL query to fetch promotion metaobjects
    const query = `
      query GetPromotions {
        metaobjects(type: "brand_promotion", first: 100) {
          edges {
            node {
              id
              handle
              fields {
                key
                value
                reference {
                  ... on MediaImage {
                    id
                    image {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error('Failed to fetch promotions');
    }

    // Transform the metaobject data into our promotion format
    type PromotionField = {
      key: string;
      value: string;
      reference?: {
        id?: string;
        image?: {
          url: string;
          altText: string;
          width: number;
          height: number;
        };
      };
    };

    type PromotionEdge = {
      node: {
        id: string;
        handle: string;
        fields: PromotionField[];
      };
    };

    const promotions = data.data?.metaobjects?.edges?.flatMap((edge: PromotionEdge) => {
      const brandPromotions: Array<{
        id: string;
        handle: string;
        brand: string;
        title: string;
        description: string;
        imageUrl: string;
        imageAlt: string;
        imageWidth: number;
        imageHeight: number;
        validUntil: string;
        ctaText: string;
        ctaLink: string;
        badge: string;
        active: boolean;
        priority: number;
      }> = [];
      
      // Check each field for brand-specific file references
      edge.node.fields.forEach((field: PromotionField) => {
        
        // Check for each brand's field (including numbered variants like suzuki1, suzuki2)
        const brandFields = ['yamaha', 'honda', 'mercury', 'suzuki', 'tohatsu', 'freedom'];
        
        // Check if field key starts with any brand name
        let matchedBrand = null;
        for (const brand of brandFields) {
          if (field.key.toLowerCase().startsWith(brand.toLowerCase())) {
            matchedBrand = brand;
            break;
          }
        }
        
        if (matchedBrand && field.reference?.image) {
          const brandName = matchedBrand.charAt(0).toUpperCase() + matchedBrand.slice(1).toLowerCase();
          const image = field.reference.image;
          
          // Use the original image URL directly from Shopify
          const originalImageUrl = image.url;
          

          brandPromotions.push({
            id: `${edge.node.id}-${field.key}`,
            handle: `${edge.node.handle}-${field.key}`,
            brand: brandName,
            title: `${brandName} Promotions`,
            description: image.altText || `Current ${brandName} promotions and special offers`,
            imageUrl: originalImageUrl,
            imageAlt: image.altText || `${brandName} promotion banner`,
            imageWidth: image.width,
            imageHeight: image.height,
            validUntil: '',
            ctaText: 'View Details',
            ctaLink: `/inventory?brand=${brandName}`,
            badge: 'Special Offer',
            active: true,
            priority: 1,
          });
        }
      });
      

      return brandPromotions;
    }) || [];

    // Filter by brand if specified
    type Promotion = {
      id: string;
      handle: string;
      brand: string;
      title: string;
      description: string;
      imageUrl: string;
      imageAlt: string;
      imageWidth: number;
      imageHeight: number;
      validUntil: string;
      ctaText: string;
      ctaLink: string;
      badge: string;
      active: boolean;
      priority: number;
    };


    const filteredPromotions = brand 
      ? promotions.filter((p: Promotion) => {
          const matches = p.brand?.toLowerCase() === brand.toLowerCase() && p.active;
          return matches;
        })
      : promotions.filter((p: Promotion) => p.active);

    // Sort by priority
    filteredPromotions.sort((a: Promotion, b: Promotion) => b.priority - a.priority);

    return NextResponse.json(filteredPromotions);
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch promotions' },
      { status: 500 }
    );
  }
}