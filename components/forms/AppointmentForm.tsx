import React, { FunctionComponent } from "react";
import InputField from "@/components/FormFields/InputField";
import { FormikProvider, useFormik } from "formik";
import Textarea from "@/components/FormFields/Textarea";
import ModalActionButton from "@/components/buttons/ModalActionButton";
import FileUploader from "@/components/FormFields/FileUploader";
import { AppointmentFormType } from "@/types/appointments/appointment-form-type";
import { AppointmentResDto } from "@/types/appointments/appointment-res-dto";
import { useCreateAppointment } from "@/utils/appointments/createAppointment";
import { useUpdateAppointment } from "@/utils/appointments/updateAppointment";
import TrashIcon from "@/components/icons/TrashIcon";
import { useDeleteAppointment } from "@/utils/appointments/deleteAppointment";
import EmployeesTagInput from "@/components/FormFields/EmployeesTagInput";
import ClientsTagInput from "@/components/FormFields/ClientsTagInput";
import * as Yup from "yup";

const initialValues: AppointmentFormType = {
  title: "",
  start_time: "",
  end_time: "",
  description: "",
  appointment_type: "meeting",
  attachments: [],
  employees: [],
  clients: [],
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Onderwerp is verplicht"),
  start_time: Yup.string().required("Van datum tijd is verplicht"),
  end_time: Yup.string().required("Tot datum tijd is verplicht"),
  description: Yup.string().required("Beschrijving is verplicht"),
  employees: Yup.array().min(1, "Minimaal 1 medewerker is verplicht"),
  clients: Yup.array().min(1, "Minimaal 1 klant is verplicht"),
});

type Props = {
  initialData?: Partial<AppointmentResDto>;
  onSuccessfulSubmit?: () => void;
  onCancel?: () => void;
  mode?: "create" | "edit";
};

const AppointmentForm: FunctionComponent<Props> = ({
  onSuccessfulSubmit,
  onCancel,
  initialData,
  mode = "create",
}) => {
  const { mutate: createAppointment } = useCreateAppointment();
  const { mutate: updateAppointment } = useUpdateAppointment();
  const { mutate: deleteAppointment } = useDeleteAppointment();
  const formik = useFormik({
    initialValues: { ...initialValues, ...initialData },
    validationSchema,
    onSubmit: (data) => {
      if (mode === "create") {
        createAppointment(data, {
          onSuccess: onSuccessfulSubmit,
        });
      } else if (mode === "edit") {
        updateAppointment(data, {
          onSuccess: onSuccessfulSubmit,
        });
      }
    },
  });
  const { handleChange, values, handleBlur, handleSubmit, dirty, touched } =
    formik;
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
          error={touched.title && formik.errors.title}
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
            error={touched.start_time && formik.errors.start_time}
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
            error={touched.end_time && formik.errors.end_time}
          />
        </div>
        <EmployeesTagInput
          name={"employees"}
          label={"Employees"}
          id={"employees"}
          placeholder={"add employee..."}
          required={true}
          className="mb-5"
        />
        <ClientsTagInput
          label={"Clients"}
          id={"clients"}
          name={"clients"}
          placeholder={"add client..."}
          required={true}
          className="mb-5"
        />
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
          error={touched.description && formik.errors.description}
        />
        {/* Attachments */}
        <FileUploader
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
          {mode === "edit" && (
            <ModalActionButton
              actionType="DANGER"
              className="grow flex items-center gap-2 justify-center"
              onClick={() => {
                deleteAppointment(initialData?.id, {
                  onSuccess: onSuccessfulSubmit,
                });
              }}
            >
              {/*Delete appointment*/}
              <TrashIcon />
              <span>Afspraak verwijderen</span>
            </ModalActionButton>
          )}
          {mode === "create" && (
            <ModalActionButton
              actionType="CANCEL-2"
              className="grow"
              onClick={onCancel}
            >
              Annuleren
            </ModalActionButton>
          )}
          {/*Submit */}
          <ModalActionButton
            type="submit"
            actionType="CONFIRM"
            className="grow"
            disabled={!dirty && mode === "edit"}
            formNoValidate
          >
            {mode === "create" ? "+ Afspraak maken" : "Afspraak wijzigen"}
          </ModalActionButton>
        </div>
      </form>
    </FormikProvider>
  );
};

export default AppointmentForm;
