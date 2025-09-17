export interface NavItem {
  title: string;
  href: string;
  description?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
  label?: string;
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithOptionalChildren[];
}

export const mainNav: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Inventory",
    href: "/inventory",
    description: "Browse our complete selection of outboard motors",
  },
  {
    title: "Compare",
    href: "/compare",
    description: "Compare different outboard motor models",
  },
  {
    title: "Parts",
    href: "/parts",
    description: "Outboard motor parts and accessories",
  },
  {
    title: "Learn",
    href: "/learn",
    description: "Guides and resources",
  },
  {
    title: "About",
    href: "/about",
    description: "About our dealership",
  },
];

export const learnNav: NavItemWithOptionalChildren[] = [
  {
    title: "Getting Started",
    href: "/learn",
    items: [
      {
        title: "Buying Guide",
        href: "/learn/guides",
        description: "Complete guide to buying outboard motors",
      },
      {
        title: "FAQs",
        href: "/learn/faqs",
        description: "Frequently asked questions",
      },
    ],
  },
];

export const footerNav = [
  {
    title: "Products",
    items: [
      {
        title: "New Motors",
        href: "/inventory?condition=new",
        external: false,
      },
      {
        title: "Used Motors",
        href: "/inventory?condition=used",
        external: false,
      },
      {
        title: "Parts & Accessories",
        href: "/parts",
        external: false,
      },
      {
        title: "Compare Motors",
        href: "/compare",
        external: false,
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        title: "Buying Guide",
        href: "/learn/guides",
        external: false,
      },
      {
        title: "FAQs",
        href: "/learn/faqs",
        external: false,
      },
      {
        title: "About Us",
        href: "/about",
        external: false,
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        title: "Contact",
        href: "tel:(931)243-4555",
        external: true,
      },
      {
        title: "Hours",
        href: "#hours",
        external: false,
      },
    ],
  },
];

// Add the enhanced navigation structure for dropdown menus
export interface EnhancedNavItem {
  name: string;
  href: string;
  description?: string;
  dropdown?: EnhancedNavItem[];
  isNested?: boolean;
  brands?: EnhancedNavItem[];
}

export const enhancedNavigation: EnhancedNavItem[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Outboard Motors",
    href: "#",
    dropdown: [
      {
        name: "All Motors",
        href: "/inventory",
        description: "Browse all motors",
      },
      {
        name: "New Motors",
        href: "/inventory?condition=new",
        description: "Latest models in stock",
      },
      {
        name: "Used Motors",
        href: "/inventory?condition=used",
        description: "Certified pre-owned",
      },
      {
        name: "On Sale",
        href: "/inventory?status=sale",
        description: "Special offers",
      },
      {
        name: "Overstock",
        href: "/inventory?status=overstock",
        description: "Great deals on overstock items",
      },
      {
        name: "Brands",
        href: "#",
        description: "Browse by brand",
        isNested: true,
        brands: [
          {
            name: "Yamaha",
            href: "/inventory?brand=yamaha",
            description: "Browse Yamaha motors",
          },
          {
            name: "Mercury",
            href: "/inventory?brand=mercury",
            description: "Browse Mercury motors",
          },
          {
            name: "Honda",
            href: "/inventory?brand=honda",
            description: "Browse Honda motors",
          },
          {
            name: "Suzuki",
            href: "/inventory?brand=suzuki",
            description: "Browse Suzuki motors",
          },
          {
            name: "Tohatsu",
            href: "/inventory?brand=tohatsu",
            description: "Browse Tohatsu motors",
          },
          {
            name: "Freedom",
            href: "/inventory?brand=freedom",
            description: "Browse Freedom motors",
          },
        ],
      },
    ],
  },
  {
    name: "Financing",
    href: "#",
    dropdown: [
      {
        name: "Apply Now",
        href: "/financing/application",
        description: "Quick application",
      },
      {
        name: "Special Offers",
        href: "/financing/offers",
        description: "Current promotions",
      },
    ],
  },
  {
    name: "Learn",
    href: "#",
    dropdown: [
      {
        name: "Buying Guides",
        href: "/learn/guides",
        description: "How to choose the perfect motor",
      },
      {
        name: "FAQs",
        href: "/learn/faqs",
        description: "Common questions answered",
      },
    ],
  },
  {
    name: "Parts & Accessories",
    href: "/parts",
  },
  {
    name: "Compare",
    href: "/compare",
  },
];
