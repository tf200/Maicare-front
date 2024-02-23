import React, { FunctionComponent, useMemo } from "react";
import { AttachmentItem } from "@/types/appointments/appointment-res-dto";
import XMarkIcon from "@/components/icons/XMarkIcon";
import { useField } from "formik";

type Props = {
  alreadyUploadedFiles?: AttachmentItem[];
  name: string;
  id: string;
};

const FilesDeleter: FunctionComponent<Props> = ({
  alreadyUploadedFiles,
  name,
  id,
}) => {
  const [fieldProps, metaData, helpers] = useField<string[]>({
    id,
    name,
  });

  const remainingFiles = useMemo(() => {
    if (!alreadyUploadedFiles) return [];
    return alreadyUploadedFiles.filter(
      (file) => !fieldProps.value.includes(file.id)
    );
  }, [fieldProps.value]);

  return remainingFiles.map((file) => (
    <UploadedFile
      key={file.id}
      file={file}
      onRemove={() => {
        helpers.setValue([...fieldProps.value, file.id]);
      }}
    />
  ));
};

export default FilesDeleter;

const UploadedFile: FunctionComponent<{
  file: AttachmentItem;
  onRemove: (id: string) => void;
}> = ({ file, onRemove }) => {
  return (
    <div className="mt-4.5 border border-stroke bg-white py-3 px-4 dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between">
        <div>{file.name}</div>
        <button
          onClick={() => {
            onRemove(file.id);
          }}
        >
          <XMarkIcon className="w-5 h-5 stroke-1.5" />
        </button>
      </div>
    </div>
  );
};
