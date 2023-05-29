import { renderComponent, screen, userEvent, waitFor } from "../testing";
import { serveData } from "../testing";
import * as data from "../testing/data/aic_collection_response_2.json";
import * as favorites from "../testing/data/favorites_response.json";
import router from "./router";

// Using one test until proper testing with TanStack Router is figured out.
test("all routing links", async () => {
  const user = userEvent.setup();
  const record0 = data.records[0];
  const record1 = data.records[1];
  const favorite0 = favorites.records[0];

  serveData({ path: "collections/aic", data });
  serveData({ path: "collections/favorites", data: favorites });
  renderComponent(router);

  // Initial landing page
  await waitFor(() => {
    expect(screen.queryByText(/artwork to inspire/i)).toBeInTheDocument();
  });

  // Hero button link
  await user.click(screen.getByRole("link", { name: /let's go/i }));
  await waitFor(() => {
    expect(screen.queryByText(/artwork to inspire/i)).not.toBeInTheDocument();
    expect(screen.queryByText(record0.title)).toBeInTheDocument();
    expect(screen.queryByText(record1.title)).toBeInTheDocument();
    expect(screen.queryByText(favorite0.title)).not.toBeInTheDocument();
  });

  // Logo link back to home
  await user.click(screen.getByLabelText(/navigate to home/i));
  await waitFor(() => {
    expect(screen.queryByText(/artwork to inspire/i)).toBeInTheDocument();
  });

  // Favorites menu link
  await user.click(screen.getByRole("link", { name: /favorites/i }));
  await waitFor(() => {
    expect(screen.queryByText(record0.title)).not.toBeInTheDocument();
    expect(screen.queryByText(record1.title)).not.toBeInTheDocument();
    expect(screen.queryByText(favorite0.title)).toBeInTheDocument();
  });

  // All menu link
  await user.click(screen.getByRole("link", { name: /all/i }));
  await waitFor(() => {
    expect(screen.queryByText(record0.title)).toBeInTheDocument();
    expect(screen.queryByText(record1.title)).toBeInTheDocument();
    expect(screen.queryByText(favorite0.title)).not.toBeInTheDocument();
  });
});
