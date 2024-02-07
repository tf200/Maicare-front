import React, { FunctionComponent, SelectHTMLAttributes } from "react";
import { SelectionOption } from "@/types/selection-option";
import ChevronDown from "@/components/icons/ChevronDown";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectionOption[];
  error?: string;
};

const Select: FunctionComponent<SelectProps> = ({
  options,
  label,
  id,
  className,
  required,
  error,
  ...props
}) => {
  return (
    <div className={className}>
      <label className="mb-2.5 block text-black dark:text-white" htmlFor={id}>
        {label} {required && <span className="text-meta-1">*</span>}
      </label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          id={id}
          required={required}
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          {...props}
        >
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2 pointer-events-none">
          <ChevronDown />
        </span>
      </div>
      {error && (
        <p role="alert" className="text-red pt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
