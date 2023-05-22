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
  #favorites: PaintingId[] = [];
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

  async getPaintingBySequence(collectionId: string, sequence: number) {
    if (collectionId === "favorites") {
      return this.getPaintingById(this.#favorites[sequence]);
    }

    const [fileNum, idx] = this.#getHAMFileNumIdx(sequence);
    const records = await this.#getFileRecords(fileNum);
    return records[idx];
  }

  async getPaintingById(id: string) {
    const split = id.split("-");
    const fileNum = Number(split[0]);
    const idx = Number(split[1]);
    const records = await this.#getFileRecords(fileNum);
    return records[idx];
  }

  async getPage(collectionId: string, page: number) {
    const startSeq = (page - 1) * this.pageSize + 1;
    const stopSeq = page * this.pageSize + 1;

    if (collectionId === "favorites") {
      const ids = this.#favorites.slice(startSeq - 1, stopSeq - 1);
      return await Promise.all(
        ids.map(async (id) => await this.getPaintingById(id))
      );
    }

    const startFileNum = this.#getFileNum(startSeq);
    const stopFileNum = this.#getFileNum(stopSeq);
    let records = await this.#getFileRecords(startFileNum);

    if (startFileNum !== stopFileNum) {
      records = records.concat(await this.#getFileRecords(stopFileNum));
    }

    return records.filter(
      (painting) => painting.sequence >= startSeq && painting.sequence < stopSeq
    );
  }

  async addFavorite(newId: PaintingId) {
    if (this.#favorites.some((id) => id === newId)) return;

    const painting = await this.getPaintingById(newId);

    painting.favoritesSequence = this.#favorites.length + 1;
    this.#favorites.push(newId);
  }

  async removeFavorite(removeId: PaintingId) {
    this.#favorites = this.#favorites.filter((id) => id !== removeId);

    const painting = await this.getPaintingById(removeId);
    painting.favoritesSequence = undefined;
  }

  getPageFromSequence(sequence: number) {
    return 1 + Math.floor((sequence - 1) / cache.pageSize);
  }

  #getFileNum(sequence: number) {
    return 1 + Math.floor(sequence / this.recordsPerFile);
  }

  #getHAMFileNumIdx(sequence: number): [number, number] {
    const pageNum = Math.floor(sequence / this.recordsPerFile) + 1;
    const idx = (sequence % this.recordsPerFile) - 1;
    return [pageNum, idx];
  }

  async #getFileRecords(fileNum: number) {
    return this.#fileCache[fileNum] ?? (await this.#fetchFile(fileNum));
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
