import React, { FunctionComponent, SelectHTMLAttributes } from "react";
import { SelectionOption } from "@/types/selection-option";
import ChevronDown from "@/components/icons/ChevronDown";
import { cn } from "@/utils/cn";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectionOption[];
  error?: any;
};

const Select: FunctionComponent<SelectProps> = ({
  options,
  id,
  className,
  required,
  error,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative z-20 bg-transparent dark:bg-form-input",
        className
      )}
    >
      <select
        id={id}
        required={required}
        className="relative bg-gray dark:bg-graydark dark:text-white z-20 w-full appearance-none rounded-0 border border-stroke py-1 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary"
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
        <ChevronDown className="w-4 h-4" />
      </span>
    </div>
  );
};

export default Select;
