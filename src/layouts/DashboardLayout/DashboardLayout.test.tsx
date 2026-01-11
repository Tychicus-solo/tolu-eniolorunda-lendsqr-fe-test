import { render, screen, fireEvent } from "@testing-library/react";
import {
  MemoryRouter,
  Routes,
  Route,
  useOutletContext,
} from "react-router-dom";
import "@testing-library/jest-dom";
import DashboardLayout from "./index";

const MockChild = () => {
  const { searchTerm } = useOutletContext<{ searchTerm: string }>();
  return <div data-testid="child-content">Search: {searchTerm}</div>;
};

jest.mock("../../components/Sidebar", () => () => (
  <div data-testid="sidebar">Sidebar</div>
));
jest.mock("../../components/Navbar", () => ({ onSearch, onMenuClick }: any) => (
  <nav>
    <button onClick={onMenuClick}>Toggle</button>
    <input placeholder="Search" onChange={(e) => onSearch(e.target.value)} />
  </nav>
));

describe("DashboardLayout Component", () => {
  const renderLayout = () => {
    return render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<MockChild />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  test("renders navbar, sidebar, and child content", () => {
    renderLayout();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });

  test("toggles sidebar visibility class when menu button is clicked", () => {
    const { container } = renderLayout();
    const sidebarWrapper = container.querySelector(
      ".dashboard-layout__sidebar-wrapper"
    );
    const toggleBtn = screen.getByText("Toggle");

    expect(sidebarWrapper).not.toHaveClass("is-open");
    fireEvent.click(toggleBtn);
    expect(sidebarWrapper).toHaveClass("is-open");

    const overlay = container.querySelector(".sidebar-overlay");
    if (overlay) fireEvent.click(overlay);
    expect(sidebarWrapper).not.toHaveClass("is-open");
  });

  test("passes search term from Navbar to Outlet via context", () => {
    renderLayout();
    const searchInput = screen.getByPlaceholderText("Search");

    fireEvent.change(searchInput, { target: { value: "Lendsqr" } });
    expect(screen.getByTestId("child-content")).toHaveTextContent(
      "Search: Lendsqr"
    );
  });
});
