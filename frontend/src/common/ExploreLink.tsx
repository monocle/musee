import { Link } from "@tanstack/react-router";
import useLocalStorage from "../services/useLocalStorage";

interface Props {
  className?: string;
  content: string | JSX.Element;
}

export default function ExploreLink({ className = "", content }: Props) {
  const [page] = useLocalStorage("page", 1);
  const [painting] = useLocalStorage("paintingIdx", 1);

  return (
    <Link className={className} to="/explore" search={{ page, painting }}>
      {content}
    </Link>
  );
}
