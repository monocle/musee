import { setupWorker } from "msw";
import browser_handlers from "./browser_handlers";

export const worker = setupWorker(...browser_handlers);
