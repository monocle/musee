import axios from "axios";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  respondToLocalStorageEvent,
} from "../services/useLocalStorage";

const VITE_BASEPATH: string = import.meta.env.VITE_BASEPATH;
const favoritesName = "favorites";

// Requires that records in the files are sorted by "sequence"
class BrowserCache {
  basepath = (VITE_BASEPATH ? "/" + VITE_BASEPATH : "") + "/data";
  pageSize = 20;
  #totalRecords = 0;
  #records: Record<RecordSource, ApiRecord[]> = { aic: [] };
  #favorites: ApiRecordId[] = [];

  async init() {
    const summary = (
      await axios.get<FileSummary>(`${this.basepath}/data_summary.json`)
    ).data;

    await Promise.all(
      summary.map(async ({ source, numFiles }) => {
        const records = (
          await Promise.all(
            [...Array(numFiles)].map(
              async (_, i) => (await this.#fetchFile(source, i + 1)).records
            )
          )
        ).flat();

        this.#records[source] = records;
        this.#totalRecords += records.length;
      })
    );

    this.#favorites = getLocalStorageItem(favoritesName, []);
    this.#setAllFavoritesSequence();

    respondToLocalStorageEvent<ApiRecordId[]>(favoritesName, (newFavorites) => {
      this.#favorites.forEach((id) => this.#removeFavoritesSequence(id));
      this.#favorites = newFavorites;
      this.#setAllFavoritesSequence();
    });
  }

  maxPages(collectionId = favoritesName) {
    return Math.ceil(this.maxRecords(collectionId) / this.pageSize);
  }

  maxRecords(collectionId = favoritesName) {
    return collectionId === favoritesName
      ? this.#favorites.length
      : this.#totalRecords;
  }

  #getRecords(collectionId: CollectionId) {
    if (collectionId !== favoritesName) return this.#records[collectionId];
    return this.#favorites.map((id) => this.getRecordById(id));
  }

  getRecordBySequence(collectionId: CollectionId, sequence: number) {
    return this.#getRecords(collectionId)[sequence - 1];
  }

  getRecordById(id: string) {
    const split = id.split("-");
    const idx = Number(split[1]);
    const source = String(split[2]) as RecordSource;
    return this.#records[source][idx];
  }

  getPage(collectionId: CollectionId, page: number) {
    const startIdx = (page - 1) * this.pageSize;
    const stopIdx = page * this.pageSize;
    const records = this.#getRecords(collectionId).slice(startIdx, stopIdx);
    return records;
  }

  addFavorite(newId: ApiRecordId) {
    if (this.#favorites.some((id) => id === newId)) return;

    this.#favorites.push(newId);
    this.#setFavoritesSequence(newId, this.#favorites.length);
    setLocalStorageItem(favoritesName, this.#favorites);
  }

  #setFavoritesSequence(id: string, sequence: number) {
    const record = this.getRecordById(id);
    if (record) record.favoritesSequence = sequence;
  }

  #setAllFavoritesSequence() {
    this.#favorites.map((id, i) => this.#setFavoritesSequence(id, i + 1));
  }

  #removeFavoritesSequence(id: string) {
    const record = this.getRecordById(id);
    if (!record) return false;

    record.favoritesSequence = undefined;
    return true;
  }

  removeFavorite(removeId: ApiRecordId) {
    if (!this.#removeFavoritesSequence(removeId)) return;

    this.#favorites = this.#favorites.filter((id) => id !== removeId);
    this.#setAllFavoritesSequence();
    setLocalStorageItem(favoritesName, this.#favorites);
  }

  get numFavorites() {
    return this.#favorites.length;
  }

  async #fetchFile(
    source: string,
    fileNum: number
  ): Promise<{ records: ApiRecord[] }> {
    try {
      const fetchRes = await fetch(
        `${this.basepath}/${source}_${fileNum}.json`
      );
      return await fetchRes.json();
    } catch {
      console.error("Unable to fetch data file", fileNum);
      return { records: [] };
    }
  }
}

const cache = new BrowserCache();
export default cache;
