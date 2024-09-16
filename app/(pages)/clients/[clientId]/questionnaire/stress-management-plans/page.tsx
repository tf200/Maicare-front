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
import { RegistrationFormType } from "@/types/questionnaire/registration-form";
import { StressManagementPlansType } from "@/types/questionnaire/stress-management-plans";
import { useDeleteStressManagementPlans } from "@/utils/questionnairs/stress-management-plans/useDeleteStressManagementPlans";
import { useGetAllStressManagementPlans } from "@/utils/questionnairs/stress-management-plans/useGetAllStressManagementPlans";

import { fullDateFormat } from "@/utils/timeFormatting";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { FunctionComponent, useMemo } from "react";

type Props = {
  params: { clientId: string };
};
const StressManagementPlans: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { mutate: deleteStressManagementPlans } = useDeleteStressManagementPlans(parseInt(clientId));
  const { data, pagination, isError, isLoading, isFetching } = useGetAllStressManagementPlans(parseInt(clientId));

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u deze stressmanagementplannen wilt verwijderen?",
      title: "Verwijder stressmanagementplannen",
    })
  );

  const columnDef = useMemo<ColumnDef<StressManagementPlansType>[]>(() => {
    return [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "plan_usage",
        header: "Plangebruik",
      },
      {
        accessorKey: "updated",
        header: "bijgewerkt",
        cell: (info) => fullDateFormat(info.getValue() as string),
      },
      {
        accessorKey: "created",
        header: "gecreëerd",
        cell: (info) => fullDateFormat(info.getValue() as string),
      },
      {
        accessorKey: "action",
        header: "Acties",
        cell: (info) => {
          return (
            <div className="flex gap-3">
              <Link
                href={`/clients/${clientId}/questionnaire/stress-management-plans/${info.row.id}/edit`}
              >
                <IconButton>
                  <PencilSquare className="w-5 h-5" />
                </IconButton>
              </Link>
              <QuestionnaireDownloadButton type="stress_management_plan" questId={+info.row.id} />
              <IconButton
                className="bg-red-600"
                onClick={() => {
                  return open({
                    onConfirm: () => {
                      deleteStressManagementPlans(parseInt(info.row.id));
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
      title={"Stressmanagementplannen"}
      sideActions={
        <LinkButton
          text="Nieuwe Stressmanagementplannen"
          href={"./stress-management-plans/add"}
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
export default StressManagementPlans;
