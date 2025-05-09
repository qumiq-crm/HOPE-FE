import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AntdConfig from "./antd.config.jsx";
import { BrowserRouter } from "react-router-dom";
import { Skeleton } from "antd";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AntdConfig>
      <BrowserRouter>
        <Suspense fallback={<Skeleton />}>
          <App />
          <Toaster />
        </Suspense>
      </BrowserRouter>
    </AntdConfig>
  </StrictMode>
);
