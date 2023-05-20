import { Link } from "@tanstack/react-router";
import useLocalStorage from "../services/useLocalStorage";

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
  const [collection] = useLocalStorage("collection", {
    page: 1,
    view: "gallery",
    collectionId,
  });

  return (
    <Link
      className={className}
      to="/collections/$collectionId"
      search={{ page: collection.page, view: collection.view }}
      params={{ collectionId: collection.collectionId }}
      onClick={onClick}
    >
      {content}
    </Link>
  );
}
