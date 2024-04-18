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
import { Formik, FormikProvider, useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Button from "@/components/buttons/Button";
import Textarea from "@/components/FormFields/Textarea";
import { useRouter } from "next/navigation";
import { useGetMedication } from "@/utils/medications/getMedication";
import { usePatchMedication } from "@/utils/medications/patchMedication";
import CheckBoxInputFieldThin from "../FormFields/CheckBoxInputThin";
import ComboBox from "../ComboBox";
import { useEmployeesList } from "@/utils/employees/getEmployeesList";
import DateTimePicker from "@/components/FormFields/DateTimePicker";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
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

  const [selectedOption, setSelectedOption] = useState(null);
  const [searchedKey, setSearchedKey] = useState(null);
  const [errorOptionMessage, setErrorOptionMessage] = useState(null);

  const { data: SearchData, isLoading: isSearching } = useEmployeesList({
    search: searchedKey,
    out_of_service: false,
  });

  const { data, isLoading: isDataLoading } = useGetMedication(
    medicationId,
    clientId
  );

  const { mutate: create, isLoading: isCreating } =
    useCreateMedication(clientId);

  const { mutate: update, isLoading: isPatching } =
    usePatchMedication(clientId);

  const onSubmit = useCallback(
    (values, { resetForm }) => {
      if (mode === "edit") {
        update(
          {
            ...values,
            id: medicationId,
          },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/clients/${clientId}/medical-record/medications`);
            },
          }
        );
      } else if (mode === "new") {
        create(
          { ...values, client: clientId },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/clients/${clientId}/medical-record/medications`);
            },
          }
        );
      }
    },
    [create, update]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      mode == "edit" ? (data ? data : initialValues) : initialValues,
    validationSchema: medicationSchema,
    onSubmit: (values, { resetForm }) => {
      if (!selectedOption) {
        setErrorOptionMessage("Geef alstublieft een medewerker op");
        return;
      } else {
        setErrorOptionMessage("");
        let data = values;
        data.administered_by = selectedOption?.id;
        onSubmit(data, { resetForm });
      }
    },
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
              value={(values.end_date ?? "") + ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.end_date && errors.end_date && errors.end_date + ""
              }
            />
          </div>
          <DateTimePicker
            minDate={dayjs(values.start_date).toDate()}
            maxDate={dayjs(values.end_date).toDate()}
            name={"slots"}
            label={"Dagen"}
            required={true}
            error={touched.slots && errors.slots}
          />
          <ComboBox
            label="Beheerd door"
            placeholder="Zoek naar werknemers"
            data={SearchData}
            isLoading={isSearching}
            setSelected={setSelectedOption}
            setSearchedKey={setSearchedKey}
            error={errorOptionMessage}
            setError={setErrorOptionMessage}
          />
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

          <CheckBoxInputFieldThin
            className={"w-full mb-4.5"}
            label={"Zelf toegediend ?"}
            name={"self_administered"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.self_administered}
          />

          <Button
            type={"submit"}
            disabled={isCreating || isPatching}
            isLoading={isCreating || isPatching}
            formNoValidate={true}
            loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
            onClick={() => {
              console.log("clicked", values);
            }}
          >
            {mode === "edit" ? "Medicatie bijwerken" : "Medicatie indienen"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default MedicationForm;
