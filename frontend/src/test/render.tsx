import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { render } from "@testing-library/react";

export function renderComponent(component: JSX.Element) {
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

  render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
}
