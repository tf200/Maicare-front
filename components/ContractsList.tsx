import React, { FunctionComponent, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDeleteContract } from "@/utils/contracts/deleteContract";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import { ColumnDef } from "@tanstack/react-table";
import { ContractResDto } from "@/types/contracts/contract-res.dto";
import { fullDateFormat } from "@/utils/timeFormatting";
import { getRate, rateType } from "@/utils/contracts/rate-utils";
import DropdownDefault from "@/components/Dropdowns/DropdownDefault";
import Loader from "@/components/common/Loader";
import PaginatedTable from "@/components/PaginatedTable";
import { UseQueryResult } from "react-query";
import { ContractsListDto } from "@/types/contracts/contracts-list.dto";
import { WithPaginationResult } from "@/types/pagination-result";
import { careTypeDict } from "@/consts";
import MonthsBetween from "@/components/MonthsBetween";

type Props = {
  queryResult: WithPaginationResult<UseQueryResult<ContractsListDto>>;
};

const ContractsList: FunctionComponent<Props> = ({ queryResult }) => {
  const { data, pagination, isLoading, isFetching } = queryResult;
  const router = useRouter();

  const { mutate: deleteContract } = useDeleteContract(0);

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je dit contract wilt verwijderen?",
      title: "Contract Verwijderen",
    })
  );

  const columnDef = useMemo<ColumnDef<ContractResDto>[]>(() => {
    return [
      {
        header: "Periode",
        cell: ({
          row: {
            original: { start_date, end_date },
          },
        }) => (
          <div>
            <div>
              <strong>Van:</strong> {fullDateFormat(start_date)}
            </div>
            <div>
              <strong>Tot:</strong> {fullDateFormat(end_date)}
            </div>
            <div>
              <MonthsBetween startDate={start_date} endDate={end_date} />
            </div>
          </div>
        ),
      },
      {
        accessorKey: "care_type",
        header: "Zorgtype",
        cell: (item) => careTypeDict[item.getValue() as string],
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
        id: "actions",
        header: () => "",
        cell: (info) => (
          <div className="flex justify-end">
            <DropdownDefault
              onTriggerClick={(e) => e.stopPropagation()}
              onDelete={(e) => {
                e.stopPropagation();
                open({
                  onConfirm: () => {
                    deleteContract(info.row.original.id);
                  },
                });
              }}
              onEdit={(e) => {
                e.stopPropagation();
                router.push(
                  `/clients/${info.row.original.client_id}/contracts/${info.row.original.id}/edit`
                );
              }}
            />
          </div>
        ),
      },
    ];
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {data && (
        <PaginatedTable
          data={data}
          columns={columnDef}
          page={pagination.page ?? 1}
          isFetching={isFetching}
          onPageChange={(page) => pagination.setPage(page)}
          onRowClick={(row) =>
            router.push(`/clients/${row.client_id}/contracts/${row.id}`)
          }
        />
      )}
    </>
  );
};

export default ContractsList;
