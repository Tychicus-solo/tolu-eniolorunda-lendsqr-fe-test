import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserStats from "./index";

describe("UserStats Component", () => {
  test("renders all four stat categories correctly", () => {
    render(<UserStats />);

    const labels = [
      "USERS",
      "ACTIVE USERS",
      "USERS WITH LOANS",
      "USERS WITH SAVINGS",
    ];

    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test("renders the correct values for each stat", () => {
    render(<UserStats />);

    const duplicateValues = screen.getAllByText("2,453");
    expect(duplicateValues).toHaveLength(2);


    expect(screen.getByText("12,453")).toBeInTheDocument();
    expect(screen.getByText("102,453")).toBeInTheDocument();
  });

  test("applies the correct background color tint to icon wrappers", () => {
    const { container } = render(<UserStats />);

    const iconWrapper = container.querySelector(".stat-card__icon-wrapper");
    expect(iconWrapper).toHaveStyle("background-color: #df18ff15");
  });

  test("renders icons with correct class names", () => {
    render(<UserStats />);
    const images = document.querySelectorAll("img.stat-card__icon");
    expect(images.length).toBe(4);
  });
});
