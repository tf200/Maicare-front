import React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/table-core";
import { flexRender, useReactTable } from "@tanstack/react-table";
import ChevronDown from "@/components/icons/ChevronDown";

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
    manualPagination: true,
  });
  return (
    <table className="w-full px-4 overflow-hidden break-words border-collapse table-auto datatable-table datatable-one md:overflow-auto md:table-fixed md:px-8">
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
                          "flex items-center relative " +
                          (header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""),
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      <div className="w-full">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                      <div className="absolute top-0 right-0 w-6 ml-auto">
                        {{
                          asc: (
                            <div className="rotate-180 z-1">
                              <ChevronDown />
                            </div>
                          ),
                          desc: (
                            <div>
                              <ChevronDown />
                            </div>
                          ),
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
