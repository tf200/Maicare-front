import React, { FunctionComponent, SelectHTMLAttributes } from "react";
import { SelectionOption } from "@/types/selection-option";
import ChevronDown from "@/components/icons/ChevronDown";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectionOption[];
  error?: any;
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
      <label className="mb-2.5 block text-c_black dark:text-white" htmlFor={id}>
        {label} {required && <span className="text-meta-1">*</span>}
      </label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          id={id}
          required={required}
          className="relative bg-white z-20 w-full appearance-none rounded-lg border border-stroke bg-transparent py-2 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
        <span className="absolute bg-white dark:bg-form-input top-1/2 right-4 z-30 -translate-y-1/2 pointer-events-none">
          <ChevronDown />
        </span>
      </div>
      {error && (
        <p role="alert" className="text-c_red pt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
