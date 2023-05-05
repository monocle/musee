import { Router, RootRoute } from "@tanstack/react-router";
import App from "./App";

const rootRoute = new RootRoute({
  component: App,
});

const routeTree = rootRoute.addChildren([]);

const router = new Router({ routeTree });

export default router;
