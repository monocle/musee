import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../common/button/Button";

interface Props {
  page: number;
  maxPages: number;
  isLoading?: boolean;
  className?: string;
  onPageChange: (newPage: number) => void;
}

export default function PageControls({
  page,
  maxPages,
  isLoading = false,
  className = "",
  onPageChange,
}: Props) {
  const handlePageChange = (newPage: number) => {
    if (page > maxPages || page < 1) return;

    window.scroll({ top: 0 });
    onPageChange(newPage);
  };

  return (
    <div className={`btn-group ${className}`} aria-label="Page navigation">
      <Button
        className="btn-sm"
        disabled={page === 1 || isLoading}
        onClick={() => handlePageChange(page - 1)}
        aria-label="Go back a page"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>

      <div
        className="btn-disabled btn-sm btn"
        aria-label="Current and max pages"
      >
        {maxPages === 0 ? 0 : page} / {maxPages}
      </div>

      <Button
        className="btn-sm btn"
        disabled={page >= maxPages || isLoading}
        onClick={() => handlePageChange(page + 1)}
        aria-label="Go forward a page"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </div>
  );
}
