import { render } from "@testing-library/react";
import Loader from "./index";

describe("Loader Component", () => {
  test("renders the loader div correctly", () => {
    const { container } = render(<Loader />);

    const loaderElement = container.querySelector(".loader");
    expect(loaderElement).toBeInTheDocument();
  });

  test("does not have an incorrect class name", () => {
    const { container } = render(<Loader />);
    const loaderElement = container.querySelector("div");

    expect(loaderElement).not.toHaveClass("loading-spinner");
    expect(loaderElement).toHaveClass("loader");
  });
});
