"use client";

import React, { FunctionComponent, useMemo } from "react";
import { ColumnDef } from "@tanstack/table-core";
import LinkButton from "@/components/buttons/LinkButton";
import Loader from "@/components/common/Loader";
import PaginatedTable from "@/components/PaginatedTable";
import { fullDateFormat } from "@/utils/timeFormatting";
import Panel from "@/components/Panel";
import { NewIncidentType } from "@/types/incidents";
import { EMPTY_STRING, SEVERITY_OF_INCIDENT_OPTIONS, TYPES_INCIDENT_OPTIONS } from "@/consts";
import { useGetIncidentList } from "@/utils/new-incident/useGetIncidentList";
import Link from "next/link";
import IconButton from "@/components/buttons/IconButton";
import PencilSquare from "@/components/icons/PencilSquare";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { useDeleteIncident } from "@/utils/new-incident/useDeleteIncident";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import QuestionnaireDownloadButton from "@/components/QuestionnaireDownloadButton";

type Props = {
  params: { clientId: string };
};

const IncidentsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { data, pagination, isError, isLoading, isFetching } = useGetIncidentList(
    parseInt(clientId)
  );

  const { mutate: deleteIncident } = useDeleteIncident(parseInt(clientId));

  const getSelectedLabels = (options, value) => {
    const option = options.find((obj) => obj.value === value);
    return option ? option.label : EMPTY_STRING;
  };

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u dit incident wilt verwijderen?",
      title: "Incident verwijderen",
    })
  );

  const columnDef = useMemo<ColumnDef<NewIncidentType>[]>(() => {
    return [
      {
        accessorKey: "employee_fullname",
        header: "Naam betrokken",
      },
      {
        accessorKey: "incident_date",
        header: "Datum ontstaan",
      },
      {
        accessorKey: "runtime_incident",
        header: "Runtime incident ",
      },
      {
        accessorKey: "incident_type",
        header: "Type incident ",
        cell: (info) => getSelectedLabels(TYPES_INCIDENT_OPTIONS, info.getValue()),
      },
      {
        accessorKey: "severity_of_incident",
        header: "ernst incident",
        cell: (info) => getSelectedLabels(SEVERITY_OF_INCIDENT_OPTIONS, info.getValue()),
      },
      {
        accessorKey: "created",
        header: "gemaakt bij",
        cell: (info) => fullDateFormat(info.getValue() as string),
      },
      {
        accessorKey: "action",
        header: "Actions",
        cell: (info) => {
          return (
            <div className="flex gap-3">
              <Link href={`/clients/${clientId}/incidents/${info.row.id}/edit`}>
                <IconButton>
                  <PencilSquare className="w-5 h-5" />
                </IconButton>
              </Link>
              <QuestionnaireDownloadButton type="incident_report" questId={+info.row.id} />
              <IconButton
                className="bg-red-600"
                onClick={() =>
                  open({
                    onConfirm: () => {
                      deleteIncident(parseInt(info.row.id));
                    },
                  })
                }
              >
                <DeleteIcon className="w-5 h-5" />
              </IconButton>
            </div>
          );
        },
      },
    ];
  }, []);

  return (
    <Panel
      title={"Incidenten"}
      sideActions={
        <LinkButton text="Nieuw incident toevoegen" href={"./incidents/add"} className="ml-auto" />
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
        />
      )}
      <div className="flex flex-wrap justify-between items-center p-4"></div>
      {isError && (
        <p role="alert" className="text-red-600">
          Sorry, er is een fout opgetreden waardoor we dit niet konden laden.
        </p>
      )}
    </Panel>
  );
};

export default IncidentsPage;
