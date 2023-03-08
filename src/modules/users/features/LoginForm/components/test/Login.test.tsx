import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UserContextProvider } from "@/modules/users";
import { LoginForm, LoginFormValues } from "../LoginForm";

import { useRouter } from "next/router";
import mockRouter from "next-router-mock";
jest.mock("next/router", () => require("next-router-mock"));

function setupRender() {
  const renderResult = render(
    <UserContextProvider>
      <LoginForm />
    </UserContextProvider>
  );
  const user = userEvent.setup();

  return { user, renderResult };
}

async function setupRenderAndLogin({
  branchId,
  userName,
  password,
}: LoginFormValues) {
  const { user, renderResult } = setupRender();

  const branchIdLabel = screen.getByLabelText(/^branch id$/i);
  await user.click(branchIdLabel);
  await user.keyboard(branchId);

  const usernameLabel = screen.getByLabelText(/^username$/i);
  await user.click(usernameLabel);
  await user.keyboard(userName);

  const passwordLabel = screen.getByLabelText(/^password$/i);
  await user.click(passwordLabel);
  await user.keyboard(password);

  const submitButton = screen.getByRole("button", { name: /login/i });

  return {
    user,
    renderResult,
    branchIdLabel,
    usernameLabel,
    passwordLabel,
    submitButton,
  };
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
  const input = {
    branchId: "00000",
    userName: "invalid username",
    password: "invalid password",
  };

  const { user, submitButton } = await setupRenderAndLogin(input);

  await user.click(submitButton);

  const errorMessage = screen.getByText(
    /either the branch id, username or password is incorrect./i
  );

  expect(errorMessage).toBeTruthy();
});

test("redirects user when login is successful", async () => {
  const { result } = renderHook(() => {
    return useRouter();
  });

  const input = {
    branchId: "10001",
    userName: "testuser01",
    password: "pa55w0rd001",
  };

  const { user, submitButton } = await setupRenderAndLogin(input);

  await user.click(submitButton);

  expect(result.current).toMatchObject({ asPath: "/dashboard" });
});
