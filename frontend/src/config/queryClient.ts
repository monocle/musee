import { QueryClient } from "@tanstack/react-query";

const isDev = import.meta.env.DEV;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: isDev ? Infinity : 60000,
    },
  },
});

export default queryClient;
