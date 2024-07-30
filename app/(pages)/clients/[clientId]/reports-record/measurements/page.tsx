"use client";

import React, { FunctionComponent, useMemo } from "react";
import { ColumnDef } from "@tanstack/table-core";
import LinkButton from "@/components/buttons/LinkButton";
import Loader from "@/components/common/Loader";
import { MeasurmentResDto } from "@/types/measurment/measurment-res-dto";
import { useMeasurementList } from "@/utils/measurement/getMeasuremenList";
import PaginatedTable from "@/components/PaginatedTable";
import IconButton from "@/components/buttons/IconButton";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import { useDeleteMeasurement } from "@/utils/measurement/deleteMeasurment";
import Link from "next/link";
import PencilSquare from "@/components/icons/PencilSquare";

type Props = {
  params: { clientId: string };
};

const MeasurementsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { pagination, data, isError, isLoading, isFetching } = useMeasurementList(
    parseInt(clientId)
  );

  const {
    mutate: deleteMeasurement,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteMeasurement(+clientId);

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je deze meting wilt verwijderen?",
      title: "Meting Verwijderen",
    })
  );

  const columnDef = useMemo<ColumnDef<MeasurmentResDto>[]>(() => {
    return [
      {
        accessorKey: "date",
        header: "Datum",
      },
      {
        accessorKey: "measurement_type",
        header: "Type Meting",
      },
      {
        accessorKey: "value",
        header: "Waarde",
      },
      {
        accessorKey: "id",
        header: () => "",
        cell: (info) => (
          <div className="flex justify-center gap-4">
            <IconButton
              buttonType="Danger"
              onClick={() => {
                open({
                  onConfirm: () => {
                    deleteMeasurement(info.getValue() as number);
                  },
                });
              }}
              disabled={isDeleted}
              isLoading={isDeleting}
            >
              {isDeleted ? <CheckIcon className="w-5 h-5" /> : <TrashIcon className="w-5 h-5" />}
            </IconButton>
            <Link href={`/clients/${clientId}/measurements/${info.getValue() as number}/edit`}>
              <IconButton>
                <PencilSquare className="w-5 h-5" />
              </IconButton>
            </Link>
          </div>
        ),
      },
    ];
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        <LinkButton
          text={"Nieuwe Metingen Toevoegen"}
          href={"../measurements/new"}
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
      )}{" "}
      {isError && (
        <p role="alert" className="text-c_red p-2">
          Sorry, een fout heeft ons verhinderd de allergielijst te laden.
        </p>
      )}
    </>
  );
};

export default MeasurementsPage;
