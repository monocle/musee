import { Link } from "@tanstack/react-router";
import useLocalStorage from "../services/useLocalStorage";
import useFetchImage from "../services/useFetchImage";

interface Props {
  className?: string;
  content: string | JSX.Element;
}

export default function ExploreLink({ className = "", content }: Props) {
  const [painting] = useLocalStorage("paintingIdx", 1);
  useFetchImage(painting);

  return (
    <Link
      className={className}
      to="/explore"
      search={{ painting }}
      activeProps={{ style: { display: "none" } }}
    >
      {content}
    </Link>
  );
}
