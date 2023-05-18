import { useState } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";

interface Props {
  className?: string;
}

export default function SelectView({ className = "" }: Props) {
  const navigate = useNavigate({ from: "/collections/$collectionId" });
  const router = useRouter();
  const [view, setView] = useState(router.state.currentLocation.search.view);

  const handleViewChange = (newView: string) => {
    const collectionId = "ham";

    if (newView === "primary") {
      navigate({
        to: "/explore",
        search: { collection: collectionId, painting: 1 },
      });
    } else {
      navigate({
        to: "/collections/$collectionId",
        search: (prev) => ({ page: prev.page ?? 1, view: newView }),
        params: { collectionId },
      });
    }
    setView(newView);
  };

  return (
    <select
      value={view}
      className={`select select-xs md:select-sm ${className}`}
      onChange={(e) => handleViewChange(e.target.value)}
    >
      <option value="primary">Primary View</option>
      <option value="gallery">Gallery View</option>
      <option value="list">List View</option>
    </select>
  );
}
