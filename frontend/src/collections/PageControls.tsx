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
  onPageChange: (newPage: number) => void;
}

export default function PageControls({
  page,
  maxPages,
  isLoading = false,
  className = "",
  onPageChange,
}: Props) {
  const handleIncrement = () => {
    if (page > maxPages) return;
    onPageChange(page + 1);
  };

  const handleDecrement = () => {
    if (page < 1) return;
    onPageChange(page - 1);
  };

  return (
    <div className={`btn-group ${className}`}>
      <Button
        className="btn-sm"
        disabled={page === 1 || isLoading}
        onClick={handleDecrement}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>

      <button className="btn-disabled btn-sm btn">
        {page} / {maxPages}
      </button>

      <Button
        className="btn-sm btn"
        disabled={page >= maxPages || isLoading}
        onClick={handleIncrement}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </div>
  );
}
