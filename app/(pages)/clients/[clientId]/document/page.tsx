"use client";
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
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
import ConfirmationModal from "@/components/ComfirmationModal";
import FileIcon from "@/components/svg/FileIcon";

type Props = {
  params: { clientId: string };
};

const DocumentsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const {
    page,
    setPage,
    isFetching,
    isLoading: isListLoading,
    isError,
    data,
  } = useDocumentList(clientId);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [documentId, setDocumentId] = useState<number>(null);

  const { mutate, isLoading: isDeleteLoading } = useDeleteDocument(
    parseInt(clientId)
  );
  const onSubmit = useCallback(
    (documentId: number) => {
      mutate(documentId, {
        onSuccess: () => {
          setModalOpen(false);
        },
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
            <FileIcon />
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
              setDocumentId(info.getValue());
              setModalOpen(true);
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
    <>
      <ConfirmationModal
        title="Delete Confirmation"
        message="Are you sure you want to delete this document ?"
        buttonMessage="Delete"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        isLoading={isDeleteLoading}
        action={() => {
          onSubmit(documentId);
        }}
      />

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
        {isListLoading && <div className="p-4 sm:p-6 xl:p-7.5">Loading...</div>}
        {pagination}
        {data && <Table data={data.results} columns={columnDef} />}
        {pagination}
        {isError && (
          <p role="alert" className="text-red">
            An error has occurred
          </p>
        )}
      </Panel>
    </>
  );
};

export default DocumentsPage;
