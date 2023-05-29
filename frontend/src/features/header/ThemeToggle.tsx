import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

interface Props {
  className?: string;
}

export default function ThemeToggle({ className = "" }: Props) {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme);

  const handleThemeChange = () => {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = newTheme;
    setTheme(newTheme);
  };

  return (
    <button
      className="btn-ghost btn"
      onClick={handleThemeChange}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      <FontAwesomeIcon
        data-testid="theme-icon"
        icon={theme === "dark" ? faMoon : faSun}
        className={`h-4 text-accent-content ${className}`}
      />
    </button>
  );
}
