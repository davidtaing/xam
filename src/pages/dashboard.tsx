import { useEffect } from "react";
import Router from "next/router";

import { useUserContext } from "@/modules/users";
import { ViewEmployeesTable } from "@/modules/employees/features/ViewEmployees";

function Dashboard() {
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) Router.push("/");
  }, [user]);

  return (
    <div aria-label="Dashboard">
      <header className="item-center flex justify-between p-4">
        <h1 className="mx-0 my-auto inline-block align-middle text-lg">
          {user?.userName}
        </h1>
        <button
          type="button"
          className="text-sn rounded-md bg-blue-600 py-1 px-2 text-white hover:bg-blue-700 active:bg-blue-800"
        >
          Logout
        </button>
      </header>
      <main className="p-4">
        <ViewEmployeesTable />
      </main>
    </div>
  );
}

export default Dashboard;
