import { Link } from "@tanstack/react-router";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="navbar flex items-center justify-between bg-base-100 px-4 py-2">
      <Logo />

      <div>
        <Link to="/painting" className="pr-4 font-semibold hover:text-blue-500">
          Painting
        </Link>

        <Link
          to="/paintings"
          className="pr-4 font-semibold hover:text-blue-500"
        >
          Paintings
        </Link>
      </div>
    </header>
  );
}
