import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { RouterProvider } from "@tanstack/react-router";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderComponent(router: any) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    /* eslint-disable */
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
    /* eslint-enable */
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
