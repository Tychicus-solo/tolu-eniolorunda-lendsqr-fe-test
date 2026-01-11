import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "@testing-library/jest-dom";
import Login from "./index";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const renderLogin = () =>
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

  describe("Form Interaction", () => {
    test("renders login fields correctly", () => {
      renderLogin();
      expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /LOG IN/i })
      ).toBeInTheDocument();
    });

    test("toggles password visibility", () => {
      renderLogin();
      const passwordInput = screen.getByPlaceholderText(/Password/i);
      const toggleBtn = screen.getByText(/SHOW/i);

      expect(passwordInput).toHaveAttribute("type", "password");

      fireEvent.click(toggleBtn);
      expect(passwordInput).toHaveAttribute("type", "text");
      expect(screen.getByText(/HIDE/i)).toBeInTheDocument();
    });
  });

  describe("Validation Scenarios", () => {
    test("shows error if fields are empty", () => {
      renderLogin();
      fireEvent.click(screen.getByRole("button", { name: /LOG IN/i }));
      expect(toast.error).toHaveBeenCalledWith("Please fill in all fields");
    });

   test("shows error for invalid email format", () => {
     renderLogin();
     fireEvent.change(screen.getByPlaceholderText(/Email/i), {
       target: { value: "not-an-email@", name: "email" },
     });
     fireEvent.change(screen.getByPlaceholderText(/Password/i), {
       target: { value: "password123", name: "password" },
     });

     const loginBtn = screen.getByRole("button", { name: /LOG IN/i });
     fireEvent.click(loginBtn);

     expect(toast.error).toHaveBeenCalledWith(
       "Please enter a valid email address"
     );
   });

    test("shows error for short password", () => {
      renderLogin();
      fireEvent.change(screen.getByPlaceholderText(/Email/i), {
        target: { name: "email", value: "test@lendsqr.com" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Password/i), {
        target: { name: "password", value: "123" },
      });

      fireEvent.click(screen.getByRole("button", { name: /LOG IN/i }));
      expect(toast.error).toHaveBeenCalledWith(
        "Password must be at least 6 characters long"
      );
    });
  });

  describe("Successful Login", () => {
    test("logs in successfully and navigates to users page", async () => {
      renderLogin();

      fireEvent.change(screen.getByPlaceholderText(/Email/i), {
        target: { name: "email", value: "test@lendsqr.com" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Password/i), {
        target: { name: "password", value: "password123" },
      });

      fireEvent.click(screen.getByRole("button", { name: /LOG IN/i }));
      await waitFor(
        () => {
          expect(localStorage.getItem("user_token")).toBe("mock_token_123");
          expect(toast.success).toHaveBeenCalledWith("Login successful!");
          expect(mockedUsedNavigate).toHaveBeenCalledWith("/users");
        },
        { timeout: 3000 }
      );
    });
  });
});
