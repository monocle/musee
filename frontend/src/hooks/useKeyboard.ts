import { useEffect, useRef } from "react";

export default function useKeyboard<T extends HTMLElement = HTMLAnchorElement>(
  key: string
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === key) ref.current?.click();
    };

    window.addEventListener("keyup", listener);
    return () => window.removeEventListener("keyup", listener);
  }, [key]);

  return ref;
}
