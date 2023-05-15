import { rest } from "msw";
import type { RestHandler, MockedRequest, DefaultBodyType } from "msw";
import axios from "axios";

const VITE_BASEPATH: string = import.meta.env.VITE_BASEPATH;
const VITE_IS_DEMO: boolean = import.meta.env.VITE_IS_DEMO;

class Cache {
  basepath = (VITE_BASEPATH ? "/" + VITE_BASEPATH : "") + "/data";
  nextFileNum = 1;
  pageSize = 20;
  totalRecords = 0;
  recordsPerFile = 0;
  paintings: Painting[] = [];

  async init() {
    axios.get<HAMSummary>(`${this.basepath}/ham_summary.json`).then((res) => {
      this.totalRecords = res.data.totalRecords;
      this.recordsPerFile = res.data.recordsPerFile;
    });
  }

  get maxPages() {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  async getSequence(collectionName: string, sequence: number) {
    if (collectionName !== "ham") return null;

    let painting = this.paintings[sequence - 1];

    if (!painting) await this.#fetchNext();

    painting = this.paintings[sequence - 1];
    return painting;
  }

  async getPage(collectionName: string, page: number) {
    if (collectionName !== "ham") return [];

    const startIdx = (page - 1) * this.pageSize;
    const stopIdx = page * this.pageSize;
    let records = this.paintings.slice(startIdx, stopIdx);

    if (records.length !== this.pageSize) {
      await this.#fetchNext();
      records = this.paintings.slice(startIdx, stopIdx);
    }

    return records;
  }

  async #fetchNext() {
    if (this.nextFileNum === 0) return;

    try {
      const fetchRes = await fetch(
        `${this.basepath}/ham_${this.nextFileNum}.json`
      );
      const data = await fetchRes.json();

      this.paintings = this.paintings.concat(data.records);
      this.nextFileNum++;
    } catch {
      this.nextFileNum = 0;
    }
  }
}

let handlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [];

if (VITE_IS_DEMO) {
  const cache = new Cache();
  cache.init();

  handlers = [
    rest.get("/api/collections", async (req, res, ctx) => {
      const page = Number(req.url.searchParams.get("page")) ?? 1;
      const collectionName =
        req.url.searchParams.get("collectionName") ?? "ham";
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

    rest.get(
      "/api/collections/:collection/:sequence",
      async (req, res, ctx) => {
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
      }
    ),
  ];
}

export default handlers;
