"use client";

import React, { FunctionComponent, useMemo, useState } from "react";
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
import OrganisationFilter from "@/components/OrganisationFilter";
import LinkButton from "@/components/buttons/LinkButton";

const EmployeesPage: FunctionComponent = () => {
  const [filters, setFilters] = useState<EmployeesSearchParams>();
  const debouncedParams = useDebounce(filters, 500);
  const { page, setPage, data, isError, isFetching, isLoading } =
    useEmployeesList(debouncedParams);

  const router = useRouter();

  const columnDef = useMemo<ColumnDef<EmployeesResDto>[]>(() => {
    return [
      {
        id: "profilePicture",
        header: () => <div className="text-center">Profiel</div>,
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
        header: () => "Volledige naam",
        accessorFn: (employee) =>
          `${employee.first_name} ${employee.last_name}`,
      },
      {
        accessorKey: "date_of_birth",
        header: () => "Leeftijd",
        cell: (info) =>
          info.getValue()
            ? getAge(info.getValue() as string)
            : "Niet gespecificeerd",
      },
      {
        accessorKey: "gender",
        header: () => "Geslacht",
        cell: (info) => info.getValue() || "Niet gespecificeerd",
      },
      {
        accessorKey: "work_phone_number",
        header: () => "Telefoonnummer",
        cell: (info) => info.getValue() || "Niet gespecificeerd",
      },
      {
        accessorKey: "email_address",
        header: () => "E-mailadres",
        cell: (info) => info.getValue() || "Niet gespecificeerd",
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
            <LinkButton
              text={"Nieuwe Medewerker Toevoegen"}
              href={`/employees/new`}
            />
          </div>
        }
      >
        <div className="px-[60px] pt-6">
          <div className="flex flex-col items-start justify-start">
            <OrganisationFilter
              data={data}
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>
        </div>

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
              "Het lijkt erop dat er geen medewerkers zijn die aan uw zoekcriteria voldoen."
            }
          />
        )}

        {pagination}

        {isError && (
          <LargeAlertMessage
            firstLine={"Oops!"}
            secondLine={
              "Een fout heeft ons verhinderd de medewerkerslijst op te halen."
            }
          />
        )}
      </Panel>
    </>
  );
};

export default EmployeesPage;
