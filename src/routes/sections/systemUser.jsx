import { Suspense } from "react";

import { Skeleton } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../paths";
import AdminLayout from "../../layouts/AdminLayout";
import Product from "../../pages/admin/Product";
import Category from "../../pages/admin/Category";
import Events from "../../pages/admin/Events";

export const systemUserRoutes = [
  {
    path: paths.admin.index,
    element: (
      <AdminLayout>
        <Suspense fallback={<Skeleton />}>
          <Outlet />
        </Suspense>
      </AdminLayout>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={paths.admin.products} replace />,
      },
      { element: <Product />, path: paths.admin.products },
      { element: <Category />, path: paths.admin.categories },
      { element: <Product />, path: paths.admin.banners },
      { element: <Events />, path: paths.admin.events },
    ],
  },
];
