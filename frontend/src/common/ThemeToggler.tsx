import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

interface Props {
  className?: string;
}

export default function ThemeIcon({ className }: Props) {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme);

  const handleThemeChange = () => {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = newTheme;
    setTheme(newTheme);
  };

  return (
    <div className="btn-ghost btn" onClick={handleThemeChange}>
      <FontAwesomeIcon
        icon={theme === "dark" ? faMoon : faSun}
        className={`text-accent-content  ${className}`}
      />
    </div>
  );
}
