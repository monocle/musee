import { Link } from "@tanstack/react-router";
import ExploreLink from "../common/ExploreLink";
import Logo from "./Logo";
import ThemeIcon from "../icons/ThemeIcon";

export default function Header() {
  return (
    <header className="navbar flex items-center justify-between bg-base-100 px-4 py-2">
      <Logo />

      <div>
        <ExploreLink
          content="Explore"
          className="pr-4 font-semibold hover:text-blue-500"
        />

        <Link
          to="/paintings"
          className="pr-4 font-semibold hover:text-blue-500"
        >
          Paintings
        </Link>

        <ThemeIcon />
      </div>
    </header>
  );
}
