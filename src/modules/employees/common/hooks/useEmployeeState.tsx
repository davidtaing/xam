import { useState } from "react";

import { Employee } from "../types";
import { users } from "../data";

export function useEmployeeState() {
  const [employees, setEmployees] = useState<Employee[]>(users);

  return { employees, setEmployees };
}
