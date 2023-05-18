import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Button from "../common/Button";
import { useUpdateFavorite } from "../services/useApi";

interface Props {
  id: PaintingId;
}

export default function FavoriteToggle({ id }: Props) {
  const updateFavorite = useUpdateFavorite();
  const [isFavorite, setIsFavorite] = useState(false);
  const icon = isFavorite ? faMinus : faPlus;
  const color = isFavorite
    ? "text-warning"
    : "btn-accent btn-outline text-accent-content";

  const handleFavoriteToggle = () => {
    updateFavorite.mutate({ id, isAdd: !isFavorite });
    setIsFavorite(!isFavorite);
  };

  return (
    <Button className={`btn-sm ${color}`} onClick={handleFavoriteToggle}>
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
}