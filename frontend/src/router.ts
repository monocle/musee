import { Route, Router, RootRoute } from "@tanstack/react-router";
import App from "./App";
import Landing from "./pages/Landing";
import Paintings from "./paintings/Paintings";
import Painting from "./paintings/Painting";

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
  path: "/painting",
  component: Painting,
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  paintingsRoute,
  paintingRoute,
]);

const router = new Router({ routeTree });

export default router;
