export const siteConfig = {
  name: "Outboard Motor Sales",
  description:
    "Your trusted source for new and used outboard motors. Honda, Yamaha, Mercury, Freedom, Suzuki, Tohatsu authorized dealer.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://outboardmotorsales.com",
  ogImage: "/og-image.jpg",

  business: {
    name: "Outboard Motor Sales",
    alternativeName: "Clay Powersports Marine",
    type: "BoatDealer",
  },

  contact: {
    phone: "(931) 243-4555",
    email: "eli@claypowersports.com",
    address: {
      street: "615 West Lake Avenue",
      city: "Celina",
      state: "TN",
      stateCode: "TN",
      zip: "38551",
      country: "United States",
      countryCode: "US",
    },
    coordinates: {
      latitude: 36.55205,
      longitude: -85.51139,
    },
  },

  hours: {
    weekdays: {
      open: "08:00",
      close: "17:00",
      display: "8:00 AM - 5:00 PM",
    },
    saturday: {
      open: "08:00",
      close: "12:00",
      display: "8:00 AM - 12:00 PM",
    },
    sunday: {
      display: "Closed",
      closed: true,
    },
  },

  social: {
    facebook: "https://facebook.com/outboardmotorsales",
    instagram: "https://instagram.com/outboardmotorsales",
    youtube: "https://youtube.com/outboardmotorsales",
    twitter: "https://twitter.com/outboardmotorsales",
  },

  shopify: {
    domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    storefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    adminToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
    apiVersion: "2024-01",
    storeUrl: "https://outboard-practice-store.myshopify.com",
  },

  features: {
    freeShipping: true,
    freeShippingThreshold: 0,
    freeShippingRegions: ["Lower 48 States"],
    liftGateAvailable: true,
    liftGatePrice: 99,
    financingAvailable: true,
    warrantyOffered: true,
  },

  brands: ["Honda", "Yamaha", "Mercury", "Suzuki", "Tohatsu", "Freedom"],

  seo: {
    defaultTitle:
      "Outboard Motors Dealership - Premium Marine Motors & Service",
    titleTemplate: "%s | Outboard Motors Dealership",
    defaultDescription:
      "Your trusted source for new and used outboard motors. Honda, Yamaha, Mercury, Freedom, Suzuki, Tohatsu authorized dealer. Expert service, parts, and financing available.",
    keywords: [
      "outboard motors",
      "marine engines",
      "boat motors",
      "Honda outboard",
      "Yamaha outboard",
      "Mercury outboard",
      "Tennessee outboard dealer",
    ],
  },
};

export type SiteConfig = typeof siteConfig;
