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
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import IconButton from "@/components/buttons/IconButton";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { useDeleteFeedback } from "@/utils/feedback/deleteFeedback";
import Link from "next/link";
import PencilSquare from "@/components/icons/PencilSquare";

type Props = {
  params: { clientId: string };
};

const FeedbackPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { pagination, isFetching, isLoading, isError, data } = useFeedbackList(
    parseInt(clientId)
  );

  const {
    mutate: deleteFeedback,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteFeedback(+clientId);

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je deze feedback wilt verwijderen?",
      title: "Feedback Verwijderen",
    })
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
      {
        accessorKey: "id",
        header: () => "",
        cell: (info) => (
          console.log(info),
          
          <div className="flex justify-center gap-4">
            <IconButton
              buttonType="Danger"
              onClick={() => {
                open({
                  onConfirm: () => {
                    deleteFeedback(info.getValue() as number);
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
            <Link
              href={`/clients/${clientId}/feedback/${info.getValue() as number}/edit`}
            >
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
