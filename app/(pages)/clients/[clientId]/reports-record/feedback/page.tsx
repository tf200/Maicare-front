"use client";

import React, { FunctionComponent, useMemo } from "react";
import Table from "@/components/Table";
import { ColumnDef } from "@tanstack/table-core";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/consts";
import Loader from "@/components/common/Loader";
import LinkButton from "@/components/buttons/LinkButton";
import { useFeedbackList } from "@/utils/feedback/getFeedbackList";
import { FeedbackListItem } from "@/types/feedback/feedback-list-res-dto";
import PaginatedTable from "@/components/PaginatedTable";

type Props = {
  params: { clientId: string };
};

const FeedbackPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { pagination, isFetching, isLoading, isError, data } = useFeedbackList(
    parseInt(clientId)
  );

  const columnDef = useMemo<ColumnDef<FeedbackListItem>[]>(() => {
    return [
      {
        accessorKey: "date",
        header: () => "Datum",
      },
      {
        accessorKey: "feedback_text",
        header: () => "Feedback",
      },
      {
        accessorKey: "author_name",
        header: "Geschreven Door",
      },
    ];
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        <LinkButton
          text={"Feedback Toevoegen"}
          href={"../feedback/new"}
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
          Sorry, een fout heeft ons verhinderd de diagnoselijst te laden.
        </p>
      )}
    </>
  );
};

export default FeedbackPage;
