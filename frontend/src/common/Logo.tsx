import { Link } from "@tanstack/react-router";

interface Props {
  className?: string;
  showDemo?: boolean;
}

export default function Logo({ className = "", showDemo = true }: Props) {
  const isDemo = import.meta.env.MODE === "demo";

  return (
    <div className="flex items-center">
      <Link
        to="/"
        className={`text-xl font-semibold text-info hover:text-blue-500 ${className}`}
      >
        Musee
      </Link>
      {isDemo && showDemo && (
        <span className="badge ml-4 text-xs italic">Demo</span>
      )}
    </div>
  );
}
