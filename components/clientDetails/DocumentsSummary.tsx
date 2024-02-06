"use client";

import React, { FunctionComponent } from "react";
import { useDocumentList } from "@/utils/document/getDocumentList";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import "dayjs/locale/en";
import bytesToSize from "@/hooks/useSizeConverter";

type Props = {
  clientId: number;
};

const DocumentsSummary: FunctionComponent<Props> = ({ clientId }) => {
  const { data, isLoading } = useDocumentList(clientId.toString());
  const router = useRouter();
  if (isLoading) return <Loader />;
  if (data.results?.length === 0) return <div>No documents found</div>;
  return (
    <ul className="flex flex-col gap-2">
      {data.results?.map((document) => {
        return (
          <li
            key={document.id}
            className="grid grid-cols-3 hover:bg-gray-3 p-2 cursor-pointer rounded-xl"
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
