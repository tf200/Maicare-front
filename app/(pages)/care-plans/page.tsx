"use client";

import React, { FunctionComponent, useCallback, useMemo } from "react";
import { useModal } from "@/components/providers/ModalProvider";
import ClientSelectModal from "@/components/Modals/ClientSelectModal";
import { useRouter } from "next/navigation";
import Panel from "@/components/Panel";
import { CarePlanListItem, CarePlanListResDto } from "@/types/care-plan";
import { ColumnDef } from "@tanstack/react-table";
import PaginatedTable from "@/components/PaginatedTable";
import { dateFormat } from "@/utils/timeFormatting";
import LinkButton from "@/components/buttons/LinkButton";

const Page: FunctionComponent = (props) => {
  const { open } = useModal(ClientSelectModal);
  const router = useRouter();
  const selectClient = useCallback(() => {
    open({
      onSelect: (clientId) => {},
    });
  }, [open, router]);

  const list: CarePlanListResDto = {
    results: [],
    count: 0,
    next: null,
    previous: null,
  }; // TODO: Fetch care plans

  const columnDefs = useMemo<ColumnDef<CarePlanListItem>[]>(() => {
    return [
      {
        header: "Zorgplan nummer",
        accessor: "id",
        cell: (ctx) => {
          return (
            <a
              onClick={() => {
                router.push(`/care-plans/${ctx.row.original.id}`);
              }}
            >
              #{ctx.row.original.id}
            </a>
          );
        },
      },
      {
        header: "Omschrijving",
        accessor: "description",
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
        accessor: "status",
      },
    ];
  }, []);

  return (
    <Panel
      title={"Zorgplannen"}
      sideActions={
        <LinkButton href={"/care-plans/new"} text={"Nieuw zorgplan"} />
      }
    >
      <PaginatedTable
        data={list}
        columns={columnDefs}
        page={1}
        onPageChange={() => {}}
      />
    </Panel>
  );
};

export default Page;
