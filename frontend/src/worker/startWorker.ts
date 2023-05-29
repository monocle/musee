import browserCache from "./browser_cache.js";
import browser_handlers from "./browser_handlers.js";

export default async function startWorker() {
  if (!import.meta.env.VITE_IS_DEMO) return;

  const viteBasepath = import.meta.env.VITE_BASEPATH;
  const basePath = viteBasepath ? "/" + viteBasepath : "";
  const { setupWorker } = await import("msw");
  const worker = setupWorker(...browser_handlers);

  await browserCache.init();

  worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: basePath + "/mockServiceWorker.js",
    },
  });
}
