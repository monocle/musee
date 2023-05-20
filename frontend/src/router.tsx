import type { AxiosRequestConfig } from "axios";
import {
  createHashHistory,
  Outlet,
  RootRoute,
  Route,
  Router,
} from "@tanstack/react-router";
import { apiGet } from "./services/useApi.ts";
import queryClient from "./queryClient.ts";
import App from "./App.tsx";
import Landing from "./pages/Landing.tsx";
import Collection from "./collections/Collection.tsx";
import Painting from "./explore/Painting.tsx";

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

const collectionRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "collections/$collectionId",
  component: Outlet,
  onLoad: async ({ params: { collectionId }, search: { page } }) => {
    const key = [`collections/${collectionId}`, { page }] as const;
    queryClient.ensureQueryData(key, () =>
      apiGet(key[0], key[1] as AxiosRequestConfig)
    );
  },
  validateSearch: (
    search: Record<string, unknown>
  ): {
    page: number;
    view: string;
  } => {
    const page = Number(search?.page ?? 1);
    return {
      page: page < 1 ? 1 : page,
      view: String(search?.view ?? "gallery"),
    };
  },
});

const collectionIndexRoute = new Route({
  getParentRoute: () => collectionRoute,
  path: "/",
  component: Collection,
});

const paintingRoute = new Route({
  getParentRoute: () => collectionRoute,
  path: "paintings/$sequence",
  component: Painting,
  parseParams: (params) => ({ sequence: Number(params.sequence) }),
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  collectionRoute.addChildren([paintingRoute, collectionIndexRoute]),
]);

const router = new Router({
  routeTree,
  defaultPreload: "intent",
  history: createHashHistory(),
});

export default router;