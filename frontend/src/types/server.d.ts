type ApiRecordId = string;

interface ApiColor {
  h: number;
  s: number;
  l: number;
  percentage: number;
}

interface ApiImageUrl {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

interface ApiRecord {
  artist_name: string;
  color: ApiColor;
  date: string;
  dimensions: string[];
  favoritesSequence?: number;
  id: string;
  image_alt?: string;
  image_url: ApiImageUrl;
  medium: string;
  origin?: string;
  sequence: int;
  source_id: int;
  source_url: string;
  source: "aic";
  style?: string;
  title: string;
}

interface CollectionResponse {
  maxRecords: number;
  maxPages: number;
  pageSize: number;
  records: Record[];
}

interface FileSummary {
  totalFiles: number;
  totalRecords: number;
  recordsPerFile: number;
}

interface ApiRecordResponse {
  record: ApiRecord;
  maxSequence: number;
}

interface ServerError {
  message: string;
  type: "missing";
}
