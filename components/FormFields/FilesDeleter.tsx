import React, { FunctionComponent, useMemo } from "react";
import { AttachmentItem } from "@/types/appointments/appointment-res-dto";
import XMarkIcon from "@/components/icons/XMarkIcon";
import { useField } from "formik";
import DownloadIcon from "@/components/icons/DownloadIcon";
import Link from "next/link";
import SelectThin from "@/components/FormFields/SelectThin";
import { SelectionOption } from "@/types/selection-option";
import { useFileData, usePatchFileData } from "@/utils/attachments/uploadFile";

type Props = {
  alreadyUploadedFiles?: AttachmentItem[];
  name: string;
  id: string;
  tagOptions?: SelectionOption[];
  tagLabel?: string;
};

const FilesDeleter: FunctionComponent<Props> = ({
  alreadyUploadedFiles,
  name,
  id,
  tagLabel,
  tagOptions,
}) => {
  const [fieldProps, metaData, helpers] = useField<string[]>({
    id,
    name,
  });

  const remainingFiles = useMemo(() => {
    if (!alreadyUploadedFiles) return [];
    return alreadyUploadedFiles.filter(
      (file) => !fieldProps.value?.includes(file.id)
    );
  }, [fieldProps.value]);

  return remainingFiles.map((file) => (
    <UploadedFile
      key={file.id}
      file={file}
      onRemove={() => {
        helpers.setValue([...fieldProps.value, file.id]);
      }}
      tagOptions={tagOptions}
      tagLabel={tagLabel}
    />
  ));
};

export default FilesDeleter;

const UploadedFile: FunctionComponent<{
  file: AttachmentItem;
  onRemove: (id: string) => void;
  tagOptions?: SelectionOption[];
  tagLabel?: string;
}> = ({ file, onRemove, tagLabel, tagOptions }) => {
  const { mutate: fileUpdate } = usePatchFileData(file.id);
  const { data: fileData } = useFileData(file.id);
  return (
    <div className="mt-4.5">
      <div className="border border-stroke bg-white py-3 px-4 dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center justify-between gap-4">
          <div>{file.name}</div>

          {file.file && (
            <Link
              href={file.file}
              target={"_blank"}
              download
              className="ml-auto"
            >
              <DownloadIcon />
            </Link>
          )}
          <button
            onClick={() => {
              onRemove(file.id);
            }}
          >
            <XMarkIcon className="w-5 h-5 stroke-1.5" />
          </button>
        </div>
      </div>
      {tagOptions && (
        <SelectThin
          onChange={(e) => {
            fileUpdate({ tag: e.target.value });
          }}
          value={fileData?.tag}
          options={tagOptions}
          id={`${file.id}_tag`}
          label={tagLabel}
        />
      )}
    </div>
  );
};
