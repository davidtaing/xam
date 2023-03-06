import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LoginForm } from "../LoginForm";

function setupRender() {
  const renderResult = render(<LoginForm />);
  const user = userEvent.setup();

  return { user, renderResult };
}

test("smoke test if it renders", () => {
  setupRender();
  const loginPanel = screen.getByLabelText(/^login panel$/i);

  expect(loginPanel).toBeTruthy();
});

it("renders Branch Id label", () => {
  setupRender();

  const branchIdLabel = screen.getByLabelText(/^branch id$/i);

  expect(branchIdLabel).toBeTruthy();
});

it("renders Username label", () => {
  setupRender();

  const usernameLabel = screen.getByLabelText(/^username$/i);

  expect(usernameLabel).toBeTruthy();
});

it("renders Password label", () => {
  setupRender();

  const passwordLabel = screen.getByLabelText(/^password$/i);

  expect(passwordLabel).toBeTruthy();
});

test("branch-id label is associated with branch-id input", async () => {
  const { user } = setupRender();

  const branchIdLabel = screen.getByLabelText(/^branch id$/i);

  await user.click(branchIdLabel);
  await user.keyboard("hello branch id");

  const result = screen.getByDisplayValue(/^hello branch id$/i);

  expect(result).toBeTruthy();
});

test("email label is associated with email input", async () => {
  const { user } = setupRender();

  const usernameLabel = screen.getByLabelText(/^username$/i);

  await user.click(usernameLabel);
  await user.keyboard("hello username");

  const result = screen.getByDisplayValue(/^hello username$/i);

  expect(result).toBeTruthy();
});

test("password label is associated with password input", async () => {
  const { user } = setupRender();

  const passwordLabel = screen.getByLabelText(/^password$/i);

  await user.click(passwordLabel);
  await user.keyboard("hello password");

  const result = screen.getByDisplayValue(/^hello password$/i);

  expect(result).toBeTruthy();
});
