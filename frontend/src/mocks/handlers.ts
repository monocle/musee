import { rest } from "msw";

const VITE_BASEPATH: string = import.meta.env.VITE_BASEPATH;

class Cache {
  basepath = VITE_BASEPATH ? "/" + VITE_BASEPATH : "";
  nextFileNum = 1;
  pageSize = 20;
  maxRecords = 141;
  paintings: Painting[] = [];

  get numPages() {
    return Math.ceil(this.maxRecords / this.pageSize);
  }

  async getSequence(sequence: number) {
    let painting = this.paintings[sequence - 1];

    if (!painting) await this.#fetchNext();

    painting = this.paintings[sequence - 1];
    return painting;
  }

  async getPage(page: number) {
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
        `${this.basepath}/data/ham_paintings_${this.nextFileNum}.json`
      );
      const data = await fetchRes.json();

      this.paintings = this.paintings.concat(data.records);
      this.nextFileNum++;
    } catch {
      this.nextFileNum = 0;
    }
  }
}

const cache = new Cache();

export const handlers = [
  rest.get("/api/paintings", async (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("page")) ?? 1;
    const records = await cache.getPage(page < 1 ? 1 : page);

    return res(
      ctx.status(200),
      ctx.json({
        records,
        page_max: cache.numPages,
        page_size: cache.pageSize,
        max_records: cache.maxRecords,
      })
    );
  }),

  rest.get("/api/paintings/:sequence", async (req, res, ctx) => {
    const painting = await cache.getSequence(
      Number(req.params.sequence as string)
    );

    if (painting) {
      return res(
        ctx.status(200),
        ctx.json({ painting, max_sequence: cache.maxRecords + 1 })
      );
    }

    return res(
      ctx.status(400),
      ctx.json({ type: "missing", message: "Painting does not exist." })
    );
  }),
];
