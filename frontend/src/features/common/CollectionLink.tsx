import { Link } from "@tanstack/react-router";
import useLocalStorage from "../../hooks/useLocalStorage";
import { forwardRef } from "react";

interface Props {
  className?: string;
  collectionId: string;
  content: string | JSX.Element;
  keyboardShortCut?: string;
  onClick?: () => void;
}

const CollectionLink = forwardRef<HTMLAnchorElement, Props>(
  function CollectionLink(
    { className = "", collectionId, content, keyboardShortCut, onClick }: Props,
    ref
  ) {
    const [collection] = useLocalStorage(`collection-${collectionId}`, {
      page: 1,
      view: "gallery",
    });

    return (
      <Link
        className={className}
        to="/collections/$collectionId"
        search={{ page: collection.page, view: collection.view }}
        params={{ collectionId }}
        onClick={onClick}
        aria-label={`Navigate to ${content}`}
        ref={ref}
      >
        <span className="grid gap-1">
          <span>{content}</span>
          {keyboardShortCut && (
            <span className="text-xs text-slate-500">{keyboardShortCut}</span>
          )}
        </span>
      </Link>
    );
  }
);

export default CollectionLink;
