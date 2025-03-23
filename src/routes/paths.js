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
    dashboard: `${ROOTS.ADMIN}/dashboard`,
    reports: `${ROOTS.ADMIN}/reports`,
    support: `${ROOTS.ADMIN}/support`,
    manage: `${ROOTS.ADMIN}/manage`,
  },
};
