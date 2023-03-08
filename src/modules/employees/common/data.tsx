import { users as rawUsers } from "design samples/data/users_data";

// calculate number here because state updates would trigger
// infinite loops
export const users = rawUsers.map((user, index) => ({
  ...user,
  number: index + 1,
}));
