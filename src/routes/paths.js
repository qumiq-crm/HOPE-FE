// ------------------------------------------------------------------------

const ROOTS = {
  ADMIN: "/admin",
};

// ------------------------------------------------------------------------

export const paths = {
  // DASHBOARD
  dashboard: {
    home: "/",
    products: "/products",
    blogs: "/blogs",
  },
  products: {
    index: "products",
    details: "details",
  },
  events: {
    index: "events",
    details: ":eventId",
  },
  admin: {
    index: `${ROOTS.ADMIN}`,
    products: `${ROOTS.ADMIN}/products`,
    categories: `${ROOTS.ADMIN}/categories`,
    banners: `${ROOTS.ADMIN}/banners`,
    events: `${ROOTS.ADMIN}/events`,
  },
};
