import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import CollectionLink from "./CollectionLink";
import ExploreLink from "./ExploreLink";
import Logo from "./Logo";
import ThemeToggler from "./ThemeToggle";

interface Props {
  showDemo?: boolean;
}

export default function Header({ showDemo = true }: Props) {
  const [showNav, setShowNav] = useState(false);

  return (
    <header className="navbar flex items-center justify-between bg-base-200 px-4 py-2">
      <div className="navbar-start">
        <Logo showDemo={showDemo} />
      </div>

      <div className="navbar-end">
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
          <ExploreLink
            content="Explore"
            className="btn-ghost btn w-full font-semibold hover:text-blue-500"
          />

          <div className="mt-4 border-b border-base-100 py-2 text-xs italic text-base-content">
            Collections
          </div>

          <CollectionLink
            collectionName="favorites"
            content="Favorites"
            onClick={() => setShowNav(false)}
          />

          <CollectionLink
            collectionName="ham"
            content="HAM"
            onClick={() => setShowNav(false)}
          />
        </div>
        <ThemeToggler />
      </div>
    </header>
  );
}
