import { render, screen } from "@testing-library/react";

import Home from "@/pages";

test("renders the login panel", () => {
  render(<Home />);

  const loginPanel = screen.getByLabelText(/^login panel$/i);

  expect(loginPanel).toBeTruthy();
});

test("renders Branch Id label", () => {
  render(<Home />);

  const branchIdLabel = screen.getByLabelText(/^branch id$/i);

  expect(branchIdLabel).toBeTruthy();
});

test("renders Email label", () => {
  render(<Home />);

  const branchIdLabel = screen.getByLabelText(/^email$/i);

  expect(branchIdLabel).toBeTruthy();
});

test("renders Password label", () => {
  render(<Home />);

  const branchIdLabel = screen.getByLabelText(/^password$/i);

  expect(branchIdLabel).toBeTruthy();
});
