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
        header: () => "Bestandsnaam",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "file_size",
        header: () => "Bestandsgrootte",
        cell: (info) =>
          bytesToSize(parseInt(info.getValue())) || "Niet Beschikbaar",
      },
      {
        accessorKey: "uploaded_at",
        header: () => "Geüpload Op",
        cell: (info) =>
          dayjs(info.getValue()).format("DD MMM, YYYY") || "Niet Beschikbaar",
      },
      {
        accessorKey: "documents",
        header: () => "",
        cell: (info) => (
          <a
            href={info.getValue()}
            className="w-[30%] text-sm min-w-[120px] p-2 px-3 text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
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
          >
            Verwijderen
          </a>
        ),
      },
    ];
  }, []);

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
        title={`Documentenlijst ${data?.results.length}/4`}
        sideActions={
          <LinkButton
            text={data?.results.length < 4 ? `Moet ${4 - data?.results.length} extra documenten toevoegen` : "Upload een Nieuw Document"}
            href={`/clients/${clientId}/document/new`}
            className={data?.results.length < 4 && "bg-red"}
          />
        }
      >
        {isListLoading && <div className="p-4 sm:p-6 xl:p-7.5">Loading...</div>}
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
            Er is een fout opgetreden.
          </p>
        )}
      </Panel>
    </>
  );
};

export default DocumentsPage;
