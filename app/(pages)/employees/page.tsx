"use client";

import React, { FunctionComponent, useMemo, useState } from "react";
import Link from "next/link";
import Panel from "@/components/Panel";
import { useEmployeesList } from "@/utils/employees/getEmployeesList";
import Table from "@/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { EmployeesResDto } from "@/types/employees/employees-res-dto";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/consts";
import { useRouter } from "next/navigation";
import ProfilePicture from "@/components/ProfilePicture";
import EmployeeFilters from "@/components/EmployeeFilters";
import { EmployeesSearchParams } from "@/types/employees/employees-search-params";
import { useDebounce } from "@/hooks/useDebounce";
import { getAge } from "@/utils/getAge";
import styles from "./styles.module.css";
import LargeAlertMessage from "@/components/LargeErrorMessage";

const EmployeesPage: FunctionComponent = () => {
  const [filters, setFilters] = useState<EmployeesSearchParams>();
  const [debouncedParams] = useDebounce([filters], 500);
  const { page, setPage, data, isError, isFetching, isLoading } =
    useEmployeesList(debouncedParams);

  const router = useRouter();

  const columnDef = useMemo<ColumnDef<EmployeesResDto>[]>(() => {
    return [
      {
        id: "profilePicture",
        header: () => <div className="text-center">Profile</div>,
        cell: (info) => (
          <div className="flex items-center justify-center">
            <ProfilePicture
              profilePicture={info.row.original.profile_picture}
              width={48}
              height={48}
            />
          </div>
        ),
      },
      {
        id: "full_name",
        header: () => "Full name",
        accessorFn: (employee) =>
          `${employee.first_name} ${employee.last_name}`,
      },
      {
        accessorKey: "date_of_birth",
        header: () => "Age",
        cell: (info) =>
          info.getValue() ? getAge(info.getValue() as string) : "Not Available",
      },
      {
        accessorKey: "gender",
        header: () => "Gender",
        cell: (info) => info.getValue() || "Not Specified",
      },
      {
        accessorKey: "work_phone_number",
        header: () => "Phone number",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "email_address",
        header: () => "Email address",
        cell: (info) => info.getValue() || "Not Available",
      },
    ];
  }, []);

  const pagination = data ? (
    <div className="p-4 sm:p-6 xl:p-7.5 flex items-center justify-between">
      <Pagination
        page={page}
        disabled={isFetching}
        onClick={setPage}
        totalPages={Math.ceil(data.count / PAGE_SIZE)}
      />
      {isFetching && <div className="text-sm">Fetching page {page}...</div>}
    </div>
  ) : (
    <></>
  );

  const handleRowClick = (employee: EmployeesResDto) => {
    router.push(`/employees/${employee.id}`);
  };

  return (
    <>
      <Panel
        title={"Employees List"}
        header={
          <div className="flex grow justify-between flex-wrap gap-4">
            <EmployeeFilters onFiltersChange={setFilters} />
            <Link
              href={`/employees/new`}
              className="inline-flex items-center justify-center px-10 py-4 font-medium text-center text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Add new Employee
            </Link>
          </div>
        }
      >
        {isLoading && <div className="p-4 sm:p-6 xl:p-7.5">Loading...</div>}
        {pagination}

        {data && (
          <Table
            onRowClick={handleRowClick}
            data={data.results}
            columns={columnDef}
            className={styles.table}
          />
        )}

        {data && data.results.length === 0 && (
          <LargeAlertMessage
            firstLine={"Oops!"}
            secondLine={
              "It seems that there are no employees that match your search criteria."
            }
          />
        )}

        {pagination}

        {isError && (
          <LargeAlertMessage
            firstLine={"Oops!"}
            secondLine={
              "An error has prevented us from fetching the employees list."
            }
          />
        )}
      </Panel>
    </>
  );
};

export default EmployeesPage;
