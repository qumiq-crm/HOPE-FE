import { Suspense } from "react";

import { Skeleton } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../paths";
import HomePage from "../../pages/dashboard/HomePage";
import AdminLayout from "../../layouts/AdminLayout";

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
      { element: <HomePage />, path: paths.admin.dashboard },
    ],
  },
];
