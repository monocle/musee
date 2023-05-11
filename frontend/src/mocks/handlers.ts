import { rest } from "msw";

const VITE_BASEPATH: string = import.meta.env.VITE_BASEPATH;
const HAM_PAGE_MAX = 2;

function getApiParams(params: URLSearchParams) {
  let page = Number(params.get("page")) ?? 1;
  let source = params.get("source");

  if (source !== "ham") source = "ham";
  if (page < 1 || page > HAM_PAGE_MAX) page = 1;

  return { page, source };
}

export const handlers = [
  rest.get("/api/paintings", async (req, res, ctx) => {
    const { page, source } = getApiParams(req.url.searchParams);
    const basepath = VITE_BASEPATH ? "/" + VITE_BASEPATH : "";
    const fetchRes = await fetch(
      `${basepath}/data/${source}_paintings_${page}.json`
    );
    const paintingsResponse = await fetchRes.json();
    const records = paintingsResponse.records;

    return res(ctx.status(200), ctx.json({ records, page_max: HAM_PAGE_MAX }));
  }),
];
