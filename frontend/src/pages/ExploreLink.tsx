import { Link } from "@tanstack/react-router";
import useLocalStorage from "../services/useLocalStorage";

interface Props {
  className?: string;
  content: string | JSX.Element;
}

export default function ExploreLink({ className = "", content }: Props) {
  const [collection] = useLocalStorage("collection", {
    page: 1,
    view: "gallery",
    collectionId: "ham",
  });

  return (
    <Link
      className={className}
      to="/collections/$collectionId"
      search={{ page: collection.page, view: collection.view }}
      params={{ collectionId: collection.collectionId }}
    >
      {content}
    </Link>
  );
}
