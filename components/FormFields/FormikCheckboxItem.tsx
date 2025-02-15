import React, { FunctionComponent, InputHTMLAttributes } from "react";
import CheckIcon from "@/components/icons/CheckIcon";
import clsx from "clsx";
import { Field } from "formik";
import { cn } from "@/utils/cn";

type CheckBoxPropsType = {
  label: string;
  id: string;
  value?: boolean;
  name?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormikCheckboxItem: FunctionComponent<CheckBoxPropsType> = ({
  id,
  label,
  name,
  value,
  className,
  ...props
}) => {
  return (
    <label htmlFor={id} className={cn("flex cursor-pointer", className)}>
      <div className="relative pt-0.5">
        <Field type="checkbox" name={name} id={id} className="sr-only taskCheckbox" {...props} />
        <div
          className={clsx("flex items-center justify-center w-5 h-5 mr-3 border rounded box", {
            "border-primary bg-primary dark:border-primary": value,
            "border-stroke dark:border-strokedark": !value,
          })}
        >
          <span
            className={cn("text-white dark:text-white", {
              "opacity-100": value,
              "opacity-0": !value,
            })}
          >
            <CheckIcon />
          </span>
        </div>
      </div>
      <p>{label}</p>
    </label>
  );
};

export default FormikCheckboxItem;
