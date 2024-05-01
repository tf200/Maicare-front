import React, { FunctionComponent, useMemo } from "react";
import { ObjectiveItem, RatingHistory, RatingHistoryItem } from "@/types/goals";
import Table from "@/components/Table";
import { ColumnDef } from "@tanstack/react-table";

const ObjectiveReports: FunctionComponent<{
  data: RatingHistory;
}> = ({ data }) => {
  const columnDef = useMemo<ColumnDef<RatingHistoryItem>[]>(() => {
    return [
      {
        accessorKey: "date",
        header: "Datum",
      },
      {
        accessorKey: "rating",
        header: "Rating",
      },
      {
        accessorKey: "title",
        header: "Titel",
      },
      {
        accessorKey: "desc",
        header: "Omschrijving",
      },
    ];
  }, []);
  return <Table data={data} columns={columnDef} />;
};

export default ObjectiveReports;
