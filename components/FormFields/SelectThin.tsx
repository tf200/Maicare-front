import React, { FunctionComponent, SelectHTMLAttributes } from "react";
import { SelectionOption } from "@/types/selection-option";
import ChevronDown from "@/components/icons/ChevronDown";
import { cn } from "@/utils/cn";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectionOption[];
  error?: any;
  label?: string;
};

const Select: FunctionComponent<SelectProps> = ({
  options,
  id,
  className,
  required,
  error,
  label,
  ...props
}) => {
  return (
    <label
      className={cn(
        "relative flex gap-2 bg-c_gray dark:bg-graydark dark:text-white z-20 w-full rounded-0 border border-stroke py-1 pl-5 transition focus-within:border-primary group-active:border-primary dark:border-form-strokedark dark:focus:border-primary",
        className
      )}
      htmlFor={id}
    >
      {label && (
        <div>
          <strong>{label}</strong>
        </div>
      )}
      <select
        className="bg-transparent appearance-none pr-5 flex-grow outline-none"
        id={id}
        required={required}
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
    </label>
  );
};

export default Select;
