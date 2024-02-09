"use client";

import React, { FunctionComponent, useMemo } from "react";
import { ColumnDef } from "@tanstack/table-core";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/consts";
import Loader from "@/components/common/Loader";
import Table from "@/components/Table";
import LinkButton from "@/components/buttons/LinkButton";
import { useObservationsList } from "@/utils/observations/getObservationslList";
import { ObservationsListResDto } from "@/types/observations/observations-list-res-dto";

type Props = {
  params: { clientId: string };
};

const ObservationsPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  const { data, page, setPage, isLoading, isFetching, isError } =
    useObservationsList(parseInt(clientId));

  const columnDef = useMemo<ColumnDef<ObservationsListResDto>[]>(() => {
    return [
      {
        accessorKey: "date",
        header: "Date",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "observation_text",
        header: "Observation",
        cell: (info) => info.getValue() || "Not Available",
      },

      {
        accessorKey: "category",
        header: "Category",
        cell: (info) => info.getValue() || "Not Available",
      },
    ];
  }, []);

  const pageCount = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

  const pagination =
    data && pageCount > 1 ? (
      <>
        <Pagination
          page={page}
          disabled={isFetching} /* TODO: WE NEED TO IMPROVE UX HERE */
          onClick={setPage}
          totalPages={pageCount}
        />
        {isFetching && <div className="text-sm">Fetching page {page}...</div>}
      </>
    ) : (
      <></>
    );

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        {pagination}
        <LinkButton
          text={"Add Observations"}
          href={"../observations/new"}
          className="ml-auto"
        />
      </div>
      {isLoading && <Loader />}
      {data && <Table data={data.results} columns={columnDef} />}
      <div className="flex flex-wrap items-center p-4">{pagination}</div>
      {isError && (
        <p role="alert" className="text-red">
          Sorry an error has prevented us from loading the medications list.
        </p>
      )}
    </>
  );
};

export default ObservationsPage;
