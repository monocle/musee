import { Route, Router, RootRoute } from "@tanstack/react-router";
import App from "./App";
import Landing from "./pages/Landing";
import Paintings from "./paintings/Paintings";
import Painting from "./paintings/Painting";

interface ExploreParams {
  page: number;
  painting: number;
}

const rootRoute = new RootRoute({
  component: App,
});

const landingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Landing,
});

const paintingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/paintings",
  component: Paintings,
});

const paintingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/explore",
  component: Painting,
  validateSearch: (search: Record<string, unknown>): ExploreParams => {
    return {
      page: Number(search?.page ?? 1),
      painting: Number(search?.painting ?? 1),
    };
  },
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  paintingsRoute,
  paintingRoute,
]);

const router = new Router({ routeTree });

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
