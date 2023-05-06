import { useQuery } from "@tanstack/react-query";
import type { PaintingsResponse, ServerError } from "../types";
import { get } from "../services/fetch";

interface UseGetPaintingsProps {
  offset: number;
  limit: number;
}

export const useGetPaintings = (params: UseGetPaintingsProps) =>
  useQuery<PaintingsResponse, ServerError>({
    queryKey: ["paintings", params.offset],
    keepPreviousData: true,
    queryFn: () =>
      get("paintings", params).then((data: PaintingsResponse) => {
        const records = data.records.filter(
          (painting) =>
            painting.primaryimageurl && painting.imagepermissionlevel === 0
        );

        records.forEach((painting) => {
          if (painting.dimensions) {
            painting.dimensionsArr = painting.dimensions.split("\r\n");
          } else {
            painting.dimensionsArr = [];
          }
          painting.artist = painting.people?.find(
            (person) => person.role === "Artist"
          );
        });

        return { records, count: data.count } as PaintingsResponse;
      }),
  });
