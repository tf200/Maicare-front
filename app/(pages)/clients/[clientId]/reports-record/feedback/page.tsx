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

type Props = {
  params: { clientId: string };
};

const FeedbackPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { page, setPage, isFetching, isLoading, isError, data } =
    useFeedbackList(parseInt(clientId));

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

  const pageCount = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

  const pagination =
    data && pageCount > 0 ? (
      <>
        <Pagination
          page={page}
          disabled={isFetching} /* TODO: WE NEED TO IMPROVE UX HERE */
          onClick={setPage}
          totalPages={pageCount}
        />
        {isFetching && (
          <div className="ml-2 text-sm">Fetching page {page}...</div>
        )}
      </>
    ) : (
      <></>
    );

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        {pagination}
        <LinkButton
          text={"Feedback Toevoegen"}
          href={"../feedback/new"}
          className="ml-auto"
        />
      </div>
      {isLoading && <Loader />}
      {data && <Table data={data.results} columns={columnDef} />}
      <div className="flex flex-wrap items-center justify-between p-4">
        {pagination}
      </div>
      {isError && (
        <p role="alert" className="text-red">
          Sorry an error has prevented us from loading the diagnosis list.
        </p>
      )}
    </>
  );
};

export default FeedbackPage;
