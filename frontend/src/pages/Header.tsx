import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import CollectionLink from "./CollectionLink";
import Logo from "./Logo";
import ThemeToggler from "./ThemeToggle";
import SelectView from "../collections/SelectView";

export default function Header() {
  const [showNav, setShowNav] = useState(false);
  const router = useRouter();
  const isViewing = router.state.currentLocation.pathname !== "/";

  return (
    <header className="navbar flex items-center justify-between bg-base-200 px-4 py-2">
      <div className="navbar-start">
        <Logo showDemo={!isViewing} />
      </div>

      <div className="navbar-end md:flex md:gap-6">
        {isViewing && <SelectView className="hidden md:block" />}
        <label
          tabIndex={0}
          className="btn-ghost btn"
          onClick={() => setShowNav(!showNav)}
        >
          <FontAwesomeIcon icon={faBars} className="h-5" />
        </label>
        <div
          className={`absolute right-0 top-16 z-50 flex w-44 flex-col items-center gap-2 rounded bg-base-300 py-4 ${
            showNav ? "" : "hidden"
          }`}
        >
          <SelectView className="md:hidden" />

          <CollectionLink
            collectionId="favorites"
            content="Favorites"
            onClick={() => setShowNav(false)}
          />

          <CollectionLink
            collectionId="ham"
            content="All"
            onClick={() => setShowNav(false)}
          />

          <ThemeToggler />
        </div>
      </div>
    </header>
  );
}
