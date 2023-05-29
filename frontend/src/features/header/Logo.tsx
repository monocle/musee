import { Link } from "@tanstack/react-router";

interface Props {
  className?: string;
}

export default function Logo({ className = "" }: Props) {
  const isDemo = import.meta.env.VITE_IS_DEMO;

  return (
    <div className="flex items-center">
      <Link
        to="/"
        className={`text-xl font-semibold text-info hover:text-blue-500 ${className}`}
        aria-label="Navigate to home page"
      >
        Musee
      </Link>
      {isDemo && <span className="badge ml-3 text-xs italic">Demo</span>}
    </div>
  );
}
