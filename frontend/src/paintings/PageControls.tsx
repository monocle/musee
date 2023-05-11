import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../common/Button";

interface Props {
  page: number;
  pageMax: number;
  isLoading?: boolean;
  className?: string;
  onPageChange: (newPage: number) => void;
}

export default function PageControls({
  page,
  pageMax,
  isLoading = false,
  className = "",
  onPageChange,
}: Props) {
  const [lastClicked, setLastClicked] = useState<"next" | "prev">("prev");
  const handleIncrement = () => {
    if (page > pageMax) return;
    onPageChange(page + 1);
    setLastClicked("next");
  };

  const handleDecrement = () => {
    if (page < 1) return;
    onPageChange(page - 1);
    setLastClicked("prev");
  };

  return (
    <div className={`btn-group ${className}`}>
      <Button
        className="btn-sm"
        disabled={page === 1 || isLoading}
        isLoading={isLoading && lastClicked === "prev"}
        onClick={handleDecrement}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>

      <button className="btn-disabled btn-sm btn">
        {page} / {pageMax}
      </button>

      <Button
        className="btn-sm btn"
        disabled={page >= pageMax || isLoading}
        isLoading={isLoading && lastClicked === "next"}
        onClick={handleIncrement}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </div>
  );
}
