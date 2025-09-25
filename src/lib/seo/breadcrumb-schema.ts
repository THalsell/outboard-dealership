interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Pre-defined breadcrumb patterns for common pages
export const BREADCRUMB_PATTERNS = {
  home: () => [
    { name: "Home", url: "https://outboardmotorsales.com" }
  ],

  inventory: () => [
    { name: "Home", url: "https://outboardmotorsales.com" },
    { name: "Inventory", url: "https://outboardmotorsales.com/inventory" }
  ],

  inventoryBrand: (brand: string) => [
    { name: "Home", url: "https://outboardmotorsales.com" },
    { name: "Inventory", url: "https://outboardmotorsales.com/inventory" },
    { name: `${brand} Motors`, url: `https://outboardmotorsales.com/inventory?brand=${brand.toLowerCase()}` }
  ],

  product: (productTitle: string, slug: string) => [
    { name: "Home", url: "https://outboardmotorsales.com" },
    { name: "Inventory", url: "https://outboardmotorsales.com/inventory" },
    { name: productTitle, url: `https://outboardmotorsales.com/inventory/${slug}` }
  ],

  parts: () => [
    { name: "Home", url: "https://outboardmotorsales.com" },
    { name: "Parts & Service", url: "https://outboardmotorsales.com/parts" }
  ],

  financing: () => [
    { name: "Home", url: "https://outboardmotorsales.com" },
    { name: "Financing", url: "https://outboardmotorsales.com/financing" }
  ],

  financingOffers: () => [
    { name: "Home", url: "https://outboardmotorsales.com" },
    { name: "Financing", url: "https://outboardmotorsales.com/financing" },
    { name: "Special Offers", url: "https://outboardmotorsales.com/financing/offers" }
  ],

  financingApplication: () => [
    { name: "Home", url: "https://outboardmotorsales.com" },
    { name: "Financing", url: "https://outboardmotorsales.com/financing" },
    { name: "Apply Now", url: "https://outboardmotorsales.com/financing/application" }
  ],

  about: () => [
    { name: "Home", url: "https://outboardmotorsales.com" },
    { name: "About Us", url: "https://outboardmotorsales.com/about" }
  ],

  learn: () => [
    { name: "Home", url: "https://outboardmotorsales.com" },
    { name: "Learn", url: "https://outboardmotorsales.com/learn" }
  ],

  guides: () => [
    { name: "Home", url: "https://outboardmotorsales.com" },
    { name: "Learn", url: "https://outboardmotorsales.com/learn" },
    { name: "Buying Guides", url: "https://outboardmotorsales.com/learn/guides" }
  ],

  faqs: () => [
    { name: "Home", url: "https://outboardmotorsales.com" },
    { name: "Learn", url: "https://outboardmotorsales.com/learn" },
    { name: "FAQs", url: "https://outboardmotorsales.com/learn/faqs" }
  ],

  compare: () => [
    { name: "Home", url: "https://outboardmotorsales.com" },
    { name: "Compare Motors", url: "https://outboardmotorsales.com/compare" }
  ]
};