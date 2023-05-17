import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_PREFIX = "/api/";

async function processRequest(req: Promise<AxiosResponse>) {
  return req
    .then((response) => response.data)
    .catch((e) => {
      throw e.response.data;
    });
}

async function apiGet(path: string, params?: AxiosRequestConfig) {
  return processRequest(axios.get(API_PREFIX + path, { params }));
}

async function apiPost(path: string, body?: AxiosRequestConfig) {
  return processRequest(axios.post(API_PREFIX + path, body));
}

async function apiDelete(path: string) {
  return processRequest(axios.delete(API_PREFIX + path));
}

interface UseGetCollectionProps {
  page: number;
  collectionName: string;
}

export const useGetCollection = (params: UseGetCollectionProps) =>
  useQuery<CollectionResponse, ServerError>({
    queryKey: ["collections", params],
    keepPreviousData: true,
    queryFn: () => apiGet("collections", params as AxiosRequestConfig),
  });

export const useGetPainting = (collection: string, sequence: number) =>
  useQuery<PaintingResponse, ServerError>({
    queryKey: ["collections", collection, sequence],
    keepPreviousData: true,
    queryFn: () => apiGet(`collections/${collection}/${sequence}`),
  });

export const useUpdateFavorite = () => {
  const queryClient = useQueryClient();
  const userId = 1;
  const collectionName = "favorites";

  return useMutation({
    mutationFn: ({
      painting,
      isAdd,
    }: {
      painting: Painting;
      isAdd: boolean;
    }) => {
      const { source, sequence } = painting;

      if (isAdd) {
        return apiPost(`users/${userId}/collections/${collectionName}`, {
          source,
          sequence,
        } as AxiosRequestConfig);
      } else {
        return apiDelete(
          `users/${userId}/collections/${collectionName}/${sequence}`
        );
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["collections", collectionName],
      }),
  });
};
