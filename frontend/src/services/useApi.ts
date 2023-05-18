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
  collectionId: string;
}

export const useGetCollection = ({
  collectionId,
  page,
}: UseGetCollectionProps) =>
  useQuery<CollectionResponse, ServerError>({
    queryKey: ["collections", { collectionId, page }],
    keepPreviousData: true,
    queryFn: () =>
      apiGet(`collections/${collectionId}`, { page } as AxiosRequestConfig),
  });

export const useGetPainting = (collectionId: string, sequence: number) =>
  useQuery<PaintingResponse, ServerError>({
    queryKey: ["collections", { collectionId, sequence }],
    keepPreviousData: true,
    queryFn: () => apiGet(`collections/${collectionId}/sequence/${sequence}`),
  });

export const useUpdateFavorite = () => {
  const queryClient = useQueryClient();
  const userId = 1;
  const collectionId = "favorites";

  return useMutation({
    mutationFn: ({ id, isAdd }: { id: PaintingId; isAdd: boolean }) => {
      if (isAdd) {
        return apiPost(
          `users/${userId}/collections/${collectionId}/paintings`,
          {
            id,
          } as AxiosRequestConfig
        );
      }
      return apiDelete(
        `users/${userId}/collections/${collectionId}/paintings/${id}`
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["collections", collectionId],
      }),
  });
};
