import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Button from "../common/Button";

interface Props {
  painting: Painting;
}

export default function FavoriteToggle({ painting }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const icon = isFavorite ? faMinus : faPlus;
  const color = isFavorite ? "text-warning" : "text-success";

  return (
    <Button className="btn-sm" onClick={() => setIsFavorite(!isFavorite)}>
      <FontAwesomeIcon icon={icon} className={color} />
    </Button>
  );
}
