import { useEffect, useState } from "react";
import CheckBoxInputFieldThin from "./CheckBoxInputThin";
import { useField } from "formik";

type MultiCheckBoxInputFieldType = {
  label: string;
  selected?: (number | string)[];
  options: string[];
  name: string;
};

export function MultiCheckBoxInputField({
  label,
  selected,
  options,
  name,
}: MultiCheckBoxInputFieldType) {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const [selectedOptions, setSelectedOptions] = useState(
    selected && Array.isArray(field.value) && ["string", "integer"].includes(typeof field.value)
      ? field.value
      : []
  );

  useEffect(() => {
    // set the values selectedOptions to the formik field
    setValue(selectedOptions);
  }, [selectedOptions]);

  return (
    <>
      <label className="mb-4 block text-black dark:text-white">{label}</label>
      {/* {meta.error && meta.touched && <p role="alert" className="text-red pt-1">{meta.error}</p>} */}
      {options.map((option_label, i) => (
        <CheckBoxInputFieldThin
          key={i}
          label={option_label}
          className="mb-3"
          name={`checkbox-${i}`}
          id={`checkbox-${i}`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.checked && !selectedOptions.includes(i)) {
              setSelectedOptions([...selectedOptions, i]);
            } else {
              setSelectedOptions(selectedOptions.filter((option) => option !== i));
            }
          }}
          onBlur={() => {}}
          checked={selectedOptions.includes(i)}
        />
      ))}
    </>
  );
}
