import { render, screen } from "@testing-library/react";

import Home from "@/pages";

it("renders the login panel", () => {
  render(<Home />);

  const loginPanel = screen.getByLabelText(/^login panel$/i);

  expect(loginPanel).toBeTruthy();
});

it("renders Branch Id label", () => {
  render(<Home />);

  const branchIdLabel = screen.getByLabelText(/^branch id$/i);

  expect(branchIdLabel).toBeTruthy();
});

it("renders Email label", () => {
  render(<Home />);

  const emailLabel = screen.getByLabelText(/^email$/i);

  expect(emailLabel).toBeTruthy();
});

it("renders Password label", () => {
  render(<Home />);

  const passwordLabel = screen.getByLabelText(/^password$/i);

  expect(passwordLabel).toBeTruthy();
});

  expect(branchIdLabel).toBeTruthy();
});
