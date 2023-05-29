import { render, screen, userEvent, vi, expectInDocument } from "../../testing";
import PageControls from "./PageControls";

function setupAndRender({
  page,
  maxPages,
  isLoading = false,
}: {
  page: number;
  maxPages: number;
  isLoading?: boolean;
}) {
  vi.stubGlobal("scroll", vi.fn());
  const user = userEvent.setup();
  const pageChangeHandler = vi.fn();

  render(
    <PageControls
      page={page}
      maxPages={maxPages}
      onPageChange={pageChangeHandler}
      isLoading={isLoading}
    />
  );

  const backButton = screen.getByLabelText(/go back/i);
  const forwardButton = screen.getByLabelText(/go forward/i);

  return { user, pageChangeHandler, backButton, forwardButton };
}

it("disables only the back button when it is the first page", async () => {
  const { user, pageChangeHandler, backButton, forwardButton } = setupAndRender(
    { page: 1, maxPages: 2 }
  );

  expect(backButton).toBeDisabled();
  expect(forwardButton).not.toBeDisabled();

  await user.click(backButton);
  expect(pageChangeHandler).not.toHaveBeenCalled();

  await user.click(forwardButton);
  expect(pageChangeHandler).toHaveBeenCalledWith(2);
});

it("disables the forward button if it is the last page", async () => {
  const { user, pageChangeHandler, backButton, forwardButton } = setupAndRender(
    { page: 2, maxPages: 2 }
  );

  expect(backButton).not.toBeDisabled();
  expect(forwardButton).toBeDisabled();

  await user.click(forwardButton);
  expect(pageChangeHandler).not.toHaveBeenCalled();

  await user.click(backButton);
  expect(pageChangeHandler).toHaveBeenCalledWith(1);
});

it("displays 0 for the max page if there are no pages to display", async () => {
  setupAndRender({ page: 0, maxPages: 0 });
  expectInDocument("0 / 0");
});

test("the buttons are disabled if isLoading is true", () => {
  const { backButton, forwardButton } = setupAndRender({
    page: 1,
    maxPages: 2,
    isLoading: true,
  });

  expect(backButton).toBeDisabled();
  expect(forwardButton).toBeDisabled();
});
