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
  subject: "",
  from: "",
  to: "",
  description: "",
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
}) => {
  const { mutate: createAppointment } = useCreateAppointment();
  const formik = useFormik({
    initialValues,
    onSubmit: (data) => {
      createAppointment(data, {
        onSuccess: onSuccessfulSubmit,
      });
    },
  });
  const { handleChange, values, handleBlur, handleSubmit } = formik;
  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        {/* Subject */}
        <InputField
          label={"Onderwerp"}
          id={"subject"}
          name={"subject"}
          className="mb-5"
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder={"Geef het onderwerp op"}
        />
        <div className="flex gap-4 mb-5">
          {/* From date time */}
          <InputField
            label={"Van datum tijd"}
            id={"from"}
            name={"from"}
            type={"datetime-local"}
            className="grow"
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {/* To date time */}
          <InputField
            label={"Tot datum tijd"}
            id={"to"}
            name={"to"}
            type={"datetime-local"}
            className="grow"
            onChange={handleChange}
            onBlur={handleBlur}
            required
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
