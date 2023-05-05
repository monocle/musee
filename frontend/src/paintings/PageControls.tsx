interface Props {
  offset: number;
  limit: number;
  total: number;
  onOffsetChange: (newOffset: number) => void;
}

export default function PageControls({
  offset,
  limit,
  total,
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
    <div className="btn-group">
      <button
        className="btn-sm btn"
        disabled={isFirstPage}
        onClick={handleDecrement}
      >
        «
      </button>
      <button className="btn-disabled btn-sm btn">
        {offset} - {lastPos} / {total}
      </button>

      <button
        className="btn-sm btn"
        disabled={isLastPage}
        onClick={handleIncrement}
      >
        »
      </button>
    </div>
  );
}
