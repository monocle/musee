import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../common/Button";

interface Props {
  page: number;
  maxPages: number;
  isLoading?: boolean;
  className?: string;
  navigate: (newPage: number) => void;
}

export default function PageControls({
  page,
  maxPages,
  isLoading = false,
  className = "",
  navigate,
}: Props) {
  // const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    if (page > maxPages || page < 1) return;

    window.scroll({ top: 0 });
    navigate(newPage);
  };

  return (
    <div className={`btn-group ${className}`}>
      <Button
        className="btn-sm"
        disabled={page === 1 || isLoading}
        onClick={() => handlePageChange(page - 1)}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>

      <button className="btn-disabled btn-sm btn">
        {page} / {maxPages}
      </button>

      <Button
        className="btn-sm btn"
        disabled={page >= maxPages || isLoading}
        onClick={() => handlePageChange(page + 1)}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </div>
  );
}
