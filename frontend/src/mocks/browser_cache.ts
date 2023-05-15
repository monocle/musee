import axios from "axios";

const VITE_BASEPATH: string = import.meta.env.VITE_BASEPATH;

class BrowserCache {
  basepath = (VITE_BASEPATH ? "/" + VITE_BASEPATH : "") + "/data";
  nextFileNum = 1;
  pageSize = 20;
  totalRecords = 0;
  recordsPerFile = 0;
  paintings: Painting[] = [];

  async init() {
    await axios
      .get<HAMSummary>(`${this.basepath}/ham_summary.json`)
      .then((res) => {
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

const cache = new BrowserCache();
export default cache;
