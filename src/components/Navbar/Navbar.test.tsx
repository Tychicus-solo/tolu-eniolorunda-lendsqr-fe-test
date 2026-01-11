import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "./index";
import "@testing-library/jest-dom";

jest.mock("../../hooks/useDebounce", () => ({
  useDebounce: (value: string) => value,
}));

describe("Navbar Component", () => {
  const mockOnMenuClick = jest.fn();
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders logo and profile information correctly", () => {
    render(<Navbar onMenuClick={mockOnMenuClick} onSearch={mockOnSearch} />);

    expect(screen.getByAltText("lendsqr-logo")).toBeInTheDocument();
    expect(screen.getByText("Adedeji")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search for anything")
    ).toBeInTheDocument();
  });

  test("calls onMenuClick when hamburger icon is clicked", () => {
    const { container } = render(
      <Navbar onMenuClick={mockOnMenuClick} onSearch={mockOnSearch} />
    );

    const hamburger = container.querySelector(".navbar__hamburger");
    if (hamburger) fireEvent.click(hamburger);

    expect(mockOnMenuClick).toHaveBeenCalledTimes(1);
  });

  test("updates input value on change and triggers onSearch", async () => {
    render(<Navbar onMenuClick={mockOnMenuClick} onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText(
      "Search for anything"
    ) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: "Lendsqr" } });

    expect(searchInput.value).toBe("Lendsqr");
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith("Lendsqr");
    });
  });

  test("handles empty search input gracefully", async () => {
    render(<Navbar onMenuClick={mockOnMenuClick} onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText("Search for anything");
    fireEvent.change(searchInput, { target: { value: "" } });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith("");
    });
  });
});
