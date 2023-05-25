import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarReg } from "@fortawesome/free-regular-svg-icons";
import Button from "../common/Button";
import { useUpdateFavorite } from "../services/useApi";

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
  const color = isFavorite ? "btn-ghost text-accent" : "text-accent";

  const handleFavoriteToggle = () => {
    updateFavorite.mutate({ record, isAdd: !isFavorite, page });
  };

  return (
    <Button
      className={`btn ${color} ${className}`}
      onClick={handleFavoriteToggle}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
}