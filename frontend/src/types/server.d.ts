export interface Color {
  color: string;
  css3: string;
  hue: string;
  percent: number;
  spectrum: string;
}

export interface Image {
  baseimageurl: string;
  displayorder: number;
  format: string;
  height: number;
  imageid: number;
  width: number;
}

export interface Person {
  alphasort: string | null;
  birthplace: string | null;
  culture: string | null;
  deathplace: string | null;
  displaydate: string | null;
  displayname: string | null;
  displayorder: number;
  gender: string | null;
  name: string | null;
  personid: number | null;
  prefix: string | null;
  role: "Artist" | "Previous attribution" | "Sitter" | string;
}

// imagepermissionlevel
// 0 – ok to display images at any size
// 1 – images have restrictions; display at a maximum pixel dimension of 256px
// 2 – do not display any images
export interface Painting {
  colors: Color[];
  dated: string | null;
  dateend: string | number;
  dimensions: string | null;
  id: number;
  imagepermissionlevel: 0 | 1 | 2;
  images: Image[];
  medium: string;
  people: Person[];
  primaryimageurl: string; // Guaranteed with post fetch processing
  title: string;
  url: string;
  // Attributes set after fetch
  artist?: Person;
  dimensionsArr?: string[];
}

export interface PaintingsResponse {
  count: number;
  records: Painting[];
}

export interface ServerError {
  message: string;
}
