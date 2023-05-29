import { Link } from "@tanstack/react-router";
import useLocalStorage from "../../hooks/useLocalStorage";

interface Props {
  className?: string;
  collectionId: string;
  content: string | JSX.Element;
  onClick?: () => void;
}

export default function CollectionLink({
  className = "",
  collectionId,
  content,
  onClick,
}: Props) {
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
    >
      {content}
    </Link>
  );
}
