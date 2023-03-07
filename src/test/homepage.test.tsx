import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "@/pages";

import { useRouter } from "next/router";
import mockRouter from "next-router-mock";
jest.mock("next/router", () => require("next-router-mock"));

function setupRender() {
  const renderResult = render(<Home />);
  const user = userEvent.setup();

  return { user, renderResult };
}

it("renders the login panel", () => {
  setupRender();
  const loginPanel = screen.getByLabelText(/^login panel$/i);

  expect(loginPanel).toBeTruthy();
});
