import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom";
import AuthLayout from "./index";

describe("AuthLayout Component", () => {
  test("renders the layout with logos and illustration", () => {
    render(
      <MemoryRouter>
        <AuthLayout />
      </MemoryRouter>
    );

    const logos = screen.getAllByAltText(/Lendsqr Logo/i);
    expect(logos.length).toBeGreaterThanOrEqual(1);

    expect(screen.getByAltText(/Login Illustration/i)).toBeInTheDocument();
  });

  test("renders child routes via Outlet", () => {
    const MockChild = () => <div>Mock Login Form</div>;

    render(
      <MemoryRouter initialEntries={["/auth"]}>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<MockChild />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Login Form")).toBeInTheDocument();
  });
});
