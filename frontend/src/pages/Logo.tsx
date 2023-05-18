import { Link } from "@tanstack/react-router";

interface Props {
  showDemo: boolean;
  className?: string;
}

export default function Logo({ showDemo, className = "" }: Props) {
  const isDemo = import.meta.env.VITE_IS_DEMO;

  return (
    <div className="flex items-center">
      <Link
        to="/"
        className={`text-xl font-semibold text-info hover:text-blue-500 ${className}`}
      >
        Musee
      </Link>
      {isDemo && showDemo && (
        <span className="badge ml-3 text-xs italic">Demo</span>
      )}
    </div>
  );
}
