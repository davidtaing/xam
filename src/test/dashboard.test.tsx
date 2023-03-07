import { render, screen } from "@testing-library/react";
import Dashboard from "@/pages/dashboard";

test("smoke test if it renders", () => {
  render(<Dashboard />);
  const dashboard = screen.getByLabelText(/^dashboard$/i);

  expect(dashboard).toBeTruthy();
});
