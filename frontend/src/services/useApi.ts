import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "../services/useLocalStorage";
import queryClient from "../queryClient";

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

interface UseGetCollectionProps {
  page: number;
  collectionId: string;
  view: string;
}

export const useGetCollection = ({
  collectionId,
  page,
  view,
}: UseGetCollectionProps) => {
  const [collection, setStoredCollection] = useLocalStorage("collection", {
    collectionId,
    page,
    view,
  });

  if (
    collectionId !== collection.collectionId ||
    page !== collection.page ||
    view !== collection.view
  ) {
    setStoredCollection({ collectionId, page, view });
  }

  return useQuery<CollectionResponse, ServerError>({
    queryKey: ["collections", { collectionId, page }],
    keepPreviousData: true,
    queryFn: () =>
      apiGet(`collections/${collectionId}`, { page } as AxiosRequestConfig),
  });
};

export const useGetPainting = ({
  collectionId,
  page,
  sequence,
}: {
  collectionId: string;
  page: number;
  sequence: number;
}) => {
  const queryKey = ["collections", { collectionId, page }];

  return useQuery<PaintingResponse, ServerError>({
    queryKey: ["collections", collectionId, sequence],
    keepPreviousData: true,
    queryFn: () => apiGet(`collections/${collectionId}/paintings/${sequence}`),
    initialData: () => {
      const collectionResponse =
        queryClient.getQueryData<CollectionResponse>(queryKey);

      if (!collectionResponse) return undefined;

      const painting = collectionResponse.records.find(
        (painting) => painting.sequence === sequence
      );

      return painting
        ? { painting, maxSequence: collectionResponse.maxRecords }
        : undefined;
    },
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(queryKey)?.dataUpdatedAt,
  });
};

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
