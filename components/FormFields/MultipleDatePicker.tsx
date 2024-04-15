import React, { FunctionComponent } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { nl } from "date-fns/locale";
import { useField } from "formik";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("nl", nl);
import "./date-picker.css";

const MultipleDatePicker: FunctionComponent<{
  name: string;
  label: string;
  minDate?: Date;
  maxDate?: Date;
  required?: boolean;
  error?: any;
}> = (props) => {
  const [inputProps, metaProps, helperProps] = useField<string[]>({
    name: props.name,
  });
  return (
    <div className="mb-6">
      <div className="mb-2.5 block text-black dark:text-white">
        {props.label} {props.required && <span className="text-meta-1">*</span>}
      </div>
      <DatePicker
        onChange={async (values) => {
          await helperProps.setTouched(true);
          await helperProps.setValue(values.map((date) => date.toISOString()));
        }}
        selectsMultiple={true}
        inline={true}
        selectedDates={inputProps.value.map((date) => new Date(date))}
        required={props.required}
        locale="nl"
        minDate={props.minDate}
        maxDate={props.maxDate}
      />
      {props.error && (
        <p role="alert" className="pt-1 text-red">
          {props.error}
        </p>
      )}
    </div>
  );
};

export default MultipleDatePicker;
