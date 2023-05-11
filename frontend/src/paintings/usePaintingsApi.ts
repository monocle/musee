import { useQuery } from "@tanstack/react-query";
import { get } from "../services/fetch";

interface UseGetPaintingsProps {
  page: number;
  source: string;
}

export const useGetPaintings = (params: UseGetPaintingsProps) =>
  useQuery<PaintingsResponse, ServerError>({
    queryKey: ["paintings", params],
    keepPreviousData: true,
    queryFn: () => get("paintings", params),
  });
