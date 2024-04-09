import React, { FunctionComponent } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { nl } from "date-fns/locale";
registerLocale("nl", nl);
import { useField } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";

const MultipleDatePicker: FunctionComponent<{
  name: string;
  label: string;
  required?: boolean;
}> = (props) => {
  const [inputProps, metaProps, helperProps] = useField<Date[]>({
    name: props.name,
  });
  return (
    <div className="mb-6">
      <div className="mb-2.5 block text-black dark:text-white">
        {props.label} {props.required && <span className="text-meta-1">*</span>}
      </div>
      <DatePicker
        onChange={(values) => {
          helperProps.setValue(values);
        }}
        selectsMultiple={true}
        inline={true}
        selectedDates={inputProps.value}
        required={props.required}
        locale="nl"
      />
    </div>
  );
};

export default MultipleDatePicker;
