"use client";

import React, { FunctionComponent, useMemo } from "react";
import { useIncidentList } from "@/utils/incident/getIncidentList";
import { ColumnDef, Row } from "@tanstack/table-core";
import { IncidentsResDto } from "@/types/incidents/incident-res-dto";
import LinkButton from "@/components/buttons/LinkButton";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import PaginatedTable from "@/components/PaginatedTable";
import { fullDateFormat, fullDateTimeFormat } from "@/utils/timeFormatting";
import { useDeleteIncident } from "@/utils/incident/deleteIncident";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import IconButton from "@/components/buttons/IconButton";
import Link from "next/link";
import PencilSquare from "@/components/icons/PencilSquare";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import Panel from "@/components/Panel";

type Props = {
  params: { clientId: string };
};

const IncidentsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { data, pagination, isError, isLoading, isFetching } = useIncidentList(
    parseInt(clientId)
  );

  const columnDef = useMemo<ColumnDef<IncidentsResDto>[]>(() => {
    return [
      {
        accessorKey: "date_reported",
        header: "Gerapporteerde datum",
        cell: (info) =>
          fullDateFormat(info.getValue() as string) || "Niet beschikbaar",
      },
      {
        accessorKey: "reported_by_name",
        header: "Gemeld door",
        cell: (info) => info.getValue() || "Niet beschikbaar",
      },
      {
        accessorKey: "involved_children_name",
        header: "Betrokken kinderen",
        cell: (info) => info.getValue() || "Niet beschikbaar",
      },
      {
        accessorKey: "location",
        header: "Locatie van het incident",
        cell: (info) => info.getValue() || "Niet beschikbaar",
      },
      {
        accessorKey: "follow_up_required",
        header: "Follow-up vereist",
        cell: (info) =>
          info.getValue() === false ? "Nee" : "Ja" || "Niet beschikbaar",
      },
      {
        accessorKey: "follow_up_date",
        header: "Datum voor follow-up",
        cell: (info) =>
          fullDateFormat(info.getValue() as string) || "Niet beschikbaar",
      },
      {
        accessorKey: "status",
        header: "Toestand",
        cell: (info) => info.getValue() || "Niet beschikbaar",
      },
    ];
  }, []);

  const renderRowDetails = ({ original }: Row<IncidentsResDto>) => {
    return <RowDetails clientId={parseInt(clientId)} data={original} />;
  };

  return (
    <Panel
      title={"Incidenten"}
      sideActions={
        <LinkButton
          text={"Add New Incident"}
          href={"./incidents/new"}
          className="ml-auto"
        />
      }
    >
      {isLoading && <Loader />}
      {data && (
        <PaginatedTable
          className="bg-white"
          data={data}
          columns={columnDef}
          page={pagination.page ?? 1}
          isFetching={isFetching}
          onPageChange={(page) => pagination.setPage(page)}
          renderRowDetails={renderRowDetails}
        />
      )}
      <div className="flex flex-wrap justify-between items-center p-4"></div>
      {isError && (
        <p role="alert" className="text-red">
          Sorry, er is een fout opgetreden waardoor we dit niet konden laden.
        </p>
      )}
    </Panel>
  );
};

export default IncidentsPage;

type RowDetailsProps = {
  data: IncidentsResDto;
  clientId: number;
};

const RowDetails: FunctionComponent<RowDetailsProps> = ({ data, clientId }) => {
  const {
    mutate: deleteIncident,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteIncident(data.id, clientId);

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u dit incident wilt verwijderen?",
      title: "Incident verwijderen",
    })
  );

  return (
    <div className={"grid grid-cols-3 gap-2"}>
      <DetailCell
        label={"Datum en tijd van het incident"}
        value={fullDateTimeFormat(data.date_of_incident)}
      />
      <DetailCell
        label={"Gerapporteerde datum"}
        value={fullDateFormat(data.date_reported)}
      />
      <DetailCell label={"Gemeld door"} value={data.reported_by_name} />
      <DetailCell
        label={"Betrokken kinderen"}
        value={data.involved_children_name}
      />
      <DetailCell
        label={"Follow-up vereist"}
        value={data.follow_up_required === false ? "Nee" : "Ja"}
      />
      <DetailCell
        label={"Datum voor follow-up"}
        value={fullDateFormat(data.follow_up_date)}
      />
      <DetailCell label={"Toestand"} value={data.status} />
      <DetailCell
        label={"Ondernomen actie"}
        value={<p className="text-sm">{data.action_taken}</p>}
      />
      <DetailCell
        label={"Beschrijving"}
        value={<p className="text-sm">{data.description}</p>}
      />
      <DetailCell
        label={"Opmerkingen"}
        value={<p className="text-sm">{data.notes}</p>}
      />
      <div className="flex gap-4 items-start">
        <IconButton
          buttonType="Danger"
          onClick={() => {
            open({
              onConfirm: () => {
                deleteIncident(data.id);
              },
            });
          }}
          disabled={isDeleted}
          isLoading={isDeleting}
        >
          {isDeleted ? (
            <CheckIcon className="w-5 h-5" />
          ) : (
            <TrashIcon className="w-5 h-5" />
          )}
        </IconButton>
        <Link href={`/clients/${clientId}/incidents/${data.id}/edit`}>
          <IconButton>
            <PencilSquare className="w-5 h-5" />
          </IconButton>
        </Link>
      </div>
    </div>
  );
};
