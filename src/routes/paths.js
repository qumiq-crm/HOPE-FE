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
  admin: {
    index: `${ROOTS.ADMIN}`,
    products: `${ROOTS.ADMIN}/products`,
    categories: `${ROOTS.ADMIN}/categories`,
    banners: `${ROOTS.ADMIN}/banners`,
  },
};
