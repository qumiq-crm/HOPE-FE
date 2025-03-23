import { Suspense, lazy } from "react";

import { Skeleton } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

import { paths } from "../paths";
import DashboardLayout from "../../layouts/DashboardLayout";
import ServiceNotAvailable from "../../pages/failed/ServiceNotAvailable";
// Lazy-loaded components
const HomePage = lazy(() => import("../../pages/dashboard/HomePage"));
const ProductsPage = lazy(() => import("../../pages/dashboard/ProductsPage"));
const ProductDetailsPage = lazy(() => import("../../pages/dashboard/ProductDetailsPage"));
const PageNotFound = lazy(() => import("../../pages/failed/PageNotFound"));

export const dashboardRoutes = [
  {
    path: "",
    element: (
      <DashboardLayout>
        <ErrorBoundary fallback={<ServiceNotAvailable />}>
          <Suspense fallback={<Skeleton />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </DashboardLayout>
    ),
    children: [
      { element: <HomePage />, path: paths.dashboard.home },
      { element: <ProductsPage />, path: paths.dashboard.products },
      {
        element: <ProductDetailsPage />,
        path: `${paths.dashboard.products}/${paths.products.details}`,
      },
      { element: <PageNotFound />, path: "503" },
    ],
  },
];
