import { useQuery } from "@tanstack/react-query";
import { get } from "./fetch";

interface UseGetCollectionProps {
  page: number;
  collectionName: string;
}

export const useGetCollection = (params: UseGetCollectionProps) =>
  useQuery<CollectionResponse, ServerError>({
    queryKey: ["collections", params],
    keepPreviousData: true,
    queryFn: () => get("collections", params),
  });

export const useGetPainting = (collection: string, sequence: number) =>
  useQuery<PaintingResponse, ServerError>({
    queryKey: ["collections", collection, sequence],
    keepPreviousData: true,
    queryFn: () => get(`collections/${collection}/${sequence}`),
  });
