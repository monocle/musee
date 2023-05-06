import { Link } from "@tanstack/react-router";

interface Props {
  className?: string;
}

export default function Logo({ className = "" }: Props) {
  const isDemo = import.meta.env.MODE === "demo";

  return (
    <Link
      to="/"
      className={`text-xl font-semibold hover:text-blue-500 ${className}`}
    >
      Musee {isDemo && <span className="pl-4 text-xs">(Demo Mode)</span>}
    </Link>
  );
}
