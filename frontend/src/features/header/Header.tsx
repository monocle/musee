import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import CollectionLink from "../common/CollectionLink";
import Logo from "./Logo";
import ThemeToggler from "./ThemeToggle";

export default function Header() {
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = showNav
      ? document.addEventListener
      : document.removeEventListener;

    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideClick =
        navRef.current &&
        event.target instanceof Element &&
        !navRef.current.contains(event.target);

      if (isOutsideClick) setShowNav(false);
    };

    listener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNav]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-base-200 px-4">
      <Logo />

      <nav
        className="flex items-center gap-1 md:gap-6"
        ref={navRef}
        aria-label="Site"
      >
        <button
          className="btn-ghost btn"
          onClick={() => setShowNav(!showNav)}
          aria-label="Click to access site navigation"
        >
          <FontAwesomeIcon icon={faBars} className="h-5" />
        </button>
        <div
          className={`absolute right-0 top-12 z-50 flex w-44 transform flex-col items-center gap-2 rounded bg-base-300 px-2 py-4 transition-all duration-300 ease-out ${
            showNav ? "" : "hidden"
          }`}
        >
          <CollectionLink
            className="btn-ghost btn w-full font-semibold hover:text-blue-500"
            collectionId="favorites"
            content="Favorites"
            onClick={() => setShowNav(false)}
          />

          <CollectionLink
            className="btn-ghost btn w-full font-semibold hover:text-blue-500"
            collectionId="aic"
            content="All"
            onClick={() => setShowNav(false)}
          />
        </div>

        <ThemeToggler />
      </nav>
    </header>
  );
}
