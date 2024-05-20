"use client";

import React, { Fragment, FunctionComponent } from "react";
import ProfilePicture from "@/components/ProfilePicture";
import { getLocateDatetime } from "@/utils/message-time";
import LargeErrorMessage from "@/components/LargeErrorMessage";
import styles from "./reports.module.css";
import clsx from "clsx";
import LinkButton from "@/components/buttons/LinkButton";
import Button from "@/components/buttons/Button";
import { useReportsInfiniteList } from "@/utils/reports/getReportsInfiniteList";
import DropdownDefault from "@/components/Dropdowns/DropdownDefault";
import { useDeleteReport } from "@/utils/reports/deleteReport";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import { useRouter } from "next/navigation";
import { REPORT_TYPE_RECORD } from "@/consts";
import { showEmojies } from "@/types/reports/reports-list-res-dto";

type Props = {
  params: { clientId: string };
};

const ReportsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const router = useRouter();

  const { data, isError, hasNextPage, fetchNextPage } = useReportsInfiniteList(
    parseInt(clientId)
  );

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je dit rapport wilt verwijderen?",
      title: "Rapport Verwijderen",
    })
  );

  const {
    mutate: deleteReport,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteReport(+clientId);

  return (
    <div>
      <div className="flex flex-wrap items-center p-4">
        <LinkButton
          text={"Rapporten Toevoegen"}
          href={"../reports/new"}
          className="ml-auto"
        />
      </div>
      {isError && (
        <p role="alert" className="text-red">
          Sorry, een fout heeft ons verhinderd de lijst te laden.
        </p>
      )}
      {data?.pages.length === 0 ||
        (data?.pages[0]?.results.length === 0 && (
          <LargeErrorMessage
            firstLine={"Oops!"}
            secondLine={"Er zijn geen rapporten beschikbaar"}
          />
        ))}
      <div className="p-6 lg:max-w-[50%]">
        <div className="flex flex-col gap-7 ">
          {data?.pages.map((page, i) => (
            <Fragment key={i}>
              {page?.results.map((post, key) => (
                <div
                  className={clsx(
                    "relative z-1 flex gap-5.5",
                    styles.withTrail
                  )}
                  key={key}
                >
                  <div className="h-16 w-full max-w-16 rounded-full border-[2px] border-stroke dark:border-strokedark">
                    <ProfilePicture
                      width={60}
                      height={60}
                      profilePicture={post.profile_picture}
                    />
                  </div>

                  <div className="group">
                    <p className="text-black dark:text-white flex gap-4">
                      <div>
                        <span className="font-medium">Report #{post.id}</span>
                        <span className="px-1">Geschreven door</span>
                        <span className="font-medium">{post.full_name}</span>
                      </div>

                      <span className="hidden group-hover:block">
                        <DropdownDefault
                          onEdit={() => {
                            router.push(
                              `/clients/${clientId}/reports/${post.id}/edit`
                            );
                          }}
                          onDelete={() => {
                            open({
                              onConfirm: () => {
                                deleteReport(post.id);
                              },
                            });
                          }}
                        />
                      </span>
                    </p>
                    <span className="mt-1 block text-sm">
                      {getLocateDatetime(post.created)} - {REPORT_TYPE_RECORD[post.type]}
                    </span>
                    <span className="">{showEmojies(post.emotional_state)}</span>
                    <p className="mt-2.5 text-black dark:text-white">
                      {post.report_text}
                    </p>
                  </div>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
        <div className="ml-4 mt-8">
          {hasNextPage && (
            <Button
              onClick={() => {
                fetchNextPage();
              }}
            >
              Laad meer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
