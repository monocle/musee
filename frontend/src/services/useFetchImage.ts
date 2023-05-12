import { useState } from "react";
import { useGetPainting } from "../paintings/usePaintingsApi";

export default function useFetchImage(sequence: number) {
  const [prevSeq, setPrevSeq] = useState(0);
  const { isSuccess, data } = useGetPainting(sequence);

  if (prevSeq < sequence && isSuccess) {
    const img = new Image();
    img.src = data.painting.primaryimageurl;

    setPrevSeq(sequence);
  }
}
