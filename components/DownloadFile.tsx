import React, { FunctionComponent } from "react";
import { AttachmentItem } from "@/types/appointments/appointment-res-dto";
import Link from "next/link";
import DownloadIcon from "@/components/icons/DownloadIcon";

const DownloadFile: FunctionComponent<{
  file: AttachmentItem;
}> = (props) => {
  return (
    <Link
      href={
        props.file.file || props.file.attachment || props.file.attachement || ""
      }
      target={"_blank"}
      download
      className="flex flex-col items-center border-1 p-4 border-stroke dark:border-strokedark rounded-md"
    >
      <DownloadIcon />
      {props.file.name}
    </Link>
  );
};

export default DownloadFile;
