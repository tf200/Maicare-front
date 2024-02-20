import React, { FunctionComponent, InputHTMLAttributes } from "react";
import { useField } from "formik";
import XMarkIcon from "@/components/icons/XMarkIcon";
import UploadIcon from "@/components/svg/UploadIcon";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder?: string;
  error?: string;
};

const FileInput: FunctionComponent<Props> = ({ label, ...props }) => {
  const [inputProps, _, helpers] = useField({
    name: props.name,
    id: props.id,
    type: "file",
  });
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
              helpers.setValue([...inputProps.value, ...Array.from(files)]);
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

        {inputProps.value?.map((file) => (
          <div className="mt-4.5 border border-stroke bg-white py-3 px-4 dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between">
              <span>{file.name}</span>

              <button
                onClick={() => {
                  helpers.setValue(
                    inputProps.value.filter((value) => value !== file)
                  );
                }}
              >
                <XMarkIcon className="w-5 h-5 stroke-1.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileInput;
