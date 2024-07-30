import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { useField } from "formik";
import { Combobox } from "@headlessui/react";
import { ComboboxOption } from "@/types/selection-option";
import { BaseObject } from "@/types/base-object";
import XMarkIcon from "@/components/icons/XMarkIcon";
import clsx from "clsx";

type Props<T extends BaseObject> = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  options: ComboboxOption<T>[];
  handleQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  renderOption?: (option: ComboboxOption<T>) => React.ReactNode;
  renderTag: (tag: T["id"]) => React.ReactNode;
  tagPropsGetter?: (tag: T["id"]) => any;
};

function FormikTagInput<T extends BaseObject>({
  renderOption,
  handleQueryChange,
  renderTag,
  tagPropsGetter,
  options,
  className,
  ...inputProps
}: Props<T>) {
  const [fieldProps, metaProps, helpers] = useField<T["id"][]>({
    name: inputProps.name,
    id: inputProps.id,
  });

  return (
    <Combobox
      as="section"
      className={className}
      onChange={(value: T) => {
        helpers.setValue([...fieldProps.value, value.id]);
      }}
      onBlur={() => {
        helpers.setTouched(true);
      }}
    >
      <Combobox.Label
        className="mb-2.5 block text-slate-800  dark:text-white"
        htmlFor={inputProps.id}
      >
        {inputProps.label} {inputProps.required && <span className="text-meta-1">*</span>}
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
            disabled={fieldProps.value?.some((t) => t === option.value.id)}
          >
            {renderOption ? renderOption(option) : option.label}
          </Combobox.Option>
        ))}
      </Combobox.Options>
      <ul className="flex flex-wrap gap-y-0 gap-x-2">
        {fieldProps.value?.map((tagId) => (
          <li key={tagId}>
            <Tag
              id={tagId}
              renderTag={renderTag}
              onClose={() => {
                helpers.setValue(fieldProps.value.filter((t) => t !== tagId));
              }}
              propsGetter={tagPropsGetter}
            />
          </li>
        ))}
      </ul>
      {metaProps.touched && metaProps.error && (
        <p role="alert" className="pt-1 text-red">
          {metaProps.error}
        </p>
      )}
    </Combobox>
  );
}

export default FormikTagInput;

type TagProps<T = BaseObject["id"]> = {
  id: T;
  renderTag: (tag: T) => React.ReactNode;
  propsGetter?: (tag: T) => any;
  onClose: (tag: T) => void;
};

function Tag<T>({ id, renderTag, propsGetter, onClose }: TagProps<T>) {
  const props = propsGetter ? propsGetter(id) : {};
  return (
    <div
      className={clsx(
        props.className,
        "my-1.5 gap-2 flex items-center justify-center rounded border-[.5px] border-stroke bg-white px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
      )}
    >
      <span>{renderTag(id)}</span>
      <button
        type="button"
        onClick={() => {
          onClose(id);
        }}
      >
        <XMarkIcon className="w-3 h-3" />
      </button>
    </div>
  );
}
