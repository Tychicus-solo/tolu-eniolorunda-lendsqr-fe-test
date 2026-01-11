


import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Sidebar from "./index";

jest.mock("../../constants/sidebar", () => ({
  sidebarLinks: [
    {
      title: "Switch Account",
      icon: "switch-icon.svg",
    },
    {
      title: "Dashboard",
      icon: "dashboard-icon.svg",
      path: "/dashboard",
    },
    {
      header: true,
      title: "Main",
    },
    {
      title: "Settings",
      icon: "settings-icon.svg",
      path: "/settings",
    },
    {
      title: "Help",
      icon: "help-icon.svg",
      // Path is intentionally missing to test fallback
    },
  ],
}));

jest.mock("../../assets/icons", () => ({
  ChevronOutline: "chevron.svg",
}));

const renderSidebar = (route = "/") =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Sidebar />
    </MemoryRouter>
  );

describe("Sidebar Component", () => {
  test("renders sidebar navigation", () => {
    renderSidebar();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("renders switch account item with chevron icon", () => {
    renderSidebar();
    expect(screen.getByText("Switch Account")).toBeInTheDocument();
    const switchItem = screen
      .getByText("Switch Account")
      .closest(".sidebar__item");
    expect(switchItem).toHaveClass("sidebar__item--switch");
    expect(switchItem?.querySelector(".sidebar__chevron")).toBeInTheDocument();
  });

  test("renders Dashboard link with correct href", () => {
    renderSidebar();
    const dashboardLink = screen.getByText("Dashboard").closest("a");
    expect(dashboardLink).toHaveAttribute("href", "/dashboard");
  });

  test("applies active class to active route", () => {
    renderSidebar("/dashboard");
    const dashboardLink = screen.getByText("Dashboard").closest("a");
    expect(dashboardLink).toHaveClass("sidebar__item--active");
  });

  test("uses fallback '#' when path is missing", () => {
    renderSidebar();
    const helpLink = screen.getByText("Help").closest("a");
    expect(helpLink).toHaveAttribute("href");
    const href = helpLink?.getAttribute("href");
    expect(href === "#" || href === "/").toBe(true);
  });

  test("renders all icons correctly", () => {
    const { container } = renderSidebar();
    const icons = container.querySelectorAll("img");
    expect(icons.length).toBeGreaterThanOrEqual(5);
  });

  test("maintains correct structure with sections", () => {
    renderSidebar();
    const sidebar = screen.getByRole("navigation");
    expect(sidebar.querySelector(".sidebar__section")).toBeInTheDocument();
    expect(sidebar.querySelector(".sidebar__menu")).toBeInTheDocument();
  });
});
