import React, { Fragment, useMemo, useState } from "react";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  Row,
} from "@tanstack/table-core";
import { flexRender, useReactTable } from "@tanstack/react-table";
import ChevronDown from "@/components/icons/ChevronDown";
import clsx from "clsx";

const debugTable = process.env.NODE_ENV === "development";

export type TableProps<InstanceType> = {
  data: InstanceType[];
  columns: ColumnDef<InstanceType>[];
  onRowClick?: (instance: InstanceType) => void;
  className?: string;
  renderRowDetails?: (row: Row<InstanceType>) => React.ReactNode;
};

function Table<T>({
  data,
  columns: columnDefs,
  onRowClick,
  className,
  renderRowDetails,
}: TableProps<T>) {
  const [showRowDetails, setShowRowDetails] = useState<Row<T>>();

  const columns = useMemo<ColumnDef<T>[]>(() => {
    if (!renderRowDetails) {
      return columnDefs;
    }
    const columnHelper = createColumnHelper<T>();
    return [
      ...columnDefs,
      columnHelper.display({
        id: "expand",
        cell: ({ row }) => {
          return (
            <div className="flex justify-end w-full">
              <ChevronDown
                width={36}
                height={36}
                className={clsx({
                  "rotate-[-90deg]": row.getIsExpanded(),
                })}
              />
            </div>
          );
        },
      }),
    ];
  }, [columnDefs, renderRowDetails]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable,
    manualPagination: true,
    getRowCanExpand: () => !!renderRowDetails,
    getIsRowExpanded: (row) => row.id === showRowDetails?.id,
  });
  return (
    <table
      className={clsx(
        "w-full px-4 overflow-hidden break-words border-collapse table-auto datatable-table datatable-one md:overflow-auto md:table-fixed md:px-8 yyyyyyy",
        className
      )}
    >
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
            <Fragment key={row.id}>
              <tr
                onClick={() => {
                  onRowClick?.(row.original);
                  setShowRowDetails((r) => {
                    if (!row.getCanExpand()) {
                      return r;
                    }
                    if (r?.id === row.id) {
                      return undefined;
                    }
                    return row;
                  });
                }}
                className="px-4 py-6 border-t cursor-pointer border-stroke hover:bg-gray-3 rounded-2xl"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
              {row.getCanExpand() && row.getIsExpanded() && (
                <tr>
                  <td
                    colSpan={row.getVisibleCells().length}
                    className="bg-gray-3 border-t-2 border-stroke"
                  >
                    {renderRowDetails?.(row)}
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
