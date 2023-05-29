import { render, screen, userEvent } from "../../testing";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("toggles the button's aria-label", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveAccessibleName(/switch to dark mode/i);

    await user.click(button);
    expect(button).toHaveAccessibleName(/switch to light mode/i);

    await user.click(button);
    expect(button).toHaveAccessibleName(/switch to dark mode/i);
  });

  it("toggles the icon", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const icon = screen.getByTestId("theme-icon");
    expect(icon).toHaveClass("fa-sun");

    await user.click(icon);
    expect(icon).toHaveClass("fa-moon");

    await user.click(icon);
    expect(icon).toHaveClass("fa-sun");
  });

  it("toggles the document's theme", async () => {
    Object.defineProperty(document.documentElement, "dataset", {
      value: {},
      configurable: true,
    });
    const user = userEvent.setup();
    const theme = () => document.documentElement.dataset.theme;
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(theme()).toBe(undefined);

    await user.click(button);
    expect(theme()).toBe("dark");

    await user.click(button);
    expect(theme()).toBe("light");
  });
});
