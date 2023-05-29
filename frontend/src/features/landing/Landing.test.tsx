import {
  createTestRouter,
  renderComponent,
  screen,
  waitFor,
} from "../../testing";
import Landing from "./Landing";

const router = createTestRouter(Landing);

test("renders Landing component", async () => {
  renderComponent(router);

  await waitFor(() => {
    expect(screen.getByTestId("large spinner")).toBeInTheDocument();
    expect(screen.queryByText(/artwork to inspire/i)).toBeInTheDocument();
  });
});
