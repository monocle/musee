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
        className={`text-xl font-semibold text-primary hover:link-info ${className}`}
        aria-label="Navigate to home page"
      >
        Musee
      </Link>
      {isDemo && <span className="badge ml-3 text-xs italic">Demo</span>}
    </div>
  );
}
