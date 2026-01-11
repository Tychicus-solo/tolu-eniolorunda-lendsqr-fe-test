import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import UserDetails from "./index";
import * as userService from "../../features/users/services/userService";

jest.mock("../../features/users/services/userService", () => ({
  getUserById: jest.fn(),
}));

const mockUser = {
  id: "user-123456789",
  phoneNumber: "08012345678",
  email: "test@user.com",
  personalInfo: {
    fullName: "John Doe",
    bvn: "1234567890",
    gender: "Male",
    maritalStatus: "Single",
    children: "None",
    typeOfResidence: "Apartment",
  },
  education: {
    level: "B.Sc",
    employmentStatus: "Employed",
    sector: "Fintech",
    duration: "2 Years",
    officeEmail: "john@office.com",
    monthlyIncome: ["₦200,000", "₦400,000"],
    loanRepayment: "₦20,000",
  },
  socials: { twitter: "@john", facebook: "John Doe", instagram: "@john" },
  guarantor: {
    fullName: "Jane Doe",
    phoneNumber: "09012345678",
    email: "jane@test.com",
    relationship: "Sister",
  },
};

describe("UserDetails Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (userService.getUserById as jest.Mock).mockReturnValue(mockUser);
  });

  const renderUserDetails = (id = "user-123456789") =>
    render(
      <MemoryRouter initialEntries={[`/users/${id}`]}>
        <Routes>
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

  test("renders user information correctly", () => {
    renderUserDetails();

    expect(screen.getByText("user-123")).toBeInTheDocument();
    expect(screen.getByText("BVN")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
  });

  test("switches tabs and shows empty state for non-general tabs", () => {
    renderUserDetails();

    const documentsTab = screen.getByRole("button", { name: /Documents/i });
    fireEvent.click(documentsTab);

    expect(screen.getByText(/No Documents Found/i)).toBeInTheDocument();
    expect(screen.queryByText("Personal Information")).not.toBeInTheDocument();
  });

  test("navigates back when back button is clicked", () => {
    renderUserDetails();
    const backBtn = screen.getByText(/Back to Users/i);
    expect(backBtn).toBeInTheDocument();
  });

  test("renders monthly income range correctly", () => {
    renderUserDetails();
    expect(screen.getByText("₦200,000 - ₦400,000")).toBeInTheDocument();
  });
});
