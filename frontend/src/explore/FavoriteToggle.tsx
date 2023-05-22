import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarReg } from "@fortawesome/free-regular-svg-icons";
import Button from "../common/Button";
import { useUpdateFavorite } from "../services/useApi";

interface Props {
  page: number;
  painting: Painting;
  className?: string;
}

export default function FavoriteToggle({
  page,
  painting,
  className = "",
}: Props) {
  const updateFavorite = useUpdateFavorite();
  const isFavorite = !!painting.favoritesSequence;
  const icon = isFavorite ? faStarSolid : faStarReg;
  const color = isFavorite
    ? "btn-accent btn-outline text-accent-content"
    : "text-accent";

  const handleFavoriteToggle = () => {
    updateFavorite.mutate({ painting, isAdd: !isFavorite, page });
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
