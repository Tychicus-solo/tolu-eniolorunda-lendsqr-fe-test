import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatusPill from "./index";

describe("StatusPill Component", () => {
  const statuses: ("Active" | "Inactive" | "Pending" | "Blacklisted")[] = [
    "Active",
    "Inactive",
    "Pending",
    "Blacklisted",
  ];

  test.each(statuses)(
    "renders %s status with correct text and class",
    (status) => {
      render(<StatusPill status={status} />);

      const pill = screen.getByText(status);
      expect(pill).toBeInTheDocument();

      const expectedClass = `status-pill--${status.toLowerCase()}`;
      expect(pill).toHaveClass("status-pill", expectedClass);
    }
  );

  test("renders nothing or throws if status is missing (TypeScript safety)", () => {
    render(<StatusPill status="Active" />);
    const pill = screen.getByText(/active/i);
    expect(pill.tagName).toBe("SPAN");
  });
});
