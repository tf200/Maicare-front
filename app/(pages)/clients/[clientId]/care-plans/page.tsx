"use client";

import React, { FunctionComponent, useMemo } from "react";
import Panel from "@/components/Panel";
import { CarePlanListItem } from "@/types/care-plan";
import { ColumnDef } from "@tanstack/react-table";
import PaginatedTable from "@/components/PaginatedTable";
import { dateFormat } from "@/utils/timeFormatting";
import LinkButton from "@/components/buttons/LinkButton";
import { useCarePlanDelete, useClientCarePlans } from "@/utils/care-plans";
import Link from "next/link";
import {
  CARE_PLAN_CREATE,
  CARE_PLAN_DELETE,
  CARE_PLAN_EDIT,
  CARE_PLAN_STATUS_TRANSLATION,
  CARE_PLAN_STATUS_VARIANT,
} from "@/consts";
import StatusBadge from "@/components/StatusBadge";
import clientInformation from "@/components/clientDetails/ClientInformation";
import DropdownDefault from "@/components/Dropdowns/DropdownDefault";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import { useMyPermissions } from "@/components/SecureWrapper";

const Page: FunctionComponent<{
  params: {
    clientId: string;
  };
}> = ({ params: { clientId } }) => {
  const { data, pagination } = useClientCarePlans(+clientId);
  const { hasPerm } = useMyPermissions();
  const router = useRouter();
  const columnDefs = useMemo<ColumnDef<CarePlanListItem>[]>(() => {
    return [
      {
        header: "Zorgplan nummer",
        accessorKey: "id",
        cell: (ctx) => {
          return (
            <Link
              className={"text-primary underline font-bold"}
              href={`/clients/${clientId}/care-plans/${ctx.row.original.id}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              #{ctx.row.original.id}
            </Link>
          );
        },
      },
      {
        id: "from_to_dates",
        header: "Van - Tot",
        cell: (ctx) => {
          return (
            <div>
              <div>{dateFormat(ctx.row.original.start_date)}</div>
              <div>{dateFormat(ctx.row.original.end_date)}</div>
            </div>
          );
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (ctx) => {
          return (
            <StatusBadge
              type={CARE_PLAN_STATUS_VARIANT[ctx.row.original.status] || "Outline"}
              text={CARE_PLAN_STATUS_TRANSLATION[ctx.row.original.status]}
            />
          );
        },
      },
    ];
  }, []);
  const { open } = useModal(
    getDangerActionConfirmationModal({
      title: "Zorgplan verwijderen",
      msg: "Weet je zeker dat je dit zorgplan wilt verwijderen?",
    })
  );
  const { mutate: deletePlan } = useCarePlanDelete();

  return (
    <Panel
      title={"Zorgplannen"}
      sideActions={
        hasPerm(CARE_PLAN_CREATE) && (
          <LinkButton
            href={`/clients/${clientId}/care-plans/new`}
            className={"mt-2"}
            text={"Nieuw zorgplan"}
          />
        )
      }
    >
      {data && (
        <PaginatedTable
          data={data}
          columns={columnDefs}
          page={pagination.page}
          onPageChange={pagination.setPage}
          renderRowDetails={(row) => {
            return (
              <div>
                <div className="flex justify-end">
                  <DropdownDefault
                    onEdit={() => {
                      router.push(`care-plans/${row.original.id}/edit`);
                    }}
                    onDelete={() => {
                      open({
                        onConfirm: () => {
                          deletePlan(row.original.id);
                        },
                      });
                    }}
                    visible={[hasPerm(CARE_PLAN_EDIT), hasPerm(CARE_PLAN_DELETE)]}
                  />
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: row.original.description,
                  }}
                />
              </div>
            );
          }}
        />
      )}
    </Panel>
  );
};

export default Page;
