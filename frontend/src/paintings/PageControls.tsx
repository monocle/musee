import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  offset: number;
  limit: number;
  total: number;
  showDetails?: boolean;
  className?: string;
  onOffsetChange: (newOffset: number) => void;
}

export default function PageControls({
  offset,
  limit,
  total,
  showDetails = true,
  className = "",
  onOffsetChange,
}: Props) {
  const lastPos = offset + Math.min(limit, total - offset);
  const isFirstPage = offset === 0;
  const isLastPage = lastPos >= total;

  const handleDecrement = () => {
    const newOffset = offset - limit;
    onOffsetChange(newOffset < 0 ? 0 : newOffset);
  };

  const handleIncrement = () => {
    const newOffset = offset + limit;
    onOffsetChange(newOffset > total ? total : newOffset);
  };

  return (
    <div className={`btn-group ${className}`}>
      <button
        className="btn-md btn"
        disabled={isFirstPage}
        onClick={handleDecrement}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button className="btn-disabled btn-md btn">
        {showDetails && (
          <>
            {offset + 1} {offset !== lastPos - 1 && `- ${lastPos}`} / {total}
          </>
        )}
      </button>

      <button
        className="btn-md btn"
        disabled={isLastPage}
        onClick={handleIncrement}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}
