import React, {
  ChangeEvent,
  FunctionComponent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
} from "react";
import { useField } from "formik";
import XMarkIcon from "@/components/icons/XMarkIcon";
import UploadIcon from "@/components/svg/UploadIcon";
import LoadingCircle from "@/components/icons/LoadingCircle";
import {
  UploadEndpointType,
  useUploadFile,
} from "@/utils/attachments/uploadFile";
import Button from "@/components/buttons/Button";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder?: string;
  error?: string;
  endpoint?: UploadEndpointType;
};

const FilesUploader: FunctionComponent<Props> = ({
  label,
  endpoint,
  ...props
}) => {
  const [_i, _m, helpers] = useField<string[]>({
    name: props.name,
    id: props.id,
    type: "file",
  });
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = React.useState<string[]>([]);
  useEffect(() => {
    helpers.setValue(uploadedFiles);
  }, [uploadedFiles]);
  const selectFiles = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.currentTarget.files;
      setSelectedFiles((selected) => [...selected, ...Array.from(files)]);
    },
    [setSelectedFiles]
  );
  return (
    <div>
      <label
        htmlFor={props.id}
        className="mb-2.5 block text-black dark:text-white"
      >
        {label} {props.required && <span className="text-meta-1">*</span>}
      </label>
      <div>
        <div
          id="FileUpload"
          className="relative block w-full appearance-none rounded-sm border border-dashed border-stroke bg-white py-4 px-4 dark:border-strokedark dark:bg-boxdark sm:py-14"
        >
          <input
            {...props}
            onChange={selectFiles}
            type="file"
            className="absolute inset-0 z-50 m-0 h-full w-full p-0 opacity-0 outline-none"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <span className="flex h-11.5 w-11.5 items-center justify-center rounded-full border border-stroke bg-primary/5 dark:border-strokedark">
              <UploadIcon />
            </span>
            <p className="text-xs">
              Klik om te <span className="text-primary">uploaden</span> of{" "}
              <span className="text-primary">sleep en laat vallen</span>
            </p>
          </div>
        </div>

        {selectedFiles.map((file, index) => (
          <FileUploader
            key={index}
            file={file}
            endpoint={endpoint}
            onUploaded={(id) => {
              setUploadedFiles((files) => [...files, id]);
            }}
            onRemove={(id) => {
              setUploadedFiles((files) => files.filter((fId) => fId !== id));
              setSelectedFiles((files) => files.filter((f) => f !== file));
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FilesUploader;

const FileUploader: FunctionComponent<{
  file: File;
  onUploaded: (id: string) => void;
  onRemove: (id?: string) => void;
  endpoint?: UploadEndpointType;
}> = ({ file, onRemove, onUploaded, endpoint }) => {
  const {
    mutate: upload,
    isLoading,
    isSuccess,
    isError,
  } = useUploadFile(endpoint);
  const [fileId, setFileId] = React.useState<string | null>(null);
  const uploadFile = useCallback(() => {
    upload(file, {
      onSuccess: (data) => {
        setFileId(data.id);
        onUploaded(data.id);
      },
    });
  }, [upload, file, setFileId, onUploaded]);
  useEffect(() => {
    uploadFile();
  }, []);

  return (
    <div className="mt-4.5 border border-stroke bg-white py-3 px-4 dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center">
        <div>{file.name}</div>
        {isLoading && (
          <div className="animate-spin ml-auto">
            <LoadingCircle />
          </div>
        )}
        {isSuccess && (
          <div className="ml-auto mr-4">
            <span className="text-primary">Gelukt!</span>
          </div>
        )}
        {isError && (
          <div className="ml-auto flex items-center">
            <span className="text-danger">Mislukt</span>
            <Button className="py-2 px-5 mx-3" onClick={uploadFile}>
              Opnieuw proberen
            </Button>
          </div>
        )}
        {!isLoading && (
          <button
            onClick={() => {
              onRemove?.(fileId);
            }}
          >
            <XMarkIcon className="w-5 h-5 stroke-1.5" />
          </button>
        )}
      </div>
    </div>
  );
};
