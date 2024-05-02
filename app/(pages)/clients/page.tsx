"use client";

import React, { FunctionComponent, useMemo, useState } from "react";
import Link from "next/link";
import Panel from "@/components/Panel";
import { useClientsList } from "@/utils/clients/getClientsList";
import Table from "@/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { ClientsResDto } from "@/types/clients/clients-res-dto";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE, STATUS_RECORD } from "@/consts";
import { useRouter } from "next/navigation";
import ProfilePicture from "@/components/ProfilePicture";
import ClientFilters from "@/components/ClientFilters";
import { ClientsSearchParams } from "@/types/clients/clients-search-params";
import { useDebounce } from "@/hooks/useDebounce";
import { getAge } from "@/utils/getAge";
import styles from "./styles.module.css";
import LargeAlertMessage from "@/components/LargeErrorMessage";
import LinkButton from "@/components/buttons/LinkButton";
import { mappingGender } from "@/utils/gender";
import { SecureFragment } from "@/components/SecureWrapper";
import * as consts from "@/consts/permissions";
import Loader from "@/components/common/Loader";

const ClientsPage: FunctionComponent = () => {
  const [filters, setFilters] = useState<ClientsSearchParams>();
  const debouncedParams = useDebounce(filters, 500);
  const { page, setPage, data, isError, isFetching, isLoading } =
    useClientsList(debouncedParams);

  const router = useRouter();

  const columnDef = useMemo<ColumnDef<ClientsResDto>[]>(() => {
    return [
      {
        id: "profilePicture",
        // Profile
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
        header: () => "Volledige Naam",
        accessorFn: (client) => `${client.first_name} ${client.last_name}`,
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
        cell: (info) =>
          mappingGender[info.getValue() as string] || "Niet gespecificeerd",
      },
      {
        accessorKey: "status",
        header: () => "Status",
        cell: (info) => STATUS_RECORD[info.getValue() as string] || "N/A",
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
            <ClientFilters
              onFiltersChange={(filters) => {
                setFilters((prev) => ({ ...prev, ...filters }));
                setPage(1);
              }}
            />
            <SecureFragment permission={consts.CLIENT_CREATE}>
              <Link href={`/clients/new`}>
                <LinkButton
                  text={"Nieuwe Cliënten Toevoegen"}
                  href={`/clients/new`}
                />
              </Link>
            </SecureFragment>
          </div>
        }
      >
        {isLoading && (
          <div className="p-4 sm:p-6 xl:p-7.5">
            <Loader />
          </div>
        )}
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
              "Het lijkt erop dat er geen cliënten zijn die aan uw zoekcriteria voldoen."
            }
          />
        )}

        {pagination}

        {isError && (
          <LargeAlertMessage
            firstLine={"Oops!"}
            secondLine={
              "Een fout heeft ons verhinderd de cliëntenlijst op te halen."
            }
          />
        )}
      </Panel>
    </>
  );
};

export default ClientsPage;
