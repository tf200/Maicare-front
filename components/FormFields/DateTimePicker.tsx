import React, { FunctionComponent } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { nl } from "date-fns/locale";
registerLocale("nl", nl);
import { Formik, useField } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";
import { useModal } from "@/components/providers/ModalProvider";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import MultipleTimePicker from "@/components/FormFields/MultipleTimePicker";
import Button from "@/components/buttons/Button";
import FormikCheckboxItem from "@/components/FormFields/FormikCheckboxItem";
import * as Yup from "yup";

const DateTimePicker: FunctionComponent<{
  name: string;
  label: string;
  minDate?: Date;
  maxDate?: Date;
  required?: boolean;
  error?: any;
}> = (props) => {
  const [inputProps, metaProps, helperProps] = useField<DateTimes>({
    name: props.name,
  });
  const { open } = useModal(TimesModal);
  return (
    <div className="mb-6">
      <div className="mb-2.5 block text-black dark:text-white">
        {props.label} {props.required && <span className="text-meta-1">*</span>}
      </div>
      <DatePicker
        onChange={async (date) => {
          await helperProps.setTouched(true);
          open({
            selected: inputProps.value.some(
              ({ date: d }) => d === date.toISOString()
            ),
            times: inputProps.value.find(
              ({ date: d }) => d === date.toISOString()
            )?.times,
            onSubmit: ({ times, selected }) => {
              if (
                selected &&
                inputProps.value.find((d) => d.date === date.toISOString())
              ) {
                helperProps.setValue(
                  inputProps.value.map((d) =>
                    d.date === date.toISOString() ? { date: d.date, times } : d
                  )
                );
              } else if (selected) {
                helperProps.setValue([
                  ...inputProps.value,
                  { date: date.toISOString(), times },
                ]);
              } else {
                helperProps.setValue(
                  inputProps.value.filter((d) => d.date !== date.toISOString())
                );
              }
            },
          });
        }}
        inline={true}
        required={props.required}
        locale="nl"
        minDate={props.minDate}
        disabledKeyboardNavigation={true}
        maxDate={props.maxDate}
        dayClassName={(day) => {
          if (inputProps.value.some(({ date }) => date === day.toISOString())) {
            return "picked-date";
          }
          return "";
        }}
      />
      {props.error && (
        <p role="alert" className="pt-1 text-red">
          {props.error}
        </p>
      )}
    </div>
  );
};

export default DateTimePicker;

const validationSchema = Yup.object().shape({
  times: Yup.array()
    .min(1, "Voeg minimaal 1 tijd toe")
    .test("when-selected", (value, context) => {
      return context.parent.selected ? value.length > 0 : true;
    })
    .test("valid-time", "Ongeldige tijd", (value) => {
      return !value.some((time) => !/^\d{2}:\d{2}$/.test(time));
    })
    .test("unique-time", "Dubbele tijd", (value) => {
      return new Set(value).size === value.length;
    }),
  selected: Yup.boolean(),
});

const TimesModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...rest
}) => {
  return (
    <FormModal {...rest} title={"Selecteer tijden"}>
      <Formik
        initialValues={{
          times: additionalProps.times ?? [],
          selected: additionalProps.selected ?? false,
        }}
        onSubmit={(values) => {
          additionalProps.onSubmit(values);
          rest.onClose();
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, values, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <FormikCheckboxItem
                label={"Selecteer deze dag"}
                id={"selected"}
                name={"selected"}
              />
            </div>
            <div className="mb-6">
              {values.selected && (
                <MultipleTimePicker
                  name={"times"}
                  label={"Tijden"}
                  required={true}
                  error={touched.times && errors.times}
                />
              )}
            </div>
            <Button type="submit">Opslaan</Button>
          </form>
        )}
      </Formik>
    </FormModal>
  );
};
