import { rest } from "msw";
import cache from "./browser_cache";

const handlers = [
  rest.get("/api/collections", async (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("page")) ?? 1;
    const collectionName = req.url.searchParams.get("collectionName") ?? "ham";
    const records = await cache.getPage(collectionName, page < 1 ? 1 : page);

    return res(
      ctx.status(200),
      ctx.json({
        records,
        maxPages: cache.maxPages,
        pageSize: cache.pageSize,
        maxRecords: cache.totalRecords,
      })
    );
  }),

  rest.get("/api/collections/:collection/:sequence", async (req, res, ctx) => {
    const painting = await cache.getSequence(
      req.params.collection as string,
      Number(req.params.sequence as string)
    );

    if (painting) {
      return res(
        ctx.status(200),
        ctx.json({ painting, maxSequence: cache.totalRecords + 1 })
      );
    }

    return res(
      ctx.status(400),
      ctx.json({ type: "missing", message: "Painting does not exist." })
    );
  }),
];

export default handlers;
