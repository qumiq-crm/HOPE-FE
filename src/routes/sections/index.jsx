import { Navigate, useRoutes } from "react-router-dom";

import PageNotFound from "../../pages/failed/PageNotFound";
import { dashboardRoutes } from "./dashboard";
import { systemUserRoutes } from "./systemUser";

export default function Router() {

  return useRoutes([

    // Dashboard routes
    ...dashboardRoutes,

    // System User routes
    ...systemUserRoutes,

    // No match 404
    { path: "/404", element: <PageNotFound /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
