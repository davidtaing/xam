import { useEffect, useMemo, useState } from "react";
import Router from "next/router";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useUserContext } from "@/modules/Auth/Users";

import { users } from "design samples/data/users_data";
import React from "react";

const defaultData = users.map(
  ({ branchId, userName, firstName, middleName, lastName, position }, idx) => ({
    number: idx + 1,
    branchId,
    userName,
    name: `${firstName} ` + `${middleName} ` + `${lastName}`,
    position,
  })
);

type Employee = (typeof defaultData)[number];

function EmployeeTable() {
  const [employees, setEmployees] = useState<Array<Employee>>(defaultData);

  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: "#",
        accessorFn: (row) => row.number,
      },
      {
        accessorKey: "Branch Id",
        accessorFn: (row) => row.branchId,
      },
      {
        accessorKey: "Username",
        accessorFn: (row) => row.userName,
      },
      {
        accessorKey: "Name",
        accessorFn: (row) => row.name,
      },
      {
        accessorKey: "Position",
        accessorFn: (row) => row.position,
      },
      {
        accessorKey: "Action",
        cell: ({ row }) => (
          <button
            className="rounded border bg-slate-300 px-2 py-1 uppercase hover:bg-slate-400"
            onClick={() => {
              const filteredEmployees = employees
                .map((employee) => employee)
                .filter(
                  (employee) => employee.userName !== row.original.userName
                );

              setEmployees(filteredEmployees);
            }}
          >
            remove
          </button>
        ),
      },
    ],
    [employees]
  );

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

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
        <EmployeeTable />
      </main>
    </div>
  );
}

export default Dashboard;
