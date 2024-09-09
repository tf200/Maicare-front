import React, { FunctionComponent, useMemo } from "react";
import { ObjectiveItem, RatingHistory, RatingHistoryItem } from "@/types/goals";
import Table from "@/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import IconButton from "@/components/buttons/IconButton";
import TrashIcon from "@/components/icons/TrashIcon";
import { useDeleteObjectiveReport } from "@/utils/goal";
import { dateFormat } from "@/utils/timeFormatting";
import { weekNumberRange } from "@/utils/weekHelpers";

const ObjectiveReports: FunctionComponent<{
  data: RatingHistory;
  clientId: number;
  objectiveId: number;
  objective: ObjectiveItem;
  isArchived?: boolean;
}> = ({ data, clientId, objectiveId, objective, isArchived }) => {
  const {
    mutate: deleteReport,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteObjectiveReport(clientId, objectiveId);
  const columnDef = useMemo<ColumnDef<RatingHistoryItem>[]>(() => {
    return [
      {
        accessorKey: "week",
        header: "Week",
        cell: (item) => {
          const week = item.getValue() as number;
          const range = weekNumberRange(objective.created, week);
          return (
            <div>
              <div className="font-bold">#{week}</div>
              <div>
                {dateFormat(range.start)} - {dateFormat(range.end)}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "rating",
        header: "Rating",
      },
      {
        accessorKey: "content",
        header: "Omschrijving",
        cell: (item) => {
          const value = item.getValue() as string;
          return (
            <div className="text-sm">
              {value.substring(0, 50)}
              {value.length > 50 && " ..."}
            </div>
          );
        },
      },
    ];
  }, []);
  return (
    <div className="max-h-115 overflow-auto">
      <Table
        className="bg-white"
        data={data}
        columns={columnDef}
        renderRowDetails={({ original: { content, id } }) => {
          return (
            <div>
              <div>{content}</div>
              { !isArchived && (
                <div className="mt-6 flex justify-end">
                  <IconButton
                    buttonType={"Danger"}
                    onClick={() => {
                      deleteReport(id);
                    }}
                    isLoading={isDeleting}
                    disabled={isDeleted || isDeleting}
                  >
                    <TrashIcon />
                  </IconButton>
              </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default ObjectiveReports;
