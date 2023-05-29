import { useState } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";

interface Props {
  className?: string;
}

export default function ViewSelect({ className = "" }: Props) {
  const navigate = useNavigate({ from: "/collections/$collectionId" });
  const router = useRouter();
  const [view, setView] = useState(router.state.currentLocation.search.view);

  const handleViewChange = (newView: string) => {
    navigate({
      to: "/collections/$collectionId",
      search: (prev) => ({ ...prev, view: newView }),
    });
    setView(newView);
  };

  return (
    <select
      value={view}
      className={`select select-sm ${className}`}
      onChange={(e) => handleViewChange(e.target.value)}
      aria-label="View options"
    >
      <option value="gallery">Gallery View</option>
      <option value="list">List View</option>
    </select>
  );
}
