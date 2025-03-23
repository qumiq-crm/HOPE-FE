import { Suspense } from "react";

import { Skeleton } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../paths";
import HomePage from "../../pages/dashboard/HomePage";

export const systemUserRoutes = [
  {
    path: "",
    element: (
      <Suspense fallback={<Skeleton />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        element: <Navigate to={paths.admin.dashboard} replace />,
      },
      { element: <HomePage />, path: paths.admin.dashboard },
    ],
  },
];
