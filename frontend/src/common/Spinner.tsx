import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

interface Props {
  className?: string;
}

export default function Spinner({ className }: Props) {
  return (
    <FontAwesomeIcon
      className={className}
      icon={faCircleNotch}
      spin={true}
      size="2x"
    />
  );
}
