import { PropsWithChildren, createContext, useContext, useState } from "react";
import { User } from "../..";

export type UserContextValues = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};

export const UserContext = createContext<UserContextValues | undefined>(
  undefined
);

export function UserContextProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("UserContextProvider must be used within UserContext");

  return context;
}
