import { useQuery } from "@tanstack/react-query";
import { get } from "../services/fetch";

interface UseGetPaintingsProps {
  page: number;
  collectionName: string;
}

export const useGetPaintings = (params: UseGetPaintingsProps) =>
  useQuery<PaintingsResponse, ServerError>({
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
