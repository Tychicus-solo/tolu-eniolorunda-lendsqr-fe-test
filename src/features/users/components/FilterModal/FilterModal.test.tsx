import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterModal from "./index";

describe("FilterModal Component", () => {
  const mockOnFilter = jest.fn();
  const mockOnReset = jest.fn();
  const organizations = ["Lendsqr", "Iridis", "Lenco"];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Positive Scenarios", () => {
    test("renders all form fields correctly", () => {
      render(
        <FilterModal
          onFilter={mockOnFilter}
          onReset={mockOnReset}
          organizations={organizations}
        />
      );

      expect(screen.getByLabelText(/Organization/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/User/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Phone Number/i)).toBeInTheDocument();
      expect(screen.getByText(/Reset/i)).toBeInTheDocument();
      expect(screen.getByText(/Filter/i)).toBeInTheDocument();
    });

    test("updates input values on change", () => {
      render(
        <FilterModal
          onFilter={mockOnFilter}
          onReset={mockOnReset}
          organizations={organizations}
        />
      );

      const usernameInput = screen.getByPlaceholderText(
        /User/i
      ) as HTMLInputElement;
      fireEvent.change(usernameInput, {
        target: { name: "username", value: "Adedeji" },
      });

      expect(usernameInput.value).toBe("Adedeji");
    });

    test("calls onFilter with correct values when form is submitted", () => {
      render(
        <FilterModal
          onFilter={mockOnFilter}
          onReset={mockOnReset}
          organizations={organizations}
        />
      );

      fireEvent.change(screen.getByPlaceholderText(/User/i), {
        target: { name: "username", value: "Tolu" },
      });
      fireEvent.change(screen.getByLabelText(/Status/i), {
        target: { name: "status", value: "Active" },
      });

      fireEvent.click(screen.getByText(/Filter/i));

      expect(mockOnFilter).toHaveBeenCalledWith(
        expect.objectContaining({
          username: "Tolu",
          status: "Active",
        })
      );
    });

    test("resets form and calls onReset when Reset button is clicked", () => {
      render(
        <FilterModal
          onFilter={mockOnFilter}
          onReset={mockOnReset}
          organizations={organizations}
        />
      );

      const usernameInput = screen.getByPlaceholderText(
        /User/i
      ) as HTMLInputElement;
      fireEvent.change(usernameInput, {
        target: { name: "username", value: "Tolu" },
      });

      fireEvent.click(screen.getByText(/Reset/i));

      expect(usernameInput.value).toBe("");
      expect(mockOnReset).toHaveBeenCalledTimes(1);
    });
  });

  describe("Negative Scenarios", () => {
    test("submits with empty values if user filters without typing anything", () => {
      render(
        <FilterModal
          onFilter={mockOnFilter}
          onReset={mockOnReset}
          organizations={organizations}
        />
      );

      fireEvent.click(screen.getByText(/Filter/i));

      expect(mockOnFilter).toHaveBeenCalledWith({
        organization: "",
        username: "",
        email: "",
        date: "",
        phoneNumber: "",
        status: "",
      });
    });

    test("does not crash if organizations list is empty", () => {
      render(
        <FilterModal
          onFilter={mockOnFilter}
          onReset={mockOnReset}
          organizations={[]}
        />
      );

      const select = screen.getByLabelText(/Organization/i);
      expect(select.querySelectorAll("option").length).toBe(1);
    });

    test("ignores invalid input types for email if browser validation is bypassed", () => {
      render(
        <FilterModal
          onFilter={mockOnFilter}
          onReset={mockOnReset}
          organizations={organizations}
        />
      );
      const emailInput = screen.getByPlaceholderText(/Email/i);
      expect(emailInput).toHaveAttribute("type", "email");
    });
  });
});
