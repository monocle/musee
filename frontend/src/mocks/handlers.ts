import { rest } from "msw";
import { Painting } from "../types";

const paintings: Painting[] = [];

export const handlers = [
  rest.get("api/paintings", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        paintings,
      })
    );
  }),
];
