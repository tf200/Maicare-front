import React, {
  FunctionComponent,
  InputHTMLAttributes,
  ReactNode,
} from "react";

type InputFieldType = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const InputFieldThin: FunctionComponent<InputFieldType> = ({
  label,
  className,
  id,
  required,
  error,
  ...props
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2.5 block text-black dark:text-white">
        {label} {required && <span className="text-meta-1">*</span>}
      </label>
      <input
        {...props}
        id={id}
        required={required}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      />
      {error && (
        <p role="alert" className="text-red pt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputFieldThin;
