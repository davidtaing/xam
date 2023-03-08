import { useEffect } from "react";
import Router from "next/router";

import { useUserContext } from "@/modules/users";
import { ViewEmployeesTable } from "@/modules/employees/features/ViewEmployees";
import {
  AddEmployeeForm,
  AddEmployeeFormValues,
} from "@/modules/employees/features/AddEmployee";
import { useEmployeeState } from "@/modules/employees/common";

function Dashboard() {
  const { user, setUser } = useUserContext();
  const { employees, setEmployees } = useEmployeeState();

  useEffect(() => {
    if (!user) Router.push("/");
  }, [user]);

  return (
    <div aria-label="Dashboard" className="mx-auto max-w-3xl lg:max-w-7xl">
      <header className="item-center flex justify-between p-4">
        <h1 className="mx-0 my-auto inline-block align-middle text-lg">
          {user?.userName}
        </h1>
        <button
          type="button"
          className="text-sn rounded-md bg-blue-600 py-1 px-2 text-white hover:bg-blue-700 active:bg-blue-800"
          onClick={() => {
            setUser(undefined);
          }}
        >
          Logout
        </button>
      </header>
      <main className="grid w-full grid-cols-4 gap-8 md:grid-cols-8 lg:grid-cols-12">
        <AddEmployeeForm
          onsubmit={(data: AddEmployeeFormValues): void => {
            setEmployees([
              ...employees,
              { ...data, number: employees[employees.length].number + 1 },
            ]);
          }}
        />
        <ViewEmployeesTable employees={employees} setEmployees={setEmployees} />
      </main>
    </div>
  );
}

export default Dashboard;
