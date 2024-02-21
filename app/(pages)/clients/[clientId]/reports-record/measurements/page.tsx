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
import PaginatedTable from "@/components/PaginatedTable";

type Props = {
  params: { clientId: string };
};

const MeasurementsPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  const { pagination, data, isError, isLoading, isFetching } =
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

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        <LinkButton
          text={"Nieuwe Metingen Toevoegen"}
          href={"../measurements/new"}
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
      )}{" "}
      {isError && (
        <p role="alert" className="text-red">
          Sorry, een fout heeft ons verhinderd de allergielijst te laden.
        </p>
      )}
    </>
  );
};

export default MeasurementsPage;
