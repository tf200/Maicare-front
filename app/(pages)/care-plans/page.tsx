"use client";

import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useModal } from "@/components/providers/ModalProvider";
import ClientSelectModal from "@/components/Modals/ClientSelectModal";
import { useRouter } from "next/navigation";
import Panel from "@/components/Panel";
import { CarePlanListItem } from "@/types/care-plan";
import { ColumnDef } from "@tanstack/react-table";
import PaginatedTable from "@/components/PaginatedTable";
import { dateFormat } from "@/utils/timeFormatting";
import LinkButton from "@/components/buttons/LinkButton";
import { useClientCarePlans } from "@/utils/care-plans";
import Link from "next/link";
import {
  CARE_PLAN_STATUS_TRANSLATION,
  CARE_PLAN_STATUS_VARIANT,
} from "@/consts";
import StatusBadge from "@/components/StatusBadge";
import { FormikProvider, useFormik } from "formik";
import ClientSelector from "@/components/FormFields/comboboxes/ClientSelector";
import Button from "@/components/buttons/Button";

const Page: FunctionComponent = (props) => {
  const [selectedClient, setSelectedClient] = useState<number>();

  const { data, pagination } = useClientCarePlans(selectedClient);

  const columnDefs = useMemo<ColumnDef<CarePlanListItem>[]>(() => {
    return [
      {
        header: "Zorgplan nummer",
        accessorKey: "id",
        cell: (ctx) => {
          return (
            <Link
              className={"text-primary underline font-bold"}
              href={`/clients/${ctx.row.original.client}/care-plans/${ctx.row.original.id}`}
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
              type={
                CARE_PLAN_STATUS_VARIANT[ctx.row.original.status] || "Outline"
              }
              text={CARE_PLAN_STATUS_TRANSLATION[ctx.row.original.status]}
            />
          );
        },
      },
    ];
  }, []);

  return (
    <Panel
      title={"Zorgplannen"}
      header={
        <div className="w-full flex justify-between items-center">
          <SelectClient onSelect={setSelectedClient} />
        </div>
      }
    >
      {!selectedClient && (
        <h2 className="mb-6 pl-4 pt-4">
          Selecteer een cliënt om een zorgplan te zoeken
        </h2>
      )}
      {data && (
        <PaginatedTable
          data={data}
          columns={columnDefs}
          page={pagination.page}
          onPageChange={pagination.setPage}
          renderRowDetails={(row) => {
            return (
              <div
                dangerouslySetInnerHTML={{
                  __html: row.original.description,
                }}
              />
            );
          }}
        />
      )}
    </Panel>
  );
};

export default Page;

const SelectClient: FunctionComponent<{
  onSelect: (clientId: number) => void;
}> = ({ onSelect }) => {
  const formik = useFormik({
    initialValues: {
      client: undefined,
    },
    onSubmit: (values) => {
      onSelect(values.client);
    },
  });
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="flex items-center gap-4">
        <ClientSelector name={"client"} className={"mb-6"} />
        <Button type={"submit"} className={"mt-2.5"}>
          Zorgplan Zoeken
        </Button>
      </form>
    </FormikProvider>
  );
};
