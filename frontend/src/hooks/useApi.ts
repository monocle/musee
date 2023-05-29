import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "./useLocalStorage";

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

export const useGetRecord = ({
  collectionId,
  sequence,
}: {
  collectionId: string;
  page: number;
  sequence: number;
}) => {
  return useQuery<ApiRecordResponse, ServerError>({
    queryKey: ["collections", collectionId, { sequence }],
    keepPreviousData: true,
    queryFn: () => apiGet(`collections/${collectionId}/records/${sequence}`),
    retry: (_, error) => error.type !== "missing",
  });
};

export const useUpdateFavorite = () => {
  const queryClient = useQueryClient();
  const userId = 1;
  const collectionId = "favorites";

  return useMutation({
    mutationFn: ({
      record,
      isAdd,
    }: {
      record: ApiRecord;
      isAdd: boolean;
      page: number;
    }) => {
      if (isAdd) {
        return apiPost(`users/${userId}/collections/${collectionId}/records`, {
          id: record.id,
        } as AxiosRequestConfig);
      }
      return apiDelete(
        `users/${userId}/collections/${collectionId}/records/${record.id}`
      );
    },
    onSuccess: (_, { record }) => {
      queryClient.invalidateQueries({
        queryKey: ["collections", collectionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["collections", record.source],
      });
    },
  });
};
