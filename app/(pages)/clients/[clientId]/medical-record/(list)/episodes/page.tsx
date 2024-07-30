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
import PaginatedTable from "@/components/PaginatedTable";
import { useDeleteEpisode } from "@/utils/episodes/deleteEpisode";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import IconButton from "@/components/buttons/IconButton";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import Link from "next/link";
import PencilSquare from "@/components/icons/PencilSquare";

type Props = {
  params: { clientId: string };
};

const EpisodesPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { data, pagination, isError, isLoading, isFetching } = useEpisodesList(parseInt(clientId));

  const columnDef = useMemo<ColumnDef<EpisodesResDto>[]>(() => {
    const columnHelper = createColumnHelper<EpisodesResDto>();

    return [
      {
        accessorKey: "date",
        header: "Geregistreerde Datum",
        cell: (info) => fullDateTimeFormat(info.getValue() as string),
      },
      columnHelper.accessor("intensity", {
        header: (Header) => <div className="flex justify-center w-full">Intensiteit</div>,
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

  const renderRowDetails = ({ original }: Row<EpisodesResDto>) => {
    return <RowDetails data={original} clientId={parseInt(clientId)} />;
  };

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        <LinkButton
          text={"Registreer Nieuwe Episode"}
          href={"../episodes/new"}
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
      {isError && (
        <p role="alert" className="text-red-600">
          Sorry, een fout heeft ons verhinderd de episodelijst te laden.
        </p>
      )}
    </>
  );
};

export default EpisodesPage;

type RowDetailsProps = {
  data: EpisodesResDto;
  clientId: number;
};

const RowDetails: FunctionComponent<RowDetailsProps> = ({ data, clientId }) => {
  const {
    mutate: deleteEpisode,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteEpisode(data.client);

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je deze episode wilt verwijderen?",
      title: "Episode Verwijderen",
    })
  );

  return (
    <div className={"grid grid-cols-2 gap-2"}>
      <DetailCell label={"Geregistreerde Datum"} value={fullDateTimeFormat(data.date)} />
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
      <div className="flex gap-4">
        <IconButton
          buttonType="Danger"
          onClick={() => {
            open({
              onConfirm: () => {
                deleteEpisode(data.id);
              },
            });
          }}
          disabled={isDeleted}
          isLoading={isDeleting}
        >
          {isDeleted ? <CheckIcon className="w-5 h-5" /> : <TrashIcon className="w-5 h-5" />}
        </IconButton>
        <Link href={`/clients/${clientId}/episodes/${data.id}/edit`}>
          <IconButton>
            <PencilSquare className="w-5 h-5" />
          </IconButton>
        </Link>
      </div>
    </div>
  );
};
