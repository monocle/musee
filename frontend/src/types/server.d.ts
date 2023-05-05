export interface Painting {
  title: string;
}

export interface PaintingsResponse {
  paintings: Painting[];
}

export interface ServerError {
  message: string;
}
