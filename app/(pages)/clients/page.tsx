"use client";

import React, { FunctionComponent, useMemo, useState } from "react";
import Link from "next/link";
import Panel from "@/components/Panel";
import { useClientsList } from "@/utils/clients/getClientsList";
import Table from "@/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { ClientsResDto } from "@/types/clients/clients-res-dto";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/consts";
import { useRouter } from "next/navigation";
import ProfilePicture from "@/components/ProfilePicture";
import ClientFilters from "@/components/ClientFilters";
import { ClientsSearchParams } from "@/types/clients/clients-search-params";
import { useDebounce } from "@/hooks/useDebounce";
import { getAge } from "@/utils/getAge";
import styles from "./styles.module.css";
import LargeAlertMessage from "@/components/LargeErrorMessage";

const ClientsPage: FunctionComponent = () => {
  const [filters, setFilters] = useState<ClientsSearchParams>();
  const [debouncedParams] = useDebounce([filters], 500);
  const { page, setPage, data, isError, isFetching, isLoading } =
    useClientsList(debouncedParams);

  const router = useRouter();

  const columnDef = useMemo<ColumnDef<ClientsResDto>[]>(() => {
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
        accessorFn: (client) => `${client.first_name} ${client.last_name}`,
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
        accessorKey: "status",
        header: () => "Status",
        cell: (info) => info.getValue() || "N/A",
      },
    ];
  }, []);

  const pagination = data ? (
    <div className="p-4 sm:p-6 xl:p-7.5 flex items-center justify-between">
      <Pagination
        page={page}
        disabled={isFetching} /* TODO: WE NEED TO IMPROVE UX HERE */
        onClick={setPage}
        totalPages={Math.ceil(data.count / PAGE_SIZE)}
      />
      {isFetching && <div className="text-sm">Fetching page {page}...</div>}
    </div>
  ) : (
    <></>
  );

  const handleRowClick = (client: ClientsResDto) => {
    router.push(`/clients/${client.id}`);
  };

  return (
    <>
      <Panel
        title={"Clients List"}
        header={
          <div className="flex grow justify-between flex-wrap gap-4">
            <ClientFilters onFiltersChange={setFilters} />
            <Link
              href={`/clients/new`}
              className="inline-flex items-center justify-center px-10 py-4 font-medium text-center text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Add new Clients
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
              "It seems that there are no clients that match your search criteria."
            }
          />
        )}

        {pagination}

        {isError && (
          <LargeAlertMessage
            firstLine={"Oops!"}
            secondLine={
              "An error has prevented us from fetching the clients list."
            }
          />
        )}
      </Panel>
    </>
  );
};

export default ClientsPage;
