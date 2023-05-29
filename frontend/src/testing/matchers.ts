import { screen, within, waitFor } from "@testing-library/react";

export async function expectInDocument(
  text: string | RegExp,
  component?: HTMLElement
) {
  const queryByText = component
    ? within(component).queryByText
    : screen.queryByText;

  await waitFor(() => expect(queryByText(text)).toBeInTheDocument());
}

export async function expectNotInDocument(
  text: string | RegExp,
  component?: HTMLElement
) {
  const queryByText = component
    ? within(component).queryByText
    : screen.queryByText;

  await waitFor(() => expect(queryByText(text)).not.toBeInTheDocument());
}
