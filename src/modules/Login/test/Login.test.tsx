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

test("displays error when the branch id is not provided", async () => {
  const { user } = setupRender();

  const branchIdLabel = screen.getByLabelText(/^branch id$/i);
  const usernameLabel = screen.getByLabelText(/^username$/i);

  await user.click(branchIdLabel);
  await user.click(usernameLabel);

  const errorMessage = screen.getByText(/^please provide a branch id$/i);

  expect(errorMessage).toBeTruthy();
});

test("displays error when the branch id is invalid: non numeric digits provided", async () => {
  const { user } = setupRender();

  const branchIdLabel = screen.getByLabelText(/^branch id$/i);
  const usernameLabel = screen.getByLabelText(/^username$/i);

  await user.click(branchIdLabel);
  await user.keyboard("invalid branch id");

  await user.click(usernameLabel);

  const errorMessage = screen.getByText(
    /^please ensure the Branch id is a numeric digit value/i
  );

  expect(errorMessage).toBeTruthy();
});

test("displays error when username is not provided", async () => {
  const { user } = setupRender();

  const usernameLabel = screen.getByLabelText(/^username$/i);
  const passwordLabel = screen.getByLabelText(/^password$/i);

  await user.click(usernameLabel);
  await user.click(passwordLabel);

  const errorMessage = screen.getByText(/^please provide a username$/i);

  expect(errorMessage).toBeTruthy();
});

test("display error when password is not provided", async () => {
  const { user } = setupRender();

  const passwordLabel = screen.getByLabelText(/^password$/i);
  const usernameLabel = screen.getByLabelText(/^username$/i);

  await user.click(passwordLabel);
  await user.click(usernameLabel);

  const errorMessage = screen.getByText(/^please provide a password$/i);

  expect(errorMessage).toBeTruthy();
});

test("displays error upon submission error", async () => {
  const { user } = setupRender();

  const branchIdLabel = screen.getByLabelText(/^branch id$/i);
  await user.click(branchIdLabel);
  await user.keyboard("00000");

  const usernameLabel = screen.getByLabelText(/^username$/i);
  await user.click(usernameLabel);
  await user.keyboard("invalid username");

  const passwordLabel = screen.getByLabelText(/^password$/i);
  await user.click(passwordLabel);
  await user.keyboard("invalid password");

  const submitButton = screen.getByRole("button", { name: /login/i });
  await user.click(submitButton);

  const errorMessage = screen.getByText(
    /either the branch id, username or password is incorrect./i
  );

  expect(errorMessage).toBeTruthy();
});
