import { useState } from "react";
import { useGetPainting } from "./useCollectionsApi";

export default function useFetchImage(collection: string, sequence: number) {
  const [prevSeq, setPrevSeq] = useState(0);
  const { isSuccess, data } = useGetPainting(collection, sequence);

  if (prevSeq < sequence && isSuccess) {
    const img = new Image();
    img.src = data.painting.primaryimageurl;

    setPrevSeq(sequence);
  }
}
