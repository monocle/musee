import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarReg } from "@fortawesome/free-regular-svg-icons";
import Button from "../common/button/Button";
import { useUpdateFavorite } from "../../hooks/useApi";

interface Props {
  page: number;
  record: ApiRecord;
  className?: string;
}

export default function FavoriteToggle({
  page,
  record,
  className = "",
}: Props) {
  const updateFavorite = useUpdateFavorite();
  const isFavorite = !!record.favoritesSequence;
  const icon = isFavorite ? faStarSolid : faStarReg;

  const handleFavoriteToggle = () => {
    updateFavorite.mutate({ record, isAdd: !isFavorite, page });
  };

  return (
    <>
      <Button
        className={`btn-ghost btn text-primary ${className}`}
        onClick={handleFavoriteToggle}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <FontAwesomeIcon icon={icon} data-testid="favorite-toggle-icon" />
      </Button>
      {updateFavorite.isError && (
        <div className="alert alert-error my-1 text-sm" aria-label="error">
          Unable to set favorite. Click the star to try again.
        </div>
      )}
    </>
  );
}
