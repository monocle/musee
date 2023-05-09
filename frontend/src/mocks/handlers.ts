import { rest } from "msw";
import paintingsResponse from "./ham_paintings_1.json";

export const handlers = [
  rest.get("/api/paintings", async (req, res, ctx) => {
    const maxRecords = paintingsResponse.records.length;
    const offset = Number(req.url.searchParams.get("offset") ?? "0");
    const limit = Number(req.url.searchParams.get("limit") ?? "20");
    const first = offset < 0 ? 0 : offset;
    const last = Math.min(first + limit, maxRecords);
    const records = paintingsResponse.records.slice(first, last);

    return res(ctx.status(200), ctx.json({ records, count: maxRecords }));
  }),
];
