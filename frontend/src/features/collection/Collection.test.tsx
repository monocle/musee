import { renderComponent, screen, serveData, waitFor } from "../../testing";
import router from "../../config/router";

async function setupAndRender() {
  const res = renderComponent(router);

  serveData({ path: "collections/aic", data: { records: [] } });
  await res.user.clickLink("all");
  return res;
}

describe("View switching", () => {
  it("starts off in Gallery view", async () => {
    await setupAndRender();

    expect(screen.queryByTestId("collection-gallery-view")).toBeInTheDocument();
    expect(
      screen.queryByTestId("collection-list-view")
    ).not.toBeInTheDocument();
  });

  it("can select the List view", async () => {
    const { user } = await setupAndRender();

    await user.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: /list/i })
    );

    expect(screen.queryByTestId("collection-list-view")).toBeInTheDocument();
    expect(
      screen.queryByTestId("collection-gallery-view")
    ).not.toBeInTheDocument();
  });
});

it("displays a loading indicator when loading", async () => {
  const { user } = renderComponent(router);

  serveData({
    path: "collections/aic",
    delay: Infinity,
  });
  user.clickLink("all");

  await waitFor(() =>
    expect(screen.getByTestId("large-spinner")).toBeInTheDocument()
  );
});

it("displays a server error", async () => {
  const { user } = renderComponent(router);
  const message = "ain't gonna happen";

  serveData({ path: "collections/aic", status: 400, data: { message } });

  await user.clickLink("all");
  expect(screen.getByText(new RegExp(message, "i"))).toBeInTheDocument();
});
