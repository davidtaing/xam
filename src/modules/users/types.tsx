import { Employee } from "../employees/common/types";

type UserWithPassword = Employee;

export type User = Omit<UserWithPassword, "password">;
