"use client";
import React, { FunctionComponent, useMemo } from "react";
import Panel from "@/components/Panel";
import "dayjs/locale/en";
import PaginatedTable from "@/components/PaginatedTable";
import { useGoalsList } from "@/utils/goal/getGoalsList";
import { useModal } from "@/components/providers/ModalProvider";
import Button from "@/components/buttons/Button";
import NewGoalModal from "@/components/goals/NewGoalModal";
import { ColumnDef } from "@tanstack/react-table";
import { GoalsListItem } from "@/types/goals";
import styles from "./styles.module.scss";
import GoalDetails from "@/components/goals/GoalDetails";
import { useDomains, useGetDomain } from "@/utils/domains";

type Props = {
  params: { clientId: string };
};

const GoalsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const {
    pagination,
    isFetching,
    isLoading: isListLoading,
    isError,
    data,
  } = useGoalsList(parseInt(clientId));

  const columnDef = useMemo<ColumnDef<GoalsListItem>[]>(() => {
    return [
      {
        accessorKey: "item",
        header: () => "",
        cell: (info) => {
          return (
            <div>
              <h3 className="font-bold flex text-lg mb-6 justify-between">
                <div className="block">
                  <div>{info.row.original.title}</div>
                  <Domain id={info.row.original.domain_id} />
                </div>
                <div className="block border border-stroke rounded p-4 w-16 text-center bg-meta-5/10 font-bold">
                  {info.row.original.main_goal_rating}
                </div>
              </h3>
              <p>{info.row.original.desc}</p>
            </div>
          );
        },
      },
    ];
  }, []);

  const { open: openGoalModal } = useModal(NewGoalModal);

  return (
    <Panel
      className="w-full"
      title={"Doelenlijst"}
      sideActions={
        <Button
          onClick={() => {
            openGoalModal({ clientId });
          }}
        >
          Nieuw Doel Toevoegen
        </Button>
      }
    >
      {isListLoading && <div className="p-4 sm:p-6 xl:p-7.5">Loading...</div>}
      {data && (
        <PaginatedTable
          data={data}
          className={styles.table}
          columns={columnDef}
          page={pagination.page ?? 1}
          isFetching={isFetching}
          renderRowDetails={(row) => <GoalDetails goal={row.original} />}
          onPageChange={(page) => pagination.setPage(page)}
        />
      )}
      {isError && (
        <p role="alert" className="p-7 text-red">
          Er is een fout opgetreden.
        </p>
      )}
    </Panel>
  );
};

export default GoalsPage;

const Domain: FunctionComponent<{ id: number }> = ({ id }) => {
  const { data } = useGetDomain(id);
  return <div className="font-normal italic">{data?.name}</div>;
};
