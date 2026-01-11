import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "./index";

describe("Pagination Component", () => {
  const mockOnPageChange = jest.fn();
  const mockOnPageSizeChange = jest.fn();
  const defaultProps = {
    totalCount: 100,
    pageSize: 10,
    currentPage: 1,
    onPageChange: mockOnPageChange,
    onPageSizeChange: mockOnPageSizeChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- POSITIVE SCENARIOS ---
  describe("Positive Scenarios", () => {
    test("renders correctly with total count and page size", () => {
      render(<Pagination {...defaultProps} />);

      expect(screen.getByText(/Showing/i)).toBeInTheDocument();
      expect(screen.getByText(/out of 100/i)).toBeInTheDocument();
      // Check if the current page (1) is active
      expect(screen.getByText("1")).toHaveClass("active");
    });

    test("calls onPageChange when a page number is clicked", () => {
      render(<Pagination {...defaultProps} />);

      const pageTwo = screen.getByText("2");
      fireEvent.click(pageTwo);

      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    test("calls onPageSizeChange when the select value changes", () => {
      render(<Pagination {...defaultProps} />);

      const select = screen.getByRole("combobox");
      fireEvent.change(select, { target: { value: "50" } });

      expect(mockOnPageSizeChange).toHaveBeenCalledWith(50);
    });

    test("displays ellipsis correctly for middle pages", () => {
      // Total pages = 10 (100/10), Current page = 5
      render(<Pagination {...defaultProps} currentPage={5} />);

      const dots = screen.getAllByText("...");
      expect(dots.length).toBeGreaterThan(0);
      expect(screen.getByText("5")).toHaveClass("active");
    });
  });

  // --- NEGATIVE SCENARIOS ---
  describe("Negative Scenarios", () => {
    test("disables the 'prev' button on the first page", () => {
      render(<Pagination {...defaultProps} currentPage={1} />);

      const prevBtn = screen.getByAltText("prev").closest("button");
      expect(prevBtn).toBeDisabled();
    });

    test("disables the 'next' button on the last page", () => {
      // 100 items / 10 per page = 10 pages total
      render(<Pagination {...defaultProps} currentPage={10} />);

      const nextBtn = screen.getByAltText("next").closest("button");
      expect(nextBtn).toBeDisabled();
    });

    test("prevents page change when clicking ellipsis", () => {
      render(<Pagination {...defaultProps} totalCount={200} currentPage={1} />);

      const dots = screen.getByText("...");
      fireEvent.click(dots);

      expect(mockOnPageChange).not.toHaveBeenCalled();
    });

    test("handles zero totalCount gracefully", () => {
      render(<Pagination {...defaultProps} totalCount={0} />);

      // Should default totalPages to 1 as per logic
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText(/out of 0/i)).toBeInTheDocument();
    });
  });
});
