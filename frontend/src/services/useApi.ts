import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "../services/useLocalStorage";

const API_PREFIX = "/api/";

async function processRequest(req: Promise<AxiosResponse>) {
  return req
    .then((response) => response.data)
    .catch((e) => {
      throw e.response.data;
    });
}

export async function apiGet(path: string, params?: AxiosRequestConfig) {
  return processRequest(axios.get(API_PREFIX + path, { params }));
}

async function apiPost(path: string, body?: AxiosRequestConfig) {
  return processRequest(axios.post(API_PREFIX + path, body));
}

async function apiDelete(path: string) {
  return processRequest(axios.delete(API_PREFIX + path));
}

export const useGetCollection = ({
  collectionId,
  page,
  view,
}: {
  collectionId: string;
  page: number;
  view: string;
}) => {
  const [collection, setStoredCollection] = useLocalStorage(
    `collection-${collectionId}`,
    { collectionId, page, view }
  );

  if (page !== collection.page || view !== collection.view) {
    setStoredCollection({ collectionId, page, view });
  }

  return useQuery<CollectionResponse, ServerError>({
    queryKey: ["collections", collectionId, { page }],
    keepPreviousData: true,
    queryFn: () =>
      apiGet(`collections/${collectionId}`, { page } as AxiosRequestConfig),
  });
};

export const useGetPainting = ({
  collectionId,
  sequence,
}: {
  collectionId: string;
  page: number;
  sequence: number;
}) => {
  return useQuery<PaintingResponse, ServerError>({
    queryKey: ["collections", collectionId, { sequence }],
    keepPreviousData: true,
    queryFn: () => apiGet(`collections/${collectionId}/paintings/${sequence}`),
  });
};

export const useUpdateFavorite = () => {
  const queryClient = useQueryClient();
  const userId = 1;
  const collectionId = "favorites";

  return useMutation({
    mutationFn: ({
      painting,
      isAdd,
    }: {
      painting: Painting;
      isAdd: boolean;
      page: number;
    }) => {
      if (isAdd) {
        return apiPost(
          `users/${userId}/collections/${collectionId}/paintings`,
          {
            id: painting.id,
          } as AxiosRequestConfig
        );
      }
      return apiDelete(
        `users/${userId}/collections/${collectionId}/paintings/${painting.id}`
      );
    },
    onSuccess: (_, { painting, page }) => {
      queryClient.invalidateQueries({
        queryKey: ["collections", collectionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["collections", painting.source, { page }],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "collections",
          painting.source,
          { sequence: painting.sequence },
        ],
      });
    },
  });
};
