import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient.ts";
import router from "./router.ts";
import "./index.css";

const isDemo = import.meta.env.VITE_IS_DEMO;
const isGithub = import.meta.env.VITE_HOST === "github";
const startWorker = async () => {
  if (isDemo) {
    const { worker } = await import("./mocks/browser");
    worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "./mockServiceWorker.js",
      },
    });
  }
};

startWorker();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} basepath={isGithub ? "musee/" : ""} />
    </QueryClientProvider>
  </React.StrictMode>
);
