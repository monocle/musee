import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ExploreLink from "./ExploreLink";
import Logo from "./Logo";
import ThemeToggler from "./ThemeToggler";

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

          <Link
            className="btn-ghost btn w-full font-semibold hover:text-blue-500"
            to="/collections/$collectionName"
            params={{ collectionName: "favorites" }}
            search={{ page: 1 }}
            activeProps={{ style: { display: "none" } }}
            onClick={() => setShowNav(false)}
          >
            Favorites
          </Link>

          <Link
            className="btn-ghost btn w-full font-semibold hover:text-blue-500"
            to="/collections/$collectionName"
            params={{ collectionName: "ham" }}
            search={{ page: 1 }}
            activeProps={{ style: { display: "none" } }}
            onClick={() => setShowNav(false)}
          >
            HAM
          </Link>
        </div>
        <ThemeToggler />
      </div>
    </header>
  );
}
