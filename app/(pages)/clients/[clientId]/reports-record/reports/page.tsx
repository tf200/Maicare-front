"use client";

import React, { FunctionComponent, useMemo } from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/table-core";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/consts";
import Loader from "@/components/common/Loader";
import LinkButton from "@/components/buttons/LinkButton";
import { ReportsListItem } from "@/types/reports/reports-list-res-dto";
import { useReportsList } from "@/utils/reports/getReportsList";
import PaginatedTable from "@/components/PaginatedTable";
import { fullDateTimeFormat } from "@/utils/timeFormatting";
import IconButton from "@/components/buttons/IconButton";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { useDeleteReport } from "@/utils/reports/deleteReport";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";

type Props = {
  params: { clientId: string };
};

const ReportsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { pagination, isFetching, isLoading, isError, data } = useReportsList(
    parseInt(clientId)
  );

  const {
    mutate: deleteReport,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteReport(+clientId);

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je dit rapport wilt verwijderen?",
      title: "Rapport Verwijderen",
    })
  );

  const columnDef = useMemo<ColumnDef<ReportsListItem>[]>(() => {
    return [
      {
        accessorKey: "date",
        header: () => "Datum & Tijd",
        cell: (info) => fullDateTimeFormat(info.getValue() as Date) || "Not Available",
      },
      {
        accessorKey: "report_text",
        header: () => "Beschrijving van het Rapport",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "title",
        header: () => "Titel",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "full_name",
        header: () => "Geschreven Door",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "id",
        header: () => "",
        cell: (info) => (
          <div className="flex justify-center">
            <IconButton
              buttonType="Danger"
              onClick={() => {
                open({
                  onConfirm: () => {
                    deleteReport(info.getValue() as number);
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
          </div>
        ),
      },
    ];
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        <LinkButton
          text={"Rapporten Toevoegen"}
          href={"../reports/new"}
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
        />
      )}
      {isError && (
        <p role="alert" className="text-red">
          Sorry, een fout heeft ons verhinderd de lijst te laden.
        </p>
      )}
    </>
  );
};

export default ReportsPage;
