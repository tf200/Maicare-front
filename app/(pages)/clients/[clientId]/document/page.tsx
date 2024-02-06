"use client";
import React, { FunctionComponent, useCallback, useMemo } from "react";
import Link from "next/link";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import { useDocumentList } from "@/utils/document/getDocumentList";
import { PAGE_SIZE } from "@/consts";
import Panel from "@/components/Panel";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { useDeleteDocument } from "@/utils/document/deleteDocument";
import bytesToSize from "@/hooks/useSizeConverter";
type Props = {
  params: { clientId: string };
};

const DocumentsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { page, setPage, isFetching, isLoading, isError, data } =
    useDocumentList(clientId);

  const { mutate, isLoading: isDeleteLoading } = useDeleteDocument(
    parseInt(clientId)
  );
  const onSubmit = useCallback(
    (documentId: number) => {
      mutate(documentId, {
        onSuccess: () => {},
      });
    },
    [mutate]
  );

  const columnDef = useMemo(() => {
    return [
      {
        accessorKey: "none",
        header: () => "",
        cell: () => (
          <div className="flex justify-center w-full">
            <svg
              className="fill-current"
              width="32"
              height="32"
              viewBox="0 0 28 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.72659 3.36759C5.32314 2.77105 6.13222 2.43591 6.97585 2.43591H16.2295L16.2299 2.43591L16.2303 2.43591C16.4817 2.43591 16.7081 2.54281 16.8665 2.71363L23.7604 9.6075C23.9312 9.76594 24.0381 9.99231 24.0381 10.2437C24.0381 10.2568 24.0378 10.2699 24.0372 10.2828V24.1241C24.0372 24.9677 23.7021 25.7768 23.1055 26.3733C22.509 26.9699 21.6999 27.305 20.8563 27.305H6.97585C6.13222 27.305 5.32313 26.9699 4.72659 26.3733C4.13005 25.7768 3.79492 24.9677 3.79492 24.1241V5.61684C3.79492 4.77321 4.13005 3.96413 4.72659 3.36759ZM6.97585 4.17097H15.3628V10.2437C15.3628 10.7228 15.7512 11.1112 16.2303 11.1112H22.3022V24.1241C22.3022 24.5075 22.1498 24.8753 21.8787 25.1465C21.6075 25.4176 21.2397 25.57 20.8563 25.57H6.97585C6.59238 25.57 6.22462 25.4176 5.95346 25.1465C5.68231 24.8753 5.52997 24.5075 5.52997 24.1241V5.61684C5.52997 5.23337 5.68231 4.86561 5.95346 4.59445C6.22462 4.3233 6.59238 4.17097 6.97585 4.17097ZM17.0979 5.3987L21.0753 9.37613H17.0979V5.3987ZM9.2896 15.1596C8.81048 15.1596 8.42208 15.548 8.42208 16.0271C8.42208 16.5062 8.81048 16.8946 9.2896 16.8946H18.5432C19.0223 16.8946 19.4107 16.5062 19.4107 16.0271C19.4107 15.548 19.0223 15.1596 18.5432 15.1596H9.2896ZM8.42208 20.654C8.42208 20.1749 8.81048 19.7865 9.2896 19.7865H18.5432C19.0223 19.7865 19.4107 20.1749 19.4107 20.654C19.4107 21.1332 19.0223 21.5216 18.5432 21.5216H9.2896C8.81048 21.5216 8.42208 21.1332 8.42208 20.654ZM9.2896 10.5328C8.81048 10.5328 8.42208 10.9212 8.42208 11.4003C8.42208 11.8795 8.81048 12.2679 9.2896 12.2679H11.603C12.0821 12.2679 12.4705 11.8795 12.4705 11.4003C12.4705 10.9212 12.0821 10.5328 11.603 10.5328H9.2896Z"
                fill=""
              />
            </svg>
          </div>
        ),
      },
      {
        accessorKey: "original_filename",
        header: () => "File name",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "file_size",
        header: () => "File size",
        cell: (info) =>
          bytesToSize(parseInt(info.getValue())) || "Not Available",
      },
      {
        accessorKey: "uploaded_at",
        header: () => "Uploaded on",
        cell: (info) =>
          dayjs(info.getValue()).format("DD MMM, YYYY") || "Not Available",
      },
      {
        accessorKey: "documents",
        header: () => "",
        cell: (info) => (
          <a
            href={info.getValue()}
            className="w-[30%] min-w-[120px] p-2 px-6 text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
          >
            Download
          </a>
        ),
      },
      {
        accessorKey: "id",
        header: () => "",
        cell: (info) => (
          <a
            onClick={() => {
              onSubmit(info.getValue());
            }}
            className="w-[30%] min-w-[120px] p-2 px-6 text-white transition border rounded-lg cursor-pointer border-danger bg-danger hover:bg-opacity-90"
          >
            Delete
          </a>
        ),
      },
    ];
  }, []);

  const pagination = data ? (
    <div className="p-4 sm:p-6 xl:p-7.5 flex items-center justify-between">
      <Pagination
        page={page}
        disabled={isFetching}
        onClick={setPage}
        totalPages={Math.ceil(data.count / PAGE_SIZE)}
      />
      {isFetching && <div className="text-sm">Fetching page {page}...</div>}
    </div>
  ) : (
    <></>
  );

  return (
    <Panel
      title={"Documents list"}
      sideActions={
        <Link
          href={`/clients/${clientId}/document/new`}
          className="inline-flex items-center justify-center px-10 py-4 font-medium text-center text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Upload a New Document
        </Link>
      }
    >
      {isLoading && <div className="p-4 sm:p-6 xl:p-7.5">Loading...</div>}
      {pagination}
      {data && <Table data={data.results} columns={columnDef} />}
      {pagination}
      {isError && (
        <p role="alert" className="text-red">
          An error has occurred
        </p>
      )}
    </Panel>
  );
};

export default DocumentsPage;
