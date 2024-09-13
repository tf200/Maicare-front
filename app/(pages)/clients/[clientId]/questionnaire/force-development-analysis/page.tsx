"use client";
import IconButton from "@/components/buttons/IconButton";
import LinkButton from "@/components/buttons/LinkButton";
import Loader from "@/components/common/Loader";
import DeleteIcon from "@/components/icons/DeleteIcon";
import PencilSquare from "@/components/icons/PencilSquare";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import PaginatedTable from "@/components/PaginatedTable";
import Panel from "@/components/Panel";
import { useModal } from "@/components/providers/ModalProvider";
import QuestionnaireDownloadButton from "@/components/QuestionnaireDownloadButton";
import { ForceDevelopmentAnalysisType } from "@/types/questionnaire/force-development-analysis";
import { useDeleteForceDevelopmentAnalysis } from "@/utils/questionnairs/force-development-analysis/useDeleteForceDevelopmentAnalysis";
import { useGetAllForceDevelopmentAnalysis } from "@/utils/questionnairs/force-development-analysis/useGetAllForceDevelopmentAnalysis";

import { fullDateFormat } from "@/utils/timeFormatting";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { FunctionComponent, useMemo } from "react";

type Props = {
  params: { clientId: string };
};
const ForceDevelopmentAnalysisForm: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { mutate: deleteForceDevelopmentAnalysis } = useDeleteForceDevelopmentAnalysis(parseInt(clientId));
  const { data, pagination, isError, isLoading, isFetching } = useGetAllForceDevelopmentAnalysis(
    parseInt(clientId)
  );

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u deze krachtontwikkelingsanalyse wilt verwijderen?",
      title: "Verwijder krachtontwikkelingsanalyse",
    })
  );

  const columnDef = useMemo<ColumnDef<ForceDevelopmentAnalysisType>[]>(() => {
    return [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "table",
        header: "Tafel",
        // chow the length of the table
        cell: (info) => {
          const table = info.getValue() as { length: number };
          return `${table.length} rijen`;
        },
      },
      {
        accessorKey: "created",
        header: "Aanmaakdatum",
        cell: (info) => fullDateFormat(info.getValue() as string),
      },
      {
        accessorKey: "updated",
        header: "Aanmaakdatum",
        cell: (info) => fullDateFormat(info.getValue() as string),
      },
      {
        accessorKey: "action",
        header: "Acties",
        cell: (info) => {
          return (
            <div className="flex gap-3">
              <Link
                href={`/clients/${clientId}/questionnaire/force-development-analysis/${info.row.id}/edit`}
              >
                <IconButton>
                  <PencilSquare className="w-5 h-5" />
                </IconButton>
              </Link>
              <QuestionnaireDownloadButton type="force_development_analysis" questId={+info.row.id} />
              <IconButton
                className="bg-red-600"
                onClick={() => {
                  return open({
                    onConfirm: () => {
                      deleteForceDevelopmentAnalysis(parseInt(info.row.id));
                    },
                  });
                }}
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
      title={"Krachtontwikkelingsanalyses"}
      sideActions={
        <LinkButton
          text="Nieuwe Krachtontwikkelingsanalyses"
          href={"./force-development-analysis/add"}
          className="ml-auto"
        />
      }
    >
      {isLoading && <Loader />}
      {data && (
        <PaginatedTable
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
export default ForceDevelopmentAnalysisForm;
