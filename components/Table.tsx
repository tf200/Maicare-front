import React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/table-core";
import { flexRender, useReactTable } from "@tanstack/react-table";

const debugTable = process.env.NEXT_PUBLIC_DEBUG_TABLES === "true";

type Props<InstanceType> = {
  data: InstanceType[];
  columns: ColumnDef<InstanceType>[];
};

function Table<T>({ data, columns }: Props<T>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable,
  });
  return (
    <table className="datatable-table datatable-one border-collapse w-full break-words table-auto overflow-hidden px-4 md:overflow-auto md:table-fixed md:px-8">
      <thead className="px-4 border-separate">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr className="border-t border-stroke" key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className:
                          "flex items-center" +
                          (header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""),
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                      <div className="ml-auto">
                        {{
                          asc: "🔼",
                          desc: "🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id} className="border-t border-stroke">
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
