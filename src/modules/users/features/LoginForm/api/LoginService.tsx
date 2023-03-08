import { users } from "design samples/data/users_data";
import { LoginFormValues } from "../components/LoginForm";

export async function loginMutation(data: LoginFormValues) {
  let userResult = null;

  for (const user of users) {
    const branchIdMatch = data.branchId === user.branchId.toString();
    const userNameMatch = data.userName === user.userName;
    const passwordMatch = data.password === user.password;

    if (branchIdMatch && userNameMatch && passwordMatch) {
      const { password, ...restUser } = user;
      userResult = restUser;
      break;
    }
  }

  if (!userResult)
    throw new Error("Either the Branch id, username or password is incorrect.");

  return userResult;
}
