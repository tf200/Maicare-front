"use client";
import React, { FunctionComponent, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import { useDocumentList } from "@/utils/document/getDocumentList";
import { DOCUMENT_LABELS, DOCUMENT_LABEL_OPTIONS, PAGE_SIZE } from "@/consts";
import Panel from "@/components/Panel";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { useDeleteDocument } from "@/utils/document/deleteDocument";
import bytesToSize from "@/hooks/useSizeConverter";
import ConfirmationModal from "@/components/ComfirmationModal";
import FileIcon from "@/components/svg/FileIcon";
import PaginatedTable from "@/components/PaginatedTable";
import LinkButton from "@/components/buttons/LinkButton";

type Props = {
  params: { clientId: string };
};

const DocumentsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const {
    pagination,
    isFetching,
    isLoading: isListLoading,
    isError,
    data,
  } = useDocumentList(clientId, {
    page_size: 1000,
    page: 1,
  });

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [documentId, setDocumentId] = useState<number>(null);

  const { mutate, isLoading: isDeleteLoading } = useDeleteDocument(parseInt(clientId));
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
        className: "w-[70px]",
      },
      {
        accessorKey: "original_filename",
        header: () => "Bestandsnaam",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
        className: "w-[30%]",
      },
      {
        accessorKey: "file_size",
        header: () => "Bestandsgrootte",
        cell: (info) => bytesToSize(parseInt(info.getValue())) || "Niet Beschikbaar",
        className: "w-[150px]",
      },
      {
        accessorKey: "label",
        header: () => "Label",
        cell: (info) => (
          <span className="text-sm  p-1 px-2 text-yellow-700 bg-yellow-400 transition font-bold rounded-full">
            {DOCUMENT_LABELS[info.getValue()] || "-"}
          </span>
        ),
        className: "w-[250px]",
      },
      {
        accessorKey: "uploaded_at",
        header: () => "Geüpload Op",
        cell: (info) => dayjs(info.getValue()).format("DD MMM, YYYY") || "Niet Beschikbaar",
      },
      {
        accessorKey: "documents",
        header: () => "",
        cell: (info) => (
          <a
            href={info.getValue()}
            className="w-[30%] text-sm min-w-[120px] p-2 px-3 text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
            style={{ textWrap: "nowrap" }}
          >
            Downloaden
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
            className="w-[30%] text-sm min-w-[120px] p-2 px-3 text-white transition border rounded-lg cursor-pointer border-danger bg-danger hover:bg-opacity-90"
            style={{ textWrap: "nowrap" }}
          >
            Verwijderen
          </a>
        ),
      },
    ];
  }, []);

  const TOTAL_REQUIRED_DOCUMENTS = Object.keys(DOCUMENT_LABELS).length - 1;

  let ALREADY_UPLOADED_DOCUMENTS = [];
  let NOT_UPLOADED_DOCUMENTS = [];

  if (!isListLoading && data !== undefined && data?.results !== undefined) {
    ALREADY_UPLOADED_DOCUMENTS = data?.results.map((doc) => doc.label);
    let JUST_DOCUMENT_LABEL_OPTIONS = DOCUMENT_LABEL_OPTIONS.filter(
      (option) => option.value !== ""
    ); // remove the select option
    NOT_UPLOADED_DOCUMENTS = JUST_DOCUMENT_LABEL_OPTIONS.filter(
      (option) => !ALREADY_UPLOADED_DOCUMENTS.includes(option.value) && option.value != "other"
    );
  }

  return (
    <>
      <ConfirmationModal
        title="Bevestiging Verwijderen"
        message="Weet u zeker dat u dit document wilt verwijderen?"
        buttonMessage="Verwijderen"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        isLoading={isDeleteLoading}
        action={() => {
          onSubmit(documentId);
        }}
      />

      <Panel
        title={`Documentenlijst (${data?.results.length}/${TOTAL_REQUIRED_DOCUMENTS})`}
        sideActions={
          <LinkButton
            text={
              NOT_UPLOADED_DOCUMENTS.length
                ? `Moet ${NOT_UPLOADED_DOCUMENTS.length} extra documenten toevoegen`
                : "Upload een Nieuw Document"
            }
            href={`/clients/${clientId}/document/new`}
            className={NOT_UPLOADED_DOCUMENTS.length && "bg-red-600"}
          />
        }
      >
        {isListLoading && <div className="p-4 sm:p-6 xl:p-7.5">Loading...</div>}
        {data && (
          <>
            {NOT_UPLOADED_DOCUMENTS.length > 0 && (
              <div className="p-5 bg-c_red text-white font-bold rounded-lg m-5">
                Zorg ervoor dat u de rest van de documenttypen uploadt:
                <ul>
                  {NOT_UPLOADED_DOCUMENTS.map((doc) => (
                    <li>- {doc.label}</li>
                  ))}
                </ul>
              </div>
            )}
            <PaginatedTable
              data={data}
              columns={columnDef}
              page={pagination.page ?? 1}
              isFetching={isFetching}
              onPageChange={(page) => pagination.setPage(page)}
            />
          </>
        )}
        {isError && (
          <p role="alert" className="text-red-600">
            Er is een fout opgetreden.
          </p>
        )}
      </Panel>
    </>
  );
};

export default DocumentsPage;
