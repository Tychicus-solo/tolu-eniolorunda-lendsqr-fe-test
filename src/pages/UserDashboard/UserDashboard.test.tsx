import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter, useOutletContext } from "react-router-dom";
import "@testing-library/jest-dom";
import UserDashboard from "./index";
import * as userService from "../../features/users/services/userService";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: jest.fn(),
}));

jest.mock("../../features/users/services/userService", () => ({
  getUsers: jest.fn(),
}));

describe("UserDashboard Component", () => {
  const mockUsers = [
    {
      id: "1",
      organization: "Lendsqr",
      username: "adedeji",
      // Add this nested object to match your UserTable logic
      personalInfo: {
        fullName: "Adedeji",
      },
      email: "ade@test.com",
      phoneNumber: "123",
      status: "Active",
      dateJoined: "May 15, 2020",
    },
    {
      id: "2",
      organization: "Iridis",
      username: "labi",
      personalInfo: {
        fullName: "Labi",
      },
      email: "labi@test.com",
      phoneNumber: "456",
      status: "Inactive",
      dateJoined: "May 15, 2020",
    },
    {
      id: "3",
      organization: "Lendsqr",
      username: "tunde",
      personalInfo: {
        fullName: "Tunde",
      },
      email: "tunde@test.com",
      phoneNumber: "789",
      status: "Pending",
      dateJoined: "May 15, 2020",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (userService.getUsers as jest.Mock).mockReturnValue(mockUsers);
    (useOutletContext as jest.Mock).mockReturnValue({ searchTerm: "" });
  });

  const renderDashboard = () =>
    render(
      <MemoryRouter>
        <UserDashboard />
      </MemoryRouter>
    );

  test("renders stats, table, and pagination", () => {
    renderDashboard();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText(/out of 3/i)).toBeInTheDocument();
  });

  test("resets pagination to page 1 when filters change", () => {
    const { rerender } = renderDashboard();

    (useOutletContext as jest.Mock).mockReturnValue({ searchTerm: "tunde" });
    rerender(
      <MemoryRouter>
        <UserDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText("1")).toHaveClass("active");
  });

  test("calculates organizations correctly for the filter dropdown", () => {
    renderDashboard();

    const filterIcon = screen.getAllByAltText("filter")[0];
    fireEvent.click(filterIcon);
    const orgSelect = screen.getByRole("combobox", { name: /organization/i });
    expect(within(orgSelect).getByText("Lendsqr")).toBeInTheDocument();
    expect(within(orgSelect).getByText("Iridis")).toBeInTheDocument();
  });
});
