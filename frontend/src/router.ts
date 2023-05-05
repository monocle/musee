import { Route, Router, RootRoute } from "@tanstack/react-router";
import App from "./App";
import Paintings from "./paintings/Paintings";

const rootRoute = new RootRoute({
  component: App,
});

const paintingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Paintings,
});

const routeTree = rootRoute.addChildren([paintingsRoute]);

const router = new Router({ routeTree });

export default router;
