import axios from "axios";

const API_PREFIX = "/api/";

export async function get(path: string, params?: unknown) {
  return axios
    .get(API_PREFIX + path, { params })
    .then((response) => response.data)
    .catch((e) => {
      throw e.response.data;
    });
}
