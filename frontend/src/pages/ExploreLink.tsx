import { Link } from "@tanstack/react-router";
import useLocalStorage from "../services/useLocalStorage";
import useFetchImage from "../services/useFetchImage";

interface Props {
  className?: string;
  content: string | JSX.Element;
}

export default function ExploreLink({ className = "", content }: Props) {
  const collection = "ham";
  const [painting] = useLocalStorage("paintingIdx", 1);
  useFetchImage(collection, painting);

  return (
    <Link
      className={className}
      to="/explore"
      search={{ collection, painting }}
      activeProps={{ style: { display: "none" } }}
    >
      {content}
    </Link>
  );
}
