import { Suspense } from "react";

import { Skeleton } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../paths";
import AdminLayout from "../../layouts/AdminLayout";
import Product from "../../pages/admin/Product";

export const systemUserRoutes = [
  {
    path: "",
    element: (
      <AdminLayout>
        <Suspense fallback={<Skeleton />}>
          <Outlet />
        </Suspense>
      </AdminLayout>
    ),
    children: [
      {
        element: <Navigate to={paths.admin.dashboard} replace />,
      },
      { element: <Product />, path: paths.admin.dashboard },
    ],
  },
];
