import type { AxiosRequestConfig } from "axios";
import {
  Route,
  Router,
  RootRoute,
  createHashHistory,
} from "@tanstack/react-router";
import { apiGet } from "./services/useApi.ts";
import queryClient from "./queryClient.ts";
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

const collectionRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "collections/$collectionId",
  component: Collection,
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

const paintingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "paintings/$id",
  component: Painting,
});

// const exploreRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/explore",
//   component: Painting,
//   validateSearch: (
//     search: Record<string, unknown>
//   ): {
//     collection: string;
//     painting: number;
//   } => {
//     const collection = String(search?.collection ?? "ham");
//     const painting = Number(search?.painting ?? 1);

//     return {
//       collection,
//       painting: painting < 1 ? 1 : painting,
//     };
//   },
// });

const routeTree = rootRoute.addChildren([
  landingRoute,
  collectionRoute,
  paintingRoute,
]);

const router = new Router({
  routeTree,
  defaultPreload: "intent",
  history: createHashHistory(),
});

export default router;
