import {
  renderComponent,
  screen,
  userEvent,
  waitFor,
  serveData,
} from "../../testing";
import FavoriteToggle from "./FavoriteToggle";
import * as favoritesResponse from "../../testing/data/favorites_response.json";
import { createTestRouter } from "../../testing";

async function setupAndRender(isFavorite = true) {
  const user = userEvent.setup();
  let record = favoritesResponse.records[0] as ApiRecord;

  if (!isFavorite) {
    record = { ...record };
    delete record.favoritesSequence;
  }

  const router = createTestRouter(<FavoriteToggle page={1} record={record} />);
  let button: HTMLElement;

  renderComponent(router);

  await waitFor(() => {
    button = screen.getByRole("button");
  });
  // eslint-disable-next-line
  // @ts-ignore
  return { button, user };
}

describe("When the record is not a favorite", () => {
  it("has the correct aria-label and icon", async () => {
    const { button } = await setupAndRender(false);
    const icon = screen.getByTestId("favorite-toggle-icon");

    expect(button).toHaveAccessibleName(/add to favorites/i);
    expect(icon).toHaveClass("fa-star");
  });
});

describe("When the record is a favorite", () => {
  it("has the correct aria-label and icon", async () => {
    const { button } = await setupAndRender();
    const icon = screen.getByTestId("favorite-toggle-icon");

    expect(button).toHaveAccessibleName(/remove from favorites/i);
    expect(icon).toHaveClass("fa-star");
  });
});

describe("Server error handling", () => {
  it("does not display an error if the API request does not error", async () => {
    serveData({
      path: "users/1/collections/favorites/records/:id",
      method: "delete",
    });

    const { button, user } = await setupAndRender();
    await waitFor(() => user.click(button));

    expect(screen.queryByLabelText(/error/i)).not.toBeInTheDocument();
  });

  it("does displays an error if the API request errors", async () => {
    serveData({
      path: "users/1/collections/favorites/records/:id",
      method: "delete",
      status: 500,
    });

    const { button, user } = await setupAndRender();
    await waitFor(() => user.click(button));

    expect(screen.queryByLabelText(/error/i)).toBeInTheDocument();
  });
});
