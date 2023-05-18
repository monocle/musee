import {
  Route,
  Router,
  RootRoute,
  createHashHistory,
} from "@tanstack/react-router";
import App from "./App";
import Landing from "./pages/Landing";
import Collection from "./collections/Collection";
import Painting from "./explore/Painting";

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
  path: "$collectionId",
  component: Collection,
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

const exploreRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/explore",
  component: Painting,
  validateSearch: (
    search: Record<string, unknown>
  ): {
    collection: string;
    painting: number;
  } => {
    const collection = String(search?.collection ?? "ham");
    const painting = Number(search?.painting ?? 1);

    return {
      collection,
      painting: painting < 1 ? 1 : painting,
    };
  },
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  collectionsRoute.addChildren([collectionRoute]),
  exploreRoute,
]);

const router = new Router({
  routeTree,
  defaultPreload: "intent",
  history: createHashHistory(),
});

export default router;
