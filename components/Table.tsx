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
                      <div className="ml-auto w-6 absolute right-0 top-0">
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
