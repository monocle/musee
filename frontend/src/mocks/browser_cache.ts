import axios from "axios";

const VITE_BASEPATH: string = import.meta.env.VITE_BASEPATH;

// Requires that records in the files are sorted by "sequence"
class BrowserCache {
  basepath = (VITE_BASEPATH ? "/" + VITE_BASEPATH : "") + "/data";
  nextFileNum = 1;
  pageSize = 20;
  totalFiles = 0;
  totalRecords = 0;
  recordsPerFile = 0;
  #fileCache: Record<number, Painting[]> = {};

  async init() {
    await axios
      .get<HAMSummary>(`${this.basepath}/ham_summary.json`)
      .then(async (res) => {
        this.totalFiles = res.data.totalFiles;
        this.totalRecords = res.data.totalRecords;
        this.recordsPerFile = res.data.recordsPerFile;
      });
  }

  get maxPages() {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  async getSequence(collectionName: string, sequence: number) {
    if (collectionName !== "ham") return null;

    const records = await this.#getFileRecords(sequence);
    return records.find((painting) => painting.sequence === sequence);
  }

  async getPage(collectionName: string, page: number) {
    if (collectionName !== "ham") return [];

    const startSeq = (page - 1) * this.pageSize;
    const stopSeq = page * this.pageSize;
    const startFileNum = this.#getFileNum(startSeq);
    const stopFileNum = this.#getFileNum(stopSeq);
    let records = await this.#getFileRecords(startSeq);

    if (startFileNum !== stopFileNum) {
      records = records.concat(await this.#getFileRecords(stopSeq));
    }

    return records.filter(
      (painting) =>
        painting.sequence >= startSeq && painting.sequence <= stopSeq
    );
  }

  #getFileNum(sequence: number) {
    return 1 + Math.floor(sequence / this.recordsPerFile);
  }

  async #getFileRecords(sequence: number) {
    const file = this.#getFileNum(sequence);
    return this.#fileCache[file] ?? (await this.#fetchFile(file));
  }

  async #fetchFile(fileNum: number): Promise<Painting[]> {
    try {
      const fetchRes = await fetch(`${this.basepath}/ham_${fileNum}.json`);
      const data = await fetchRes.json();

      this.#fileCache[fileNum] = data.records;
      return data.records;
    } catch {
      console.error("Unable to fetch data file", fileNum);
      return [];
    }
  }
}

const cache = new BrowserCache();
export default cache;
