import React from "react";
import { Combobox } from "@headlessui/react";
import { ComboboxOption } from "@/types/selection-option";
import { BaseObject } from "@/types/base-object";
import MagnifierIcon from "@/components/icons/MagnifierIcon";

type Props<TData extends BaseObject> =
  React.InputHTMLAttributes<HTMLInputElement> & {
    options: ComboboxOption<TData>[];
    handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    renderOption?: (option: ComboboxOption<TData>) => React.ReactNode;
    className?: string;
    onSelectItem?: (value: TData) => void;
    label?: string;
    onBlur?: () => void;
    selectedIDs?: TData["id"][];
  };

function SearchDropdown<TData extends BaseObject>({
  options,
  handleQueryChange,
  renderOption,
  className,
  onSelectItem,
  label,
  onBlur,
  selectedIDs,
  ...inputProps
}: Props<TData>) {
  return (
    <Combobox
      as="section"
      className={className}
      onChange={onSelectItem}
      onBlur={onBlur}
    >
      {label && (
        <Combobox.Label
          className="mb-2.5 block text-black dark:text-white"
          htmlFor={inputProps.id}
        >
          {label}{" "}
          {inputProps.required && <span className="text-meta-1">*</span>}
        </Combobox.Label>
      )}
      <div className="relative">
        <Combobox.Input
          className="w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
          {...inputProps}
          onChange={handleQueryChange}
        />
        <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none">
          <MagnifierIcon />
        </div>
      </div>
      <Combobox.Options className="shadow bg-white dark:bg-form-input z-40 left-0 rounded max-h-select overflow-y-auto flex flex-col w-full">
        {options.map((option) => (
          <Combobox.Option
            className="cursor-pointer border-stroke border-b last:border-b-0 dark:border-form-strokedark leading-6 p-3 pl-3 flex items-center ui-disabled:bg-whiter ui-disabled:text-graydark dark:ui-disabled:form-strokedark ui-active:bg-primary ui-active:text-white"
            key={option.value.id}
            value={option.value}
            disabled={selectedIDs?.some((t) => t === option.value.id)}
          >
            {renderOption ? renderOption(option) : option.label}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}

export default SearchDropdown;
