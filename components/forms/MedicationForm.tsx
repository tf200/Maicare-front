"use client";

import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useCreateMedication } from "@/utils/medications/createMedication";
import { MedicationFormType } from "@/types/medications/medication-form-type";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Button from "@/components/buttons/Button";
import Textarea from "@/components/FormFields/Textarea";
import { useRouter } from "next/navigation";
import { useGetMedication } from "@/utils/medications/getMedication";
import { usePatchMedication } from "@/utils/medications/patchMedication";
import ComboBox from "../ComboBox";
import { useEmployeesList } from "@/utils/employees/getEmployeesList";
import DateTimePicker from "@/components/FormFields/DateTimePicker";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import FormikCheckboxItem from "@/components/FormFields/FormikCheckboxItem";
import EmployeeSelector from "@/components/FormFields/comboboxes/EmployeeSelector";
import CheckBoxInputFieldThin from "../FormFields/CheckBoxInputThin";
dayjs.extend(isBetween);

const initialValues: MedicationFormType = {
  name: "",
  dosage: "",
  start_date: "",
  end_date: "",
  slots: [],
  notes: "",
  administered_by: undefined,
  self_administered: false,
  is_critical: false,
};

const medicationSchema: Yup.ObjectSchema<MedicationFormType> =
  Yup.object().shape({
    name: Yup.string().required("Geef alstublieft de medicatienaam op"),
    dosage: Yup.string().required("Geef alstublieft de dosering op"),
    start_date: Yup.string().required("Geef alstublieft de startdatum op"),
    end_date: Yup.string().required("Geef alstublieft de einddatum op"),
    slots: Yup.array().min(1, "Selecteer alstublieft minstens één dag"),
    notes: Yup.string().required("Geef alstublieft notities op"),
    administered_by: Yup.mixed(),
    self_administered: Yup.boolean(),
    is_critical: Yup.boolean(),
  });

type Props = {
  clientId: number;
  mode: string;
  medicationId?: number;
};

const MedicationForm: FunctionComponent<Props> = ({
  clientId,
  medicationId,
  mode,
}) => {
  const router = useRouter();

  const { data, isLoading: isDataLoading } = useGetMedication(
    medicationId,
    clientId
  );

  const { mutate: create, isLoading: isCreating } =
    useCreateMedication(clientId);

  const { mutate: update, isLoading: isPatching } =
    usePatchMedication(clientId);


  const [administredByEveryone, setAdministredByEveryone] = useState(true)

    const onSubmit = useCallback((values, { resetForm }) => {
      if (administredByEveryone)
        values.administered_by = null

      if (mode === "edit") {
        update(
          {
            ...values,
            id: medicationId,
          },
          {
            onSuccess: () => {
              resetForm();
              router.push(`/clients/${clientId}/medical-record/medications`);
            },
          }
        );
      } else if (mode === "new") {
        create(
          { ...values, client: clientId },
          {
            onSuccess: () => {
              resetForm();
              router.push(`/clients/${clientId}/medical-record/medications`);
            },
          }
        );
      }
    },
    [create, update, administredByEveryone]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      mode == "edit" ? (data ? data : initialValues) : initialValues,
    validationSchema: medicationSchema,
    onSubmit,
  });

  const {
    values,
    handleChange,
    setValues,
    handleBlur,
    touched,
    handleSubmit,
    errors,
  } = formik;

  useEffect(() => {
    if (!values.start_date || !values.end_date) {
      return;
    }
    setValues((prev: MedicationFormType) => {
      return {
        ...prev,
        slots: prev.slots.filter((slot) =>
          dayjs(slot.date).isBetween(
            values.start_date,
            values.end_date,
            "day",
            "[]"
          )
        ),
      };
    });
  }, [values.start_date, values.end_date]);

  useEffect(() => {
    setAdministredByEveryone(!formik.values.administered_by)
  }, [formik.values.administered_by])

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          <InputField
            className={"w-full mb-4.5"}
            required={true}
            id={"name"}
            label={"Naam van Medicatie"}
            type={"text"}
            placeholder={"Enter medication name"}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
          />
          <InputField
            className={"w-full mb-4.5"}
            required={true}
            id={"dosage"}
            label={"Dosering"}
            type={"text"}
            placeholder={"Enter dosage"}
            value={values.dosage}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.dosage && errors.dosage}
          />
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <InputField
              label={"Startdatum"}
              required={true}
              id={"start_date"}
              type={"date"}
              className="w-full xl:w-1/2"
              value={(values.start_date ?? "") + ""}
              onChange={handleChange}
              onBlur={handleBlur}
              min={dayjs().format("YYYY-MM-DD")}
              max={values.end_date}
              error={
                touched.start_date &&
                errors.start_date &&
                errors.start_date + ""
              }
            />
            <InputField
              className={"w-full xl:w-1/2"}
              id={"end_date"}
              required={true}
              type={"date"}
              label={"Einddatum"}
              min={values.start_date}
              value={(values.end_date ?? "") + ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.end_date && errors.end_date && errors.end_date + ""
              }
            />
          </div>
          {values.start_date && values.end_date && (
            <DateTimePicker
              minDate={dayjs(values.start_date).toDate()}
              maxDate={dayjs(values.end_date).toDate()}
              name={"slots"}
              label={"Dagen en Tijden"}
              required={true}
              error={touched.slots && errors.slots}
            />
          )}
          
          <CheckBoxInputFieldThin
            className={"mb-6"}
            label={"Beheerd door iedereen (met de toestemming \"medische meldingen ontvangen\".)"}
            onChange={(e) => setAdministredByEveryone(e.target.checked)}
            checked={administredByEveryone}
          />
          {!administredByEveryone && (
            <EmployeeSelector
              className="mb-6"
              required={!administredByEveryone}
              name={"administered_by"}
            />
          )}
          <Textarea
            rows={6}
            id={"notes"}
            required={true}
            className={"mb-6"}
            label={"Notities bij Medicatie"}
            placeholder={"Please provide notes for this medication"}
            value={values.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.notes && errors.notes}
          />

          <FormikCheckboxItem
            className={"mb-6"}
            label={"Zelf toegediend ?"}
            name={"self_administered"}
            id={"self_administered"}
          />

          <FormikCheckboxItem
            className={"mb-6"}
            label={"Kritiek Medicatie"}
            id={"is_critical"}
            name={"is_critical"}
          />

          <Button
            type={"submit"}
            disabled={isCreating || isPatching}
            isLoading={isCreating || isPatching}
            formNoValidate={true}
            loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
          >
            {mode === "edit" ? "Medicatie bijwerken" : "Medicatie indienen"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default MedicationForm;
