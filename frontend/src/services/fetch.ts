import axios from "axios";

const API_PREFIX = "/api/";

export function get(path: string) {
  return () =>
    axios
      .get(API_PREFIX + path)
      .then((response) => response.data)
      .catch((e) => {
        throw e.response.data;
      });
}
