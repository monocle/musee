import { Link } from "@tanstack/react-router";
import useLocalStorage from "../services/useLocalStorage";

interface Props {
  className?: string;
  collectionName: string;
  content: string | JSX.Element;
  onClick: () => void;
}

export default function CollectionLink({
  className = "",
  collectionName,
  content,
  onClick,
}: Props) {
  const [page] = useLocalStorage(`${collectionName}-page`, 1);

  return (
    <Link
      className={`btn-ghost btn w-full font-semibold hover:text-blue-500 ${className}`}
      to="/collections/$collectionName"
      search={{ page }}
      params={{ collectionName }}
      activeProps={{ style: { display: "none" } }}
      onClick={onClick}
    >
      {content}
    </Link>
  );
}
