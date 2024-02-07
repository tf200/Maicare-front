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

type Props = {
  params: { clientId: string };
};

const ContractsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { data, pagination, isLoading, isFetching } = useClientContractsList(
    parseInt(clientId)
  );
  const router = useRouter();
  const columnDef = useMemo<ColumnDef<ContractResDto>[]>(() => {
    return [
      {
        accessorKey: "start_date",
        header: "Start Date",
        cell: (info) => fullDateFormat(info.getValue() as string),
      },
      {
        accessorKey: "end_date",
        header: "End Date",
        cell: (info) => fullDateFormat(info.getValue() as string),
      },
      {
        accessorKey: "care_type",
        header: "Care Type",
      },
      {
        id: "Rate Type",
        accessorFn: rateType,
      },
      {
        id: "Rate",
        accessorFn: getRate,
      },
    ];
  }, []);

  return (
    <Panel
      title={"Contracts List"}
      sideActions={
        <LinkButton text={"Add new contract"} href={`contracts/new`} />
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
