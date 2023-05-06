import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import router from "./router.ts";
import "./index.css";

const isDemo = import.meta.env.VITE_IS_DEMO;
const isDev = import.meta.env.DEV;
const isGithub = import.meta.env.VITE_HOST === "github";
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
      <RouterProvider router={router} basepath={isGithub ? "musee/" : ""} />
    </QueryClientProvider>
  </React.StrictMode>
);
