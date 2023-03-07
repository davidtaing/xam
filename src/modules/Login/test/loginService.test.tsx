import { loginService } from "../LoginForm";

it("returns user when login is successful", async () => {
  const input = {
    branchId: "10001",
    userName: "testuser01",
    password: "pa55w0rd001",
  };

  const expected = {
    branchId: 10001,
    userName: "testuser01",
    firstName: "John",
    middleName: "Sanchez",
    lastName: "Doe",
    position: "Developer",
  };

  const result = await loginService(input);

  expect(result).toEqual(expected);
});
