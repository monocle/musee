import { Link } from "@tanstack/react-router";
import useLocalStorage from "../services/useLocalStorage";

interface Props {
  className?: string;
  collectionId: string;
  content: string | JSX.Element;
  onClick: () => void;
}

export default function CollectionLink({
  className = "",
  collectionId,
  content,
  onClick,
}: Props) {
  const [search] = useLocalStorage(`search`, { page: 1, view: "gallery" });

  return (
    <Link
      className={`btn-ghost btn w-full font-semibold hover:text-blue-500 ${className}`}
      to="/collections/$collectionId"
      search={search}
      params={{ collectionId }}
      activeProps={{ style: { display: "none" } }}
      onClick={onClick}
    >
      {content}
    </Link>
  );
}
