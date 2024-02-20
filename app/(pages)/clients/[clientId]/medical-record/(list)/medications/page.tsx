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

const MedicationsPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  const {
    data,
    pagination: { page, setPage },
    isLoading,
    isFetching,
    isError,
  } = useMedicationsList(parseInt(clientId));

  const columnDef = useMemo<ColumnDef<MedicationsResDto>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: "Naam",
      },
      {
        accessorKey: "dosage",
        header: "Dosering",
      },
      {
        accessorKey: "frequency",
        header: "Frequentie",
      },
      {
        accessorKey: "start_date",
        header: "Startdatum",
      },
      {
        accessorKey: "end_date",
        header: "Einddatum",
      },
    ];
  }, []);

  const pageCount = data
    ? Math.ceil(data.count / (data.page_size ?? PAGE_SIZE))
    : 0;

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
          text={"Voeg een Medicatie toe"}
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
          Sorry, een fout heeft ons verhinderd de medicatielijst te laden.
        </p>
      )}
    </>
  );
};

export default MedicationsPage;

type RowDetailsProps = {
  data: MedicationsResDto;
};

const RowDetails: FunctionComponent<RowDetailsProps> = ({ data }) => {
  return (
    <div className={"grid grid-cols-3 gap-2"}>
      <DetailCell label={"Naam"} value={data.name} />
      <DetailCell label={"Dosering"} value={data.dosage} />
      <DetailCell label={"Frequentie"} value={data.frequency} />
      <DetailCell label={"Startdatum"} value={data.start_date} />
      <DetailCell label={"Einddatum"} value={data.end_date} />
      <DetailCell className={"col-span-3"} label={"Notities"} value={data.notes} />
    </div>
  );
};
