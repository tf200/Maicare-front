"use client";

import React, { FunctionComponent, useMemo } from "react";
import { useEpisodesList } from "@/utils/episodes/getEpisodeList";
import { ColumnDef, createColumnHelper, Row } from "@tanstack/table-core";
import { EpisodesResDto } from "@/types/episodes/episodes-res-dto";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/consts";
import LinkButton from "@/components/buttons/LinkButton";
import Loader from "@/components/common/Loader";
import Table from "@/components/Table";
import Severity from "@/components/Severity";
import DetailCell from "@/components/DetailCell";
import { fullDateFormat, fullDateTimeFormat } from "@/utils/timeFormatting";
import { convertIntensityToSeverity } from "@/utils/episodes/convertIntensityToSeverity";

type Props = {
  params: { clientId: string };
};

const EpisodesPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const {
    data,
    pagination: { page, setPage },
    isError,
    isLoading,
    isFetching,
  } = useEpisodesList(parseInt(clientId));

  const columnDef = useMemo<ColumnDef<EpisodesResDto>[]>(() => {
    const columnHelper = createColumnHelper<EpisodesResDto>();

    return [
      {
        accessorKey: "date",
        header: "Geregistreerde Datum",
        cell: (info) => fullDateTimeFormat(info.getValue() as string),
      },
      columnHelper.accessor("intensity", {
        header: (Header) => (
          <div className="flex justify-center w-full">Intensiteit</div>
        ),
        cell: (info) => (
          <div className="flex justify-center w-full">
            <Severity severity={convertIntensityToSeverity(info.getValue())} />
          </div>
        ),
      }),
      {
        accessorKey: "state_description",
        header: "Beschrijving van de Toestand",
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
        {isFetching && (
          <div className="text-sm ml-2">Fetching page {page}...</div>
        )}
      </>
    ) : (
      <></>
    );

  const renderRowDetails = ({ original }: Row<EpisodesResDto>) => {
    return <RowDetails data={original} />;
  };

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        {pagination}
        <LinkButton
          text={"Registreer Nieuwe Episode"}
          href={"../episodes/new"}
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
          Sorry an error has prevented us from loading the episodes list.
        </p>
      )}
    </>
  );
};

export default EpisodesPage;

type RowDetailsProps = {
  data: EpisodesResDto;
};

const RowDetails: FunctionComponent<RowDetailsProps> = ({ data }) => {
  return (
    <div className={"grid grid-cols-2 gap-2"}>
      <DetailCell
        label={"Geregistreerde Datum"}
        value={fullDateTimeFormat(data.date)}
      />
      <DetailCell
        label={"Intensiteit"}
        value={
          <div className="mt-2">
            <Severity severity={convertIntensityToSeverity(data.intensity)} />
          </div>
        }
      />
      <DetailCell
        className={"col-span-2"}
        label={"Beschrijving van de Toestand"}
        value={data.state_description}
      />
    </div>
  );
};
