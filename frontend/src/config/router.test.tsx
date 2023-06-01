import {
  renderComponent,
  screen,
  expectInDocument,
  expectNotInDocument,
} from "../testing";
import { serveData } from "../testing";
import * as data from "../testing/data/aic_collection_response_2.json";
import * as favorites from "../testing/data/favorites_response.json";
import router from "./router";

const record0 = data.records[0];
const record1 = data.records[1];
const favorite0 = favorites.records[0];

async function expectLandingPage() {
  await expectNotInDocument(record0.title);
  await expectNotInDocument(record1.title);
  await expectNotInDocument(favorite0.title);
}

async function expectCollectionPage() {
  await expectNotInDocument(/artwork to inspire/i);
  await expectInDocument(record0.title);
  await expectInDocument(record1.title);
  await expectNotInDocument(favorite0.title);
}

// Using one test until proper testing with TanStack Router is figured out.
test("all routing links", async () => {
  serveData({ path: "collections/aic", data });
  serveData({ path: "collections/favorites", data: favorites });

  const { user } = renderComponent(router);

  // Initial landing page
  await expectLandingPage();

  // Hero button link
  await user.clickLink("hero");
  await expectCollectionPage();

  // Logo link back to home
  await user.click(screen.getByLabelText(/navigate to home/i));
  await expectLandingPage();

  // Favorites menu link
  await user.clickLink("favorites");

  await expectNotInDocument(/artwork to inspire/i);
  await expectNotInDocument(record0.title);
  await expectNotInDocument(record1.title);
  await expectInDocument(favorite0.title);

  // All menu link
  await user.clickLink("all");
  await expectCollectionPage();
});
