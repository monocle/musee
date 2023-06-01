import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

type LinkName = "all" | "favorites" | "hero" | "home";

const linkNameRegexMap: Record<LinkName, RegExp> = {
  all: /all/i,
  favorites: /favorites/i,
  hero: /let's go/i,
  home: /home/i,
};

export default function appUser() {
  const user = userEvent.setup();
  return {
    ...user,
    clickLink: async (name: LinkName) => {
      await user.click(
        screen.getByRole("link", {
          name: linkNameRegexMap[name],
        })
      );
    },
  };
}
