"use client";

import React, { FunctionComponent, useMemo } from "react";
import { ColumnDef } from "@tanstack/table-core";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/consts";
import LinkButton from "@/components/buttons/LinkButton";
import Loader from "@/components/common/Loader";
import Table from "@/components/Table";
import { MeasurmentResDto } from "@/types/measurment/measurment-res-dto";
import { useMeasurementList } from "@/utils/measurement/getMeasuremenList";

type Props = {
  params: { clientId: string };
};

const MeasurementsPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  const { data, page, setPage, isError, isLoading, isFetching } =
    useMeasurementList(parseInt(clientId));

  const columnDef = useMemo<ColumnDef<MeasurmentResDto>[]>(() => {
    return [
      {
        accessorKey: "date",
        header: "Datum",
      },
      {
        accessorKey: "measurement_type",
        header: "Type Meting",
      },
      {
        accessorKey: "value",
        header: "Waarde",
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
        {isFetching && (
          <div className="ml-2 text-sm">Fetching page {page}...</div>
        )}
      </>
    ) : (
      <></>
    );

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        {pagination}
        <LinkButton
          text={"Nieuwe Metingen Toevoegen"}
          href={"../measurements/new"}
          className="ml-auto"
        />
      </div>
      {isLoading && <Loader />}
      {data && <Table data={data.results} columns={columnDef} />}
      <div className="flex flex-wrap items-center justify-between p-4">
        {pagination}
      </div>
      {isError && (
        <p role="alert" className="text-red">
          Sorry an error has prevented us from loading the allergy list.
        </p>
      )}
    </>
  );
};

export default MeasurementsPage;
