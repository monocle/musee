import { useQuery } from "@tanstack/react-query";
import { get } from "../services/fetch";

interface UseGetPaintingsProps {
  page: number;
  collectionName: string;
}

export const useGetPaintings = (params: UseGetPaintingsProps) =>
  useQuery<PaintingsResponse, ServerError>({
    queryKey: ["paintings", params],
    keepPreviousData: true,
    queryFn: () => get("paintings", params),
  });

export const useGetPainting = (sequence: number) =>
  useQuery<PaintingResponse, ServerError>({
    queryKey: ["paintings", sequence],
    keepPreviousData: true,
    queryFn: () => get(`paintings/${sequence}`),
  });
