import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import router from "./router.ts";
import "./index.css";

const isDemo = import.meta.env.MODE === "demo";
const isDev = import.meta.env.DEV;
const startWorker = async () => {
  if (isDemo) {
    const { worker } = await import("./mocks/browser");
    worker.start({
      serviceWorker: {
        url: "./mockServiceWorker.js",
      },
    });
  }
};

startWorker();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: isDev ? Infinity : 60000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
