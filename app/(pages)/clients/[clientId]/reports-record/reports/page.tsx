"use client";

import React, { Fragment, FunctionComponent } from "react";
import { useReportsList } from "@/utils/reports/getReportsList";
import ProfilePicture from "@/components/ProfilePicture";
import { getTime } from "@/utils/message-time";
import LargeErrorMessage from "@/components/LargeErrorMessage";
import styles from "./reports.module.css";
import clsx from "clsx";
import LinkButton from "@/components/buttons/LinkButton";
import Button from "@/components/buttons/Button";
import { useReportsInfiniteList } from "@/utils/reports/getReportsInfiniteList";

type Props = {
  params: { clientId: string };
};

const ReportsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { data, isError, hasNextPage, fetchNextPage } = useReportsInfiniteList(
    parseInt(clientId)
  );
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
        <div className="flex flex-col gap-7">
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

                  <div>
                    <p className="text-black dark:text-white">
                      <span className="font-medium">{post.title}</span>
                      <span className="px-1">Geschreven door</span>
                      <span className="font-medium">{post.full_name}</span>
                    </p>
                    <span className="mt-1 block text-sm">
                      {getTime(post.date)}
                    </span>
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
