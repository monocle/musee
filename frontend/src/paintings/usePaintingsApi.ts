import { useQuery } from "@tanstack/react-query";
import { get } from "../services/fetch";

interface UseGetPaintingsProps {
  offset: number;
  limit: number;
}

export const useGetPaintings = (params: UseGetPaintingsProps) =>
  useQuery<PaintingsResponse, ServerError>({
    queryKey: ["paintings", params.offset],
    keepPreviousData: true,
    queryFn: () => get("paintings", params),
  });
