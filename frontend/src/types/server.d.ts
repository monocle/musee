interface Color {
  color: string;
  css3: string;
  hue: string;
  percent: number;
  spectrum: string;
}

interface Person {
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

interface Painting {
  artist: Person;
  colors: Color[];
  date: string | number;
  dimensions: string[];
  display_order: number;
  id: number;
  medium: string;
  page: number;
  primaryimageurl: string;
  title: string;
  url: string;
}

interface PaintingsResponse {
  count: number;
  records: Painting[];
}

interface ServerError {
  message: string;
}
