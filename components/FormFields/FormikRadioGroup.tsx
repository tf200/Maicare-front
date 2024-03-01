import React, { FunctionComponent } from "react";
import { Field, Form } from "formik";
import { SelectionOption } from "@/types/selection-option";
import clsx from "clsx";

type Props = {
  picked: SelectionOption["value"];
  options: SelectionOption[];
  id: string;
  label?: string;
  name: string;
};

const FormikRadioGroup: FunctionComponent<Props> = ({
  id,
  picked,
  options,
  label,
  name,
}) => {
  return (
    <Form>
      <div id={id} className="mb-2.5">
        {label}
      </div>
      <div
        role="group"
        className="flex items-center gap-5.5"
        aria-labelledby={id}
      >
        {options.map((option) => {
          return (
            <label
              key={option.value}
              className="relative flex cursor-pointer select-none items-center gap-2 text-sm font-medium text-black dark:text-white"
            >
              <Field
                className="sr-only"
                type="radio"
                name={name}
                value={option.value}
              />
              <span
                className={clsx(
                  "flex h-5 w-5 items-center justify-center rounded-full border border-primary",
                  picked === option.value ? "border-primary" : "border-body"
                )}
              >
                <span
                  className={clsx(
                    "h-2.5 w-2.5 rounded-full bg-primary flex",
                    picked === option.value ? "flex" : "hidden"
                  )}
                />
              </span>
              <span
                className={clsx({
                  "font-bold": picked === option.value,
                })}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </Form>
  );
};

export default FormikRadioGroup;
