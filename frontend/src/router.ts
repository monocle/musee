import { Route, Router, RootRoute } from "@tanstack/react-router";
import App from "./App";
import Landing from "./pages/Landing";
import Paintings from "./paintings/Paintings";
import Painting from "./paintings/Painting";

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}

const rootRoute = new RootRoute({
  component: App,
});

const landingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Landing,
});

const collectionsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/collections",
});

const collectionRoute = new Route({
  getParentRoute: () => collectionsRoute,
  path: "$collectionName",
  component: Paintings,
  validateSearch: (
    search: Record<string, unknown>
  ): {
    page: number;
  } => {
    const page = Number(search?.page ?? 1);

    return {
      page: page < 1 ? 1 : page,
    };
  },
});

const paintingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/explore",
  component: Painting,
  validateSearch: (
    search: Record<string, unknown>
  ): {
    painting: number;
  } => {
    const painting = Number(search?.painting ?? 1);

    return {
      painting: painting < 1 ? 1 : painting,
    };
  },
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  collectionsRoute.addChildren([collectionRoute]),
  paintingRoute,
]);

const router = new Router({ routeTree, defaultPreload: "intent" });

export default router;
