import React, { FunctionComponent } from "react";
import { AttachmentItem } from "@/types/appointments/appointment-res-dto";
import Link from "next/link";
import DownloadIcon from "@/components/icons/DownloadIcon";
import { AGREEMENT_FILES_TAGS_RECORD } from "@/consts";
import StatusBadge from "@/components/StatusBadge";

const DownloadFile: FunctionComponent<{
  file: AttachmentItem;
}> = ({ file }) => {
  return (
    <Link
      href={file.file || file.attachment || file.attachement || ""}
      target={"_blank"}
      download
      className="flex gap-4 flex-col items-center border-1 p-4 border-stroke dark:border-strokedark rounded-md"
    >
      <DownloadIcon />
      <div className="font-bold">{file.name}</div>
      {file.tag && (
        <div className="flex">
          <StatusBadge text={AGREEMENT_FILES_TAGS_RECORD[file.tag]} type={"Info"} />
        </div>
      )}
    </Link>
  );
};

export default DownloadFile;
