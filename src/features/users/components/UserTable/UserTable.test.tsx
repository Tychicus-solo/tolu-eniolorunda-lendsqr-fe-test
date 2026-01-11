import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import UserTable from "./index";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("UserTable Component", () => {
  const mockUsers = [
    {
      id: "1",
      organization: "Lendsqr",
      personalInfo: { fullName: "Adedeji" },
      email: "adedeji@test.com",
      phoneNumber: "08012345678",
      dateJoined: "May 15, 2020 10:00 AM",
      status: "Active",
    },
  ];

  const mockOrganizations = ["Lendsqr", "Iridis"];
  const mockOnApplyFilter = jest.fn();

  const renderComponent = (users = mockUsers) => {
    return render(
      <MemoryRouter>
        <UserTable
          users={users}
          organizations={mockOrganizations}
          onApplyFilter={mockOnApplyFilter}
        />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Positive Scenarios", () => {
    test("renders table headers correctly", () => {
      renderComponent();
      expect(screen.getByText("ORGANIZATION")).toBeInTheDocument();
      expect(screen.getByText("USERNAME")).toBeInTheDocument();
      expect(screen.getByText("EMAIL")).toBeInTheDocument();
    });

    test("renders user data correctly", () => {
      renderComponent();
      expect(screen.getByText("Lendsqr")).toBeInTheDocument();
      expect(screen.getByText("Adedeji")).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    test("opens the action dropdown menu when ellipsis is clicked", () => {
      renderComponent();

      const moreBtn = screen.getByAltText("more");
      fireEvent.click(moreBtn);

      expect(screen.getByText(/View Details/i)).toBeInTheDocument();
      expect(screen.getByText(/Blacklist User/i)).toBeInTheDocument();
      expect(screen.getByText(/Activate User/i)).toBeInTheDocument();
    });

    test("navigates to user details when View Details is clicked", () => {
      renderComponent();

      fireEvent.click(screen.getByAltText("more"));
      fireEvent.click(screen.getByText(/View Details/i));

      expect(mockedUsedNavigate).toHaveBeenCalledWith("/users/1");
    });

    test("shows FilterModal when filter icon is clicked", () => {
      renderComponent();

      const filterIcons = screen.getAllByAltText("filter");
      fireEvent.click(filterIcons[0]);

      expect(screen.getByText(/Reset/i)).toBeInTheDocument();
    });
  });

  describe("Negative Scenarios", () => {
    test("renders 'No users found' message when users list is empty", () => {
      renderComponent([]);
      expect(
        screen.getByText(/No users found matching your criteria/i)
      ).toBeInTheDocument();
    });

    test("closes the dropdown menu when clicking the ellipsis again", () => {
      renderComponent();

      const moreBtn = screen.getByAltText("more");

      fireEvent.click(moreBtn);
      expect(screen.queryByText(/View Details/i)).toBeInTheDocument();
      fireEvent.click(moreBtn);
      expect(screen.queryByText(/View Details/i)).not.toBeInTheDocument();
    });
  });
});
