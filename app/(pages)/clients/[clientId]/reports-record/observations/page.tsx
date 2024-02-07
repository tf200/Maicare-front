"use client";

import React, { FunctionComponent, useMemo } from "react";
import { useMedicationsList } from "@/utils/medications/getMedicationsList";
import { ColumnDef } from "@tanstack/table-core";
import { MedicationsResDto } from "@/types/medications/medications-res-dto";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/consts";
import Loader from "@/components/common/Loader";
import Table from "@/components/Table";
import LinkButton from "@/components/buttons/LinkButton";
import DetailCell from "@/components/DetailCell";

type Props = {
  params: { clientId: string };
};

const ObservationsPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  const { data, page, setPage, isLoading, isFetching, isError } =
    useMedicationsList(parseInt(clientId));

  const columnDef = useMemo<ColumnDef<MedicationsResDto>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "dosage",
        header: "Dosage",
      },
      {
        accessorKey: "frequency",
        header: "Frequency",
      },
      {
        accessorKey: "start_date",
        header: "Start Date",
      },
      {
        accessorKey: "end_date",
        header: "End Date",
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
          text={"Add a Medication"}
          href={"../medications/new"}
          className="ml-auto"
        />
      </div>
      {isLoading && <Loader />}
      {data && (
        <Table
          data={data.results}
          columns={columnDef}
          renderRowDetails={({ original }) => <RowDetails data={original} />}
        />
      )}
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

type RowDetailsProps = {
  data: MedicationsResDto;
};

const RowDetails: FunctionComponent<RowDetailsProps> = ({ data }) => {
  return (
    <div className={"grid grid-cols-3 gap-2"}>
      <DetailCell label={"Name"} value={data.name} />
      <DetailCell label={"Dosage"} value={data.dosage} />
      <DetailCell label={"Frequency"} value={data.frequency} />
      <DetailCell label={"Start Date"} value={data.start_date} />
      <DetailCell label={"End Date"} value={data.end_date} />
      <DetailCell className={"col-span-3"} label={"Notes"} value={data.notes} />
    </div>
  );
};
