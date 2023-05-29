import { render, screen } from "../../../testing";
import Button from "./Button";

const button = () => screen.getByRole("button");

it("renders with baseline className", () => {
  const { container } = render(<Button className="foo" />);
  expect(container.firstChild).toMatchSnapshot();
});

it("can accept a text prop", () => {
  render(<Button text={"myButton"} />);
  expect(button()).toHaveTextContent("myButton");
});

it("can accept children as content", () => {
  render(
    <Button>
      <span>myButton</span>
    </Button>
  );
  expect(button()).toHaveTextContent("myButton");
});

it("can be disabled", () => {
  render(<Button disabled={true} />);
  expect(button()).toBeDisabled();
});

it("has a loading class when in the loading state", () => {
  render(<Button isLoading={true} className="foo" />);
  expect(button()).toHaveClass("loading");
});
