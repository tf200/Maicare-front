"use client";

import React, { FunctionComponent, useMemo } from "react";
import { useClientContractsList } from "@/utils/contracts/getClientContractsList";
import PaginatedTable from "@/components/PaginatedTable";
import { ContractResDto } from "@/types/contracts/contract-res.dto";
import { ColumnDef } from "@tanstack/react-table";
import { getRate, rateType } from "@/utils/contracts/rate-utils";
import Panel from "@/components/Panel";
import LinkButton from "@/components/buttons/LinkButton";
import Loader from "@/components/common/Loader";
import { fullDateFormat } from "@/utils/timeFormatting";
import { useRouter } from "next/navigation";
import IconButton from "@/components/buttons/IconButton";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { useDeleteContract } from "@/utils/contracts/deleteContract";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import { useModal } from "@/components/providers/ModalProvider";

type Props = {
  params: { clientId: string };
};

const ContractsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { data, pagination, isLoading, isFetching } = useClientContractsList(
    parseInt(clientId)
  );
  const router = useRouter();

  const {
    mutate: deleteContract,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteContract(+clientId);

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je dit contract wilt verwijderen?",
      title: "Contract Verwijderen",
    })
  );

  const columnDef = useMemo<ColumnDef<ContractResDto>[]>(() => {
    return [
      {
        accessorKey: "start_date",
        header: "Startdatum",
        cell: (info) => fullDateFormat(info.getValue() as string),
      },
      {
        accessorKey: "end_date",
        header: "Einddatum",
        cell: (info) => fullDateFormat(info.getValue() as string),
      },
      {
        accessorKey: "care_type",
        header: "Zorgtype",
      },
      {
        id: "Tarieftype",
        accessorFn: rateType,
      },
      {
        id: "Tarief",
        accessorFn: getRate,
      },
      {
        accessorKey: "id",
        header: () => "",
        cell: (info) => (
          <div className="flex justify-start">
            <IconButton
              buttonType="Danger"
              onClick={(e) => {
                e.stopPropagation();
                open({
                  onConfirm: () => {
                    deleteContract(info.getValue() as number);
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
    <Panel
      title={"Contractenlijst"}
      sideActions={
        <LinkButton text={"Nieuw contract toevoegen"} href={`contracts/new`} />
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
          onRowClick={(row) => router.push(`contracts/${row.id}`)}
        />
      )}
    </Panel>
  );
};

export default ContractsPage;
