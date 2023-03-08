import { users } from "../../../../design samples/data/users_data";

type UserWithPassword = (typeof users)[number];

export type User = Omit<UserWithPassword, "password">;
