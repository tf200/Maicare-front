"use client";

import React, { FunctionComponent, useMemo } from "react";
import Link from "next/link";
import Panel from "@/components/Panel";
import { useClientsList } from "../../../utils/clients/getClientsList";
import Table from "@/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { ClientsResDto } from "@/types/clients/clients-res-dto";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/consts";
import { useRouter } from "next/navigation";
import ProfilePicture from "@/components/ProfilePicture";

const ClientsPage: FunctionComponent = () => {
  const { page, setPage, data, isError, isFetching, isLoading } =
    useClientsList();

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
            />
          </div>
        ),
      },
      {
        accessorKey: "first_name",
        header: () => "First Name",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "last_name",
        header: () => "Last Name",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "email",
        header: () => "Email",
        cell: (info) => info.getValue() || "Not Available",
      },

      {
        accessorKey: "phone_number",
        header: () => "Phone Number",
        cell: (info) => info.getValue() || "Not Available",
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
    <Panel
      title={"Clients List"}
      sideActions={
        <Link
          href={`/clients/new`}
          className="inline-flex items-center justify-center px-10 py-4 font-medium text-center text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add new Clients
        </Link>
      }
    >
      {isLoading && <div className="p-4 sm:p-6 xl:p-7.5">Loading...</div>}
      {pagination}

      {data && (
        <Table
          onRowClick={handleRowClick}
          data={data.results}
          columns={columnDef}
        />
      )}

      {pagination}

      {isError && (
        <p role="alert" className="text-red">
          An error has occurred
        </p>
      )}
    </Panel>
  );
};

export default ClientsPage;
