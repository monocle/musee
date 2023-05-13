import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function PlusIcon() {
  return (
    <div className="btn-sm btn">
      <FontAwesomeIcon icon={faPlus} className="text-success" />
    </div>
  );
}
