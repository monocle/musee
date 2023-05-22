import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./queryClient.ts";
import router from "./router.tsx";
import browserCache from "./mocks/browser_cache.ts";
import "./index.css";

const VITE_IS_DEMO: boolean = import.meta.env.VITE_IS_DEMO;
const VITE_BASEPATH: string = import.meta.env.VITE_BASEPATH;

const startWorker = async () => {
  const basePath = VITE_BASEPATH ? "/" + VITE_BASEPATH : "";

  if (VITE_IS_DEMO) {
    const { worker } = await import("./mocks/browser");

    await browserCache.init();
    worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: basePath + "/mockServiceWorker.js",
      },
    });
  }
};

(async () => {
  await startWorker();

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  );
})();
