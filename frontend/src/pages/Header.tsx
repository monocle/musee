import { useState } from "react";
import { Link } from "@tanstack/react-router";
import ExploreLink from "../common/ExploreLink";
import Logo from "./Logo";
import MenuIcon from "../icons/MenuIcon";
import ThemeToggler from "../common/ThemeToggler";

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
          <MenuIcon />
        </label>
        <div
          className={`absolute right-0 top-16 z-50 flex w-44 flex-col items-center gap-2 rounded bg-base-300 py-4 ${
            showNav ? "" : "hidden"
          }`}
        >
          <ExploreLink
            content="Explore"
            className="btn-ghost btn font-semibold hover:text-blue-500"
          />
          <Link
            to="/paintings"
            className="btn-ghost btn font-semibold hover:text-blue-500"
            activeProps={{ style: { display: "none" } }}
          >
            Paintings
          </Link>
        </div>
        <ThemeToggler />
      </div>
    </header>
  );
}
