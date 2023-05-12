import { Link } from "@tanstack/react-router";
import ExploreLink from "../common/ExploreLink";
import Logo from "./Logo";
import MenuIcon from "../icons/MenuIcon";
import ThemeIcon from "../common/ThemeToggler";

export default function Header() {
  return (
    <header className="navbar flex items-center justify-between bg-base-100 px-4 py-2">
      <div className="navbar-start">
        <Logo />
      </div>

      <div className="navbar-center md:hidden"></div>

      <div className="navbar-end">
        <ul className="hidden items-center gap-10 md:flex">
          <li>
            <ExploreLink
              content="Explore"
              className="font-semibold hover:text-blue-500"
            />
          </li>
          <li>
            <Link to="/paintings" className="font-semibold hover:text-blue-500">
              Paintings
            </Link>
          </li>
          <li>
            <ThemeIcon />
          </li>
        </ul>

        <div className="dropdown flex items-center gap-2 md:hidden">
          <ThemeIcon />

          <label tabIndex={0} className="btn-ghost btn">
            <MenuIcon />
          </label>

          <ul className="dropdown-content menu -left-10 top-14 w-40 justify-center bg-base-100">
            <li>
              <ExploreLink
                content="Explore"
                className="py-6 pl-6 text-center font-semibold hover:text-blue-500"
              />
            </li>
            <li>
              <Link
                to="/paintings"
                className="py-6 pl-6 font-semibold hover:text-blue-500"
              >
                Paintings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
