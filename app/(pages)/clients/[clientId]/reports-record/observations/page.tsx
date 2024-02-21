"use client";

import React, { FunctionComponent, useMemo } from "react";
import { ColumnDef } from "@tanstack/table-core";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/consts";
import Loader from "@/components/common/Loader";
import Table from "@/components/Table";
import LinkButton from "@/components/buttons/LinkButton";
import { useObservationsList } from "@/utils/observations/getObservationslList";
import { ObservationsResDto } from "@/types/observations/observations-res-dto";
import PaginatedTable from "@/components/PaginatedTable";

type Props = {
  params: { clientId: string };
};

const ObservationsPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  const { data, pagination, isLoading, isFetching, isError } =
    useObservationsList(parseInt(clientId));

  const columnDef = useMemo<ColumnDef<ObservationsResDto>[]>(() => {
    return [
      {
        accessorKey: "date",
        header: "Datum",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "observation_text",
        header: "Observatie",
        cell: (info) => info.getValue() || "Not Available",
      },

      {
        accessorKey: "category",
        header: "Categorie",
        cell: (info) => info.getValue() || "Not Available",
      },
    ];
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        <LinkButton
          text={"Observaties Toevoegen"}
          href={"../observations/new"}
          className="ml-auto"
        />
      </div>
      {isLoading && <Loader />}
      {data && (
        <PaginatedTable
          data={data}
          columns={columnDef}
          page={pagination.page ?? 1}
          isFetching={isFetching}
          onPageChange={(page) => pagination.setPage(page)}
        />
      )}
      {isError && (
        <p role="alert" className="text-red">
          Sorry, een fout heeft ons verhinderd de medicatielijst te laden.
        </p>
      )}
    </>
  );
};

export default ObservationsPage;
