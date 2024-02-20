import React, { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EducationFormType } from "@/types/educations";
import { EducationResDto } from "@/types/educations";
import { useCreateEducation } from "@/utils/educations/create-education";
import { useUpdateEducation } from "@/utils/educations/update-education";
import InputFieldThin from "@/components/FormFields/InputFieldThin";
import Button from "@/components/buttons/Button";
import { FormProps } from "@/types/form-props";

const initialValues: EducationFormType = {
  institution_name: "",
  degree: "",
  field_of_study: "",
  start_date: "",
  end_date: "",
};

type Props = FormProps<EducationResDto> & {
  employeeId: number;
};

const educationSchema: Yup.ObjectSchema<EducationFormType> = Yup.object({
  institution_name: Yup.string().required("Naam van het instituut is vereist"),
  degree: Yup.string().required("Diploma is vereist"),
  field_of_study: Yup.string().required("Studierichting is vereist"),
  start_date: Yup.string().required("Startdatum is vereist"),
  end_date: Yup.string().required("Einddatum is vereist"),
});

const EducationForm: FunctionComponent<Props> = ({
  mode = "add",
  onSuccess,
  employeeId,
  initialData,
}) => {
  const { mutate: create, isLoading: isCreating } = useCreateEducation();
  const { mutate: update, isLoading: isUpdating } = useUpdateEducation();

  function onSubmit(value: EducationFormType) {
    if (mode === "add") {
      create(
        {
          ...value,
          employee: employeeId,
        },
        {
          onSuccess,
        }
      );
    } else if (mode === "update") {
      update(
        {
          ...value,
          employee: employeeId,
          id: initialData.id,
        },
        {
          onSuccess,
        }
      );
    }
  }
  const { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik<EducationFormType>({
      initialValues: mode === "update" ? initialData : initialValues,
      onSubmit: onSubmit,
      validationSchema: educationSchema,
    });
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <InputFieldThin
          className="w-full xl:w-1/2"
          name="institution_name"
          id="institution_name"
          label="Naam Instituut"
          placeholder="Voer de naam van de instelling in"
          type="text"
          value={values.institution_name}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.institution_name && errors.institution_name}
        />
        <InputFieldThin
          className="w-full xl:w-1/2"
          name="degree"
          id="degree"
          label="Diploma"
          placeholder="Voer het diploma in"
          type="text"
          value={values.degree}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.degree && errors.degree}
        />
      </div>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <InputFieldThin
          className="w-full xl:w-1/2"
          name="field_of_study"
          id="field_of_study"
          label="Studierichting"
          placeholder="Voer de studierichting in"
          type="text"
          value={values.field_of_study}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.field_of_study && errors.field_of_study}
        />
        <div className="w-full xl:w-1/2" />
      </div>
      <div className="mb-6 flex flex-col gap-6 xl:flex-row">
        <InputFieldThin
          className="w-full xl:w-1/2"
          name="start_date"
          id="start_date"
          label="Startdatum"
          placeholder="Voer de startdatum in"
          value={values.start_date}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          type="date"
          error={touched.start_date && errors.start_date}
        />
        <InputFieldThin
          className="w-full xl:w-1/2"
          name="end_date"
          id="end_date"
          label="Einddatum"
          placeholder="Voer de einddatum in"
          value={values.end_date}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          type="date"
          error={touched.end_date && errors.end_date}
        />
      </div>

      <Button
        type="submit"
        formNoValidate={true}
        isLoading={isCreating || isUpdating}
        loadingText={mode === "add" ? "Toevoegen..." : "Bijwerken..."}
      >
        {mode === "add" ? "Opleiding Indienen" : "Opleiding Bijwerken"}
      </Button>
    </form>
  );
};

export default EducationForm;
