"use client";

import React, { FunctionComponent, useMemo } from "react";
import { useAllergiesList } from "@/utils/allergies/getAllergiesList";
import { ColumnDef, createColumnHelper, Row } from "@tanstack/table-core";
import { AllergiesResDto } from "@/types/allergies/allergies-res-dto";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/consts";
import LinkButton from "@/components/buttons/LinkButton";
import Loader from "@/components/common/Loader";
import Table from "@/components/Table";
import Severity from "@/components/Severity";
import DetailCell from "@/components/DetailCell";
import ChevronDown from "@/components/icons/ChevronDown";
import clsx from "clsx";
import PaginatedTable from "@/components/PaginatedTable";

type Props = {
  params: { clientId: string };
};

const AllergiesPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const {
    data,
    pagination,
    isError,
    isLoading,
    isFetching,
  } = useAllergiesList(parseInt(clientId));

  const columnDef = useMemo<ColumnDef<AllergiesResDto>[]>(() => {
    const columnHelper = createColumnHelper<AllergiesResDto>();

    return [
      {
        accessorKey: "allergy_type",
        header: "Type Allergie",
      },
      {
        accessorKey: "reaction",
        header: "Reactie",
      },
      columnHelper.accessor("severity", {
        header: (Header) => (
          <div className="flex justify-center w-full">Ernst</div>
        ),
        cell: (info) => (
          <div className="flex justify-center w-full">
            <Severity severity={info.getValue()} />
          </div>
        ),
      }),
    ];
  }, []);

  const renderRowDetails = ({ original }: Row<AllergiesResDto>) => {
    return <RowDetails data={original} />;
  };

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        <LinkButton
          text={"Registreer Nieuwe Allergie"}
          href={"../allergies/new"}
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
          renderRowDetails={renderRowDetails}
        />
      )}
      <div className="flex flex-wrap justify-between items-center p-4">
      </div>
      {isError && (
        <p role="alert" className="text-red">
          Sorry, een fout heeft ons verhinderd de allergielijst te laden.
        </p>
      )}
    </>
  );
};

export default AllergiesPage;

type RowDetailsProps = {
  data: AllergiesResDto;
};

const RowDetails: FunctionComponent<RowDetailsProps> = ({ data }) => {
  return (
    <div className={"grid grid-cols-3 gap-2"}>
      <DetailCell label={"Type Allergie"} value={data.allergy_type} />
      <DetailCell label={"Reactie"} value={data.reaction} />
      <DetailCell
        label={"Ernst"}
        value={
          <div className="mt-2">
            <Severity severity={data.severity} />
          </div>
        }
      />
      <DetailCell className={"col-span-3"} label={"Notities"} value={data.notes} />
    </div>
  );
};
