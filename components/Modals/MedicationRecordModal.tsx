import React, { FunctionComponent } from "react";
import FormModal from "@/components/Modals/FormModal";
import { ModalProps } from "@/types/modal-props";
import Select from "@/components/FormFields/Select";
import { MEDICATION_STATUS_OPTIONS } from "@/consts";
import { MedicationRecord } from "@/types/medication-records";
import { useFormik } from "formik";
import Button from "@/components/buttons/Button";
import Textarea from "@/components/FormFields/Textarea";
import * as Yup from "yup";
import { usePatchMedicationRecord } from "@/utils/medication-records";
import { useGetMedication } from "@/utils/medications/getMedication";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import DetailCell from "@/components/DetailCell";
import { dateFormat, fullDateTimeFormat } from "@/utils/timeFormatting";
import ProfilePicture from "@/components/ProfilePicture";
import dayjs from "dayjs";
import Loader from "@/components/common/Loader";

const validationSchema = Yup.object().shape({
  status: Yup.string().required("Dit veld is verplicht"),
  reason: Yup.string()
    .oneOf(["not_taken", "taken"])
    .when("status", {
      is: (status) => status === "not_taken",
      then: () => Yup.string().required("Dit veld is verplicht"),
    }),
});

const MedicationRecordModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...reset
}) => {
  const record: MedicationRecord = additionalProps.record;
  const { mutate: patch, isLoading } = usePatchMedicationRecord(record.id);
  const { data: medication, isLoading: isLoadingMedication } = useGetMedication(
    record?.client_medication_id
  );
  const { data: client, isLoading: isLoadingClient } = useClientDetails(
    medication?.client
  );
  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        status: "",
        reason: "",
      },
      onSubmit: (values) => {
        patch(
          {
            status: values.status as "not_taken" | "taken",
            reason: values.reason,
          },
          {
            onSuccess: () => {
              reset.onClose();
            },
          }
        );
      },
      validationSchema,
    });
  return (
    <FormModal {...reset} title="Medicatie record">
      {client && (
        <div className="flex items-center gap-4 mb-6 border border-stroke p-6 bg-white">
          <ProfilePicture profilePicture={client.profile_picture} />
          <DetailCell
            label={"Naam"}
            value={`${client.first_name} ${client.last_name}`}
          />
          <DetailCell
            label={"Geboortedatum"}
            value={
              dateFormat(client.date_of_birth) +
              " (" +
              dayjs().diff(client.date_of_birth, "year") +
              " jaar)"
            }
          />
        </div>
      )}
      {isLoadingMedication && <Loader />}
      {isLoadingClient && <Loader />}
      {medication && (
        <div className="flex gap-4 mb-6 p-6 border border-stroke bg-white">
          <DetailCell label={"Medicatie"} value={medication.name} />
          <DetailCell value={medication.dosage} label={"Dosering"} />
          <DetailCell value={fullDateTimeFormat(record.time)} label={"Tijd"} />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Select
          className="mb-6"
          required={true}
          label={"Werd de medicatie op tijd gegeven?"}
          options={MEDICATION_STATUS_OPTIONS}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.status}
          name="status"
          error={touched.status && errors.status}
        />
        {values.status === "not_taken" && (
          <Textarea
            className="mb-6"
            placeholder="Reden"
            required={true}
            label={"Reden"}
            name="reason"
            value={values.reason}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.reason && errors.reason}
          />
        )}
        <Button isLoading={isLoading} formNoValidate={true} type="submit">
          Record opslaan
        </Button>
      </form>
    </FormModal>
  );
};

export default MedicationRecordModal;
