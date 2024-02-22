import React, {
  FunctionComponent,
  InputHTMLAttributes,
  useEffect,
} from "react";
import { useField } from "formik";
import XMarkIcon from "@/components/icons/XMarkIcon";
import UploadIcon from "@/components/svg/UploadIcon";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder?: string;
  error?: string;
};

type FileUploadResponse = {
  file: string;
  id: string;
};

async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post<FileUploadResponse>(
    "appointments/temporary-files/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

const useUploadFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      queryClient.setQueryData(["attachments", data.id], data);
    },
  });
};

const UploadingFile: FunctionComponent<{
  file: File;
  onRemove: () => void;
}> = ({ file, onRemove }) => {
  const { mutate: upload, isLoading, isSuccess } = useUploadFile();
  const [fileId, setFileId] = React.useState<string | null>(null);
  useEffect(() => {
    if (fileId) {
      return;
    }
    upload(file, {
      onSuccess: (data) => {
        setFileId(data.id);
      },
    });
  }, []);
  return (
    <div className="mt-4.5 border border-stroke bg-white py-3 px-4 dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between">
        <span>{file.name}</span>
        {isSuccess && <span className="text-primary">Uploaded</span>}
        {isLoading ? (
          "Uploading..."
        ) : (
          <button onClick={onRemove}>
            <XMarkIcon className="w-5 h-5 stroke-1.5" />
          </button>
        )}
      </div>
    </div>
  );
};

const FileUploader: FunctionComponent<Props> = ({ label, ...props }) => {
  const [inputProps, _, helpers] = useField({
    name: props.name,
    id: props.id,
    type: "file",
  });
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  return (
    <div className="mb-5">
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
            onChange={(event) => {
              const files = event.currentTarget.files;
              setSelectedFiles([...selectedFiles, ...Array.from(files)]);
            }}
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

        {selectedFiles.map((file) => (
          <UploadingFile
            key={file.name}
            file={file}
            onRemove={() => {
              const files = selectedFiles.filter((f) => f !== file);
              setSelectedFiles(files);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
