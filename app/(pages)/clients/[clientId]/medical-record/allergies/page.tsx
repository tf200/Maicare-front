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

type Props = {
  params: { clientId: string };
};

const AllergiesPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { data, page, setPage, isError, isLoading, isFetching } =
    useAllergiesList(parseInt(clientId));

  const columnDef = useMemo<ColumnDef<AllergiesResDto>[]>(() => {
    const columnHelper = createColumnHelper<AllergiesResDto>();

    return [
      {
        accessorKey: "allergy_type",
        header: "Allergy Type",
      },
      {
        accessorKey: "reaction",
        header: "Reaction",
      },
      columnHelper.accessor("severity", {
        header: (Header) => (
          <div className="flex justify-center w-full">Severity</div>
        ),
        cell: (info) => (
          <div className="flex justify-center w-full">
            <Severity severity={info.getValue()} />
          </div>
        ),
      }),
      {
        accessorKey: "notes",
        header: "Notes",
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
          <div className="text-sm ml-2">Fetching page {page}...</div>
        )}
      </>
    ) : (
      <></>
    );

  const renderRowDetails = ({ original }: Row<AllergiesResDto>) => {
    return (
      <code>
        <pre>{JSON.stringify(original, null, 2)}</pre>
      </code>
    );
  };

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        {pagination}
        <LinkButton
          text={"Record New Allergy"}
          href={"../allergies/new"}
          className="ml-auto"
        />
      </div>
      {isLoading && <Loader />}
      {data && (
        <Table
          data={data.results}
          columns={columnDef}
          renderRowDetails={renderRowDetails}
        />
      )}
      <div className="flex flex-wrap justify-between items-center p-4">
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

export default AllergiesPage;
