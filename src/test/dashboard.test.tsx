import { render, renderHook, screen } from "@testing-library/react";

import { UserContextProvider } from "@/modules/Auth/Users";
import Dashboard from "@/pages/dashboard";

import { useRouter } from "next/router";
import mockRouter from "next-router-mock";
jest.mock("next/router", () => require("next-router-mock"));

test("smoke test if it renders", () => {
  render(
    <UserContextProvider>
      <Dashboard />
    </UserContextProvider>
  );
  const dashboard = screen.getByLabelText(/^dashboard$/i);

  expect(dashboard).toBeTruthy();
});

it("redirects the user to home if they are not logged in", () => {
  const { result } = renderHook(() => useRouter());

  render(
    <UserContextProvider>
      <Dashboard />
    </UserContextProvider>
  );

  expect(result.current).toMatchObject({ asPath: "/" });
});
