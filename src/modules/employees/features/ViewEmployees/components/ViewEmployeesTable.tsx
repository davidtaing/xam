import { useMemo } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Employee } from "@/modules/employees/common/types";

type ViewEmployeesTableColumns = ColumnDef<Employee & { number: number }>[];

export type ViewEmployeesTableProps = {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
};

export function ViewEmployeesTable({
  employees,
  setEmployees,
}: ViewEmployeesTableProps) {
  const columns = useMemo<ViewEmployeesTableColumns>(
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
        accessorFn: (row) =>
          `${row.firstName} ` + `${row.middleName} ` + `${row.lastName}`,
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
    [employees, setEmployees]
  );

  const table = useReactTable({
    data: employees.map((employee, idx) => ({ ...employee, number: idx + 1 })),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="col-span-4 overflow-x-scroll p-8 md:col-span-5 lg:col-span-8 ">
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
    </div>
  );
}
