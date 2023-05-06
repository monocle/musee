import { Link } from "@tanstack/react-router";

export default function Header() {
  const isDemo = import.meta.env.MODE === "demo";

  return (
    <header className="navbar flex items-center justify-between bg-base-100 px-4 py-2">
      <Link to="/" className="text-xl font-semibold hover:text-blue-500">
        Musee
      </Link>

      {isDemo && <div className="text-sm">(Demo Mode)</div>}

      <Link to="/paintings" className="font-semibold hover:text-blue-500">
        Paintings
      </Link>
    </header>
  );
}
