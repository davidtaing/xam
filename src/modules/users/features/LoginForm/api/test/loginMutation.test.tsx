import { loginMutation } from "../LoginService";

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

  const result = await loginMutation(input);

  expect(result).toEqual(expected);
});

it.each([
  {
    case: "when branch id is not found",
    input: {
      branchId: "invalidBranchId",
      userName: "testuser01",
      password: "pa55w0rd001",
    },
  },
  {
    case: "when username is not found",
    input: {
      branchId: "10001",
      userName: "incorrectUserName",
      password: "pa55w0rd001",
    },
  },
  {
    case: "when invalid password is provided",
    input: {
      branchId: "10001",
      userName: "testuser01",
      password: "incorrectPassword",
    },
  },
])(
  "throws 'Either the Branch id, Username or Password is incorrect.' error $case",
  async ({ input }) => {
    await expect(async () => await loginMutation(input)).rejects.toThrow(
      /^Either the Branch id, username or password is incorrect.$/
    );
  }
);
