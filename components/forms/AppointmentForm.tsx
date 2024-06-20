import React, { FunctionComponent, useMemo } from "react";
import InputField from "@/components/FormFields/InputField";
import { FormikProvider, useFormik } from "formik";
import Textarea from "@/components/FormFields/Textarea";
import ModalActionButton from "@/components/buttons/ModalActionButton";
import FilesUploader from "@/components/FormFields/FilesUploader";
import { AppointmentFormType } from "@/types/appointments/appointment-form-type";
import { AppointmentResDto } from "@/types/appointments/appointment-res-dto";
import { useCreateAppointment } from "@/utils/appointments/createAppointment";
import { useUpdateAppointment } from "@/utils/appointments/updateAppointment";
import TrashIcon from "@/components/icons/TrashIcon";
import { useDeleteAppointment } from "@/utils/appointments/deleteAppointment";
import EmployeesTagInput from "@/components/FormFields/EmployeesTagInput";
import ClientsTagInput from "@/components/FormFields/ClientsTagInput";
import * as Yup from "yup";
import FilesDeleter from "@/components/FormFields/FilesDeleter";
import Select from "@/components/FormFields/Select";
import { APPOINTMENT_TYPE_ARRAY, APPOINTMENT_TYPE_OPTIONS } from "@/consts";
import FormikLocation from "@/components/FormFields/FormikLocation";

const initialValues: AppointmentFormType = {
  title: "",
  start_time: "",
  end_time: "",
  description: "",
  location: "",
  appointment_type: "meeting",
  temporary_file_ids: [],
  employees: [],
  clients: [],
};

const validationSchema: Yup.ObjectSchema<AppointmentFormType> = Yup.object().shape({
  title: Yup.string().required("Onderwerp is verplicht"),
  appointment_type: Yup.string()
    .oneOf(APPOINTMENT_TYPE_ARRAY, "Afspraak type is verplicht")
    .required("Afspraak type is verplicht"),
  start_time: Yup.string().required("Van datum tijd is verplicht"),
  end_time: Yup.string()
    .required("Tot datum tijd is verplicht")
    .test(
      "is-greater",
      "Tot datum tijd moet groter zijn dan van datum tijd",
      function (value, context) {
        const { start_time } = context.parent;
        if (start_time && value) {
          return new Date(start_time) < new Date(value);
        }
        return true;
      }
    ),
  description: Yup.string(),
  employees: Yup.array().min(1, "Minimaal 1 medewerker is verplicht"),
  clients: Yup.array(),
  temporary_file_ids: Yup.array(),
  location: Yup.string().required("Locatie is verplicht"),
});

export type AppointmentFormProps =
  | {
      initialSlot?: Pick<AppointmentResDto, "start_time" | "end_time">;
      onSuccessfulSubmit?: () => void;
      onCancel?: () => void;
      initialData?: undefined;
      mode?: "create";
    }
  | {
      onSuccessfulSubmit?: () => void;
      onCancel?: () => void;
      initialData: Partial<AppointmentResDto>;
      initialSlot?: undefined;
      mode: "edit";
    };

const AppointmentForm: FunctionComponent<AppointmentFormProps> = ({
  onSuccessfulSubmit,
  onCancel,
  initialData,
  initialSlot,
  mode = "create",
}) => {
  const { mutate: createAppointment, isLoading: isCreating } = useCreateAppointment();
  const { mutate: updateAppointment, isLoading: isUpdating } = useUpdateAppointment();
  const { mutate: deleteAppointment, isLoading: isDeleting } = useDeleteAppointment();

  const parsedInitialData = useMemo(() => {
    if (mode === "create" && initialSlot) {
      return {
        ...initialValues,
        ...initialSlot,
      };
    } else if (mode === "edit" && initialData) {
      const temp = {
        ...initialValues,
        ...initialData,
        attachment_ids_to_delete: [],
      };
      delete temp.attachments;
      return temp;
    } else {
      return initialValues;
    }
  }, [initialData, initialSlot]);

  const formik = useFormik({
    initialValues: parsedInitialData,
    validationSchema,
    onSubmit: (data) => {
      if (mode === "create") {
        createAppointment(data, {
          onSuccess: onSuccessfulSubmit,
        });
      } else if (mode === "edit") {
        updateAppointment(
          {
            ...data,
            id: initialData?.id,
          },
          {
            onSuccess: onSuccessfulSubmit,
          }
        );
      }
    },
  });
  const { handleChange, values, handleBlur, handleSubmit, dirty, touched } = formik;
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
        <div className="flex gap-4 mb-5 flex-col lg:flex-row">
          <Select
            label={"Appointment Type"}
            options={APPOINTMENT_TYPE_OPTIONS}
            id={"appointment_type"}
            name={"appointment_type"}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            value={values.appointment_type}
            error={touched.appointment_type && formik.errors.appointment_type}
            className="w-full lg:basis-1/2"
          />
          <FormikLocation required={true} className="w-full lg:basis-1/2" />
        </div>
        <div className="flex gap-4 mb-5 flex-col lg:flex-row">
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
          placeholder={"Geef een beschrijving op"}
          rows={6}
          defaultValue={values.description}
          error={touched.description && formik.errors.description}
        />
        {/* Attachments */}
        <FilesUploader
          accept={".pdf,.docx,.txt,.png"}
          label={"Bijlagen"}
          id={"temporary_file_ids"}
          name={"temporary_file_ids"}
          className="mb-6"
          onChange={handleChange}
          onBlur={handleBlur}
          multiple={true}
          endpoint="global_v2"
        />
        {mode === "edit" && initialData?.attachments && (
          <FilesDeleter
            alreadyUploadedFiles={initialData.attachments}
            name={"attachment_ids_to_delete"}
            id={"attachment_ids_to_delete"}
          />
        )}
        {/* Call to actions */}
        <div className="flex justify-center gap-4 mt-5">
          {mode === "edit" && (
            <ModalActionButton
              actionType="DANGER"
              type={"button"}
              isLoading={isDeleting}
              className="grow flex items-center gap-2 justify-center"
              loadingText={"Verwijderen..."}
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
            <ModalActionButton actionType="CANCEL-2" className="grow" onClick={onCancel}>
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
            isLoading={isCreating || isUpdating}
            loadingText={"Bezig met opslaan..."}
          >
            {mode === "create" ? "+ Afspraak maken" : "Afspraak wijzigen"}
          </ModalActionButton>
        </div>
      </form>
    </FormikProvider>
  );
};

export default AppointmentForm;
