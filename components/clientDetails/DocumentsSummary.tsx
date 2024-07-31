"use client";

import React, { FunctionComponent } from "react";
import { useDocumentList } from "@/utils/document/getDocumentList";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import dayjs from "dayjs";
import "dayjs/locale/en";
import bytesToSize from "@/hooks/useSizeConverter";
import { DOCUMENT_LABELS } from "@/consts";

type Props = {
  clientId: number;
};

const DocumentsSummary: FunctionComponent<Props> = ({ clientId }) => {
  const { data, isLoading, isError } = useDocumentList(clientId.toString());
  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-red-600">Een fout heeft ons verhinderd gegevens te laden.</div>;
  if (!data) return <div>Geen gegevens opgehaald.</div>;
  if (data.results?.length === 0) return <div>Geen documenten gevonden</div>;
  return (
    <ul className="flex flex-col gap-2">
      {data.results?.map((document) => {
        return (
          <li
            key={document.id}
            className="grid grid-cols-3 hover:bg-gray-3 dark:hover:bg-slate-700 p-4 cursor-pointer rounded-xl"
          >
            <DetailCell
              className="flex items-center"
              ignoreIfEmpty={true}
              label={document.original_filename}
              value=""
            />
            <DetailCell
              className="flex items-center"
              ignoreIfEmpty={true}
              label={bytesToSize(document.file_size)}
              value=""
            />
            <DetailCell
              className="flex items-center"
              ignoreIfEmpty={true}
              label={
                <span className="text-sm  p-1 px-2 text-yellow-700 bg-yellow-400 transition font-bold rounded-full">
                  {DOCUMENT_LABELS[document.label] || "-"}
                </span>
              }
              value=""
            />
            <DetailCell
              className="flex items-center"
              ignoreIfEmpty={true}
              label={dayjs(document.uploaded_at).format("DD MMM, YYYY")}
              value=""
            />
          </li>
        );
      })}
    </ul>
  );
};

export default DocumentsSummary;
