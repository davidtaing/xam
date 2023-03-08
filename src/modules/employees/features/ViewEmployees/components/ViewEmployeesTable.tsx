import { useState, useMemo } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { users } from "design samples/data/users_data";

const formatRawData = users.map(
  ({ branchId, userName, firstName, middleName, lastName, position }, idx) => ({
    number: idx + 1,
    branchId,
    userName,
    name: `${firstName} ` + `${middleName} ` + `${lastName}`,
    position,
  })
);

export type Employee = (typeof formatRawData)[number];

export function ViewEmployeesTable() {
  const [employees, setEmployees] = useState<Array<Employee>>(formatRawData);

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
