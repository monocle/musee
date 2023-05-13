import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient.ts";
import router from "./router.ts";
import "./index.css";

const VITE_IS_DEMO: boolean = import.meta.env.VITE_IS_DEMO;
const VITE_BASEPATH: string = import.meta.env.VITE_BASEPATH;

const startWorker = async () => {
  const basePath = VITE_BASEPATH ? "/" + VITE_BASEPATH : "";
  if (VITE_IS_DEMO) {
    const { worker } = await import("./mocks/browser");
    worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: basePath + "/mockServiceWorker.js",
      },
    });
  }
};

startWorker();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} basepath={VITE_BASEPATH} />
    </QueryClientProvider>
  </React.StrictMode>
);
