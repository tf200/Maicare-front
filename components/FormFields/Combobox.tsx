import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { Combobox } from "@headlessui/react";
import { BaseObject } from "@/types/base-object";
import { useField } from "formik";
import { ComboboxOption } from "@/types/selection-option";

type Props<T extends BaseObject> = InputHTMLAttributes<HTMLInputElement> & {
  options: ComboboxOption<T>[];
  handleQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  renderOption?: (option: ComboboxOption<T>) => React.ReactNode;
  selectedOptions: T[];
  label: string;
};

function FormikCombobox<T extends BaseObject>({
  className,
  label,
  handleQueryChange,
  options,
  renderOption,
  selectedOptions,
  ...inputProps
}: Props<T>) {
  const [fieldProps, metaProps, helpers] = useField<T[]>({
    name: inputProps.name,
    id: inputProps.id,
  });

  return (
    <Combobox
      as="section"
      className={className}
      onChange={(values: T[]) => {
        helpers.setValue(values);
      }}
      onBlur={() => {
        helpers.setTouched(true);
      }}
      value={selectedOptions}
      multiple={true}
    >
      <Combobox.Label
        className="mb-2.5 block text-black dark:text-white"
        htmlFor={inputProps.id}
      >
        {label} {inputProps.required && <span className="text-meta-1">*</span>}
      </Combobox.Label>
      <Combobox.Input
        className="w-full rounded border-[1.5px] mb-2.5 border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        {...inputProps}
        onChange={handleQueryChange}
      />
      <Combobox.Options className="shadow bg-white dark:bg-form-input z-40 left-0 rounded max-h-select overflow-y-auto flex flex-col w-full">
        {options.map((option) => (
          <Combobox.Option
            className="cursor-pointer border-stroke border-b last:border-b-0 dark:border-form-strokedark leading-6 p-3 pl-3 flex items-center ui-disabled:bg-whiter ui-disabled:text-graydark dark:ui-disabled:form-strokedark ui-active:bg-primary ui-active:text-white"
            key={option.value.id}
            value={option.value}
            disabled={fieldProps.value?.some((t) => t === option.value)}
          >
            {renderOption ? renderOption(option) : option.label}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}

export default FormikCombobox;
