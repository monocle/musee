import { rest } from "msw";
import cache from "./browser_cache";

const handlers = [
  rest.get("/api/collections/:collectionId", async (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("page")) ?? 1;
    const collectionId = String(req.params.collectionId ?? "ham");
    const records = await cache.getPage(collectionId, page < 1 ? 1 : page);

    return res(
      ctx.status(200),
      ctx.json({
        records,
        pageSize: cache.pageSize,
        maxPages: cache.maxPages(collectionId),
        maxRecords: cache.maxRecords(collectionId),
      })
    );
  }),

  rest.get(
    "/api/collections/:collectionId/paintings/:sequence",
    async (req, res, ctx) => {
      const { collectionId: _collectionId, sequence } = req.params;
      const collectionId = String(_collectionId);
      const painting = await cache.getPaintingBySequence(
        collectionId,
        Number(sequence)
      );

      if (painting) {
        return res(
          ctx.status(200),
          ctx.json({ painting, maxSequence: cache.maxRecords(collectionId) })
        );
      }

      return res(
        ctx.status(400),
        ctx.json({ type: "missing", message: "Painting does not exist." })
      );
    }
  ),

  rest.post(
    "/api/users/:userId/collections/:collectionId/paintings",
    async (req, res, ctx) => {
      const { id } = await req.json();

      cache.addFavorite(id);
      return res(ctx.status(200));
    }
  ),

  rest.delete(
    "/api/users/:userId/collections/:collectionId/paintings/:id",
    async (req, res, ctx) => {
      cache.removeFavorite(String(req.params.id));
      return res(ctx.status(200));
    }
  ),
];

export default handlers;
