export default function Header() {
  const isDemo = import.meta.env.MODE === "demo";

  return (
    <header>
      {isDemo && <div className="text-center text-sm">(Demo Mode)</div>}
    </header>
  );
}
