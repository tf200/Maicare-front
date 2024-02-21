import React, { FunctionComponent } from "react";
import InputField from "@/components/FormFields/InputField";
import { FormikProvider, useFormik } from "formik";
import Textarea from "@/components/FormFields/Textarea";
import ModalActionButton from "@/components/buttons/ModalActionButton";
import FileInput from "@/components/FormFields/FileInput";
import { AppointmentFormType } from "@/types/appointments/appointment-form-type";
import { AppointmentResDto } from "@/types/appointments/appointment-res-dto";
import { useCreateAppointment } from "@/utils/appointments/createAppointment";

const initialValues: AppointmentFormType = {
  title: "",
  start_time: "",
  end_time: "",
  description: "",
  appointment_type: "meeting",
  attachments: [],
};

type Props = {
  initialData?: Partial<AppointmentResDto>;
  onSuccessfulSubmit?: () => void;
  onCancel?: () => void;
};

const AppointmentForm: FunctionComponent<Props> = ({
  onSuccessfulSubmit,
  onCancel,
  initialData,
}) => {
  const { mutate: createAppointment } = useCreateAppointment();
  const formik = useFormik({
    initialValues: { ...initialValues, ...initialData },
    onSubmit: (data) => {
      createAppointment(
        {
          ...data,
          start_time: data.start_time,
          end_time: data.end_time,
        },
        {
          onSuccess: onSuccessfulSubmit,
        }
      );
    },
  });
  const { handleChange, values, handleBlur, handleSubmit } = formik;
  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        {/* Subject */}
        <InputField
          label={"Onderwerp"}
          id={"title"}
          name={"title"}
          className="mb-5"
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder={"Geef het onderwerp op"}
          value={values.title}
        />
        <div className="flex gap-4 mb-5">
          {/* From date time */}
          <InputField
            label={"Van datum tijd"}
            id={"start_time"}
            name={"start_time"}
            type={"datetime-local"}
            className="grow"
            onChange={handleChange}
            onBlur={handleBlur}
            required
            value={values.start_time}
          />
          {/* To date time */}
          <InputField
            label={"Tot datum tijd"}
            id={"end_time"}
            name={"end_time"}
            type={"datetime-local"}
            className="grow"
            onChange={handleChange}
            onBlur={handleBlur}
            required
            defaultValue={values.end_time}
          />
        </div>
        {/* Description */}
        <Textarea
          label={"Beschrijving"}
          id={"description"}
          name={"description"}
          className="mb-5"
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder={"Geef een beschrijving op"}
          rows={6}
          defaultValue={values.description}
        />
        {/* Attachments */}
        <FileInput
          accept={".pdf,.docx,.txt"}
          label={"Bijlagen"}
          id={"attachments"}
          name={"attachments"}
          className="mb-6"
          onChange={handleChange}
          onBlur={handleBlur}
          multiple={true}
        />
        {/* Call to actions */}
        <div className="flex justify-center gap-4">
          {/* Cancel */}
          <ModalActionButton
            actionType="CANCEL-2"
            className="grow"
            onClick={onCancel}
          >
            Annuleren
          </ModalActionButton>
          {/*Submit */}
          <ModalActionButton
            type="submit"
            actionType="CONFIRM"
            className="grow"
          >
            + Afspraak maken
          </ModalActionButton>
        </div>
      </form>
    </FormikProvider>
  );
};

export default AppointmentForm;
