import React, { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EducationFormType } from "@/types/educations";
import { EducationResDto } from "@/types/educations";
import { useCreateEducation } from "@/utils/educations/create-education";
import { useUpdateEducation } from "@/utils/educations/update-education";
import InputField from "@/components/FormFields/InputField";
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
  institution_name: Yup.string().required("Institution name is required"),
  degree: Yup.string().required("Degree is required"),
  field_of_study: Yup.string().required("Field of study is required"),
  start_date: Yup.string().required("Start date is required"),
  end_date: Yup.string().required("End date is required"),
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
        <InputField
          className="w-full xl:w-1/2"
          name="institution_name"
          id="institution_name"
          label="Institution Name"
          placeholder="Please enter the institution name"
          type="text"
          value={values.institution_name}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.institution_name && errors.institution_name}
        />
        <InputField
          className="w-full xl:w-1/2"
          name="degree"
          id="degree"
          label="Degree"
          placeholder="Please enter the degree"
          type="text"
          value={values.degree}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.degree && errors.degree}
        />
      </div>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <InputField
          className="w-full xl:w-1/2"
          name="field_of_study"
          id="field_of_study"
          label="Field of Study"
          placeholder="Please enter the field of study"
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
        <InputField
          className="w-full xl:w-1/2"
          name="start_date"
          id="start_date"
          label="Start Date"
          placeholder="Please enter the start date"
          value={values.start_date}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          type="date"
          error={touched.start_date && errors.start_date}
        />
        <InputField
          className="w-full xl:w-1/2"
          name="end_date"
          id="end_date"
          label="End Date"
          placeholder="Please enter the end date"
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
        loadingText={mode === "add" ? "Adding..." : "Updating..."}
      >
        {mode === "add" ? "Submit Education" : "Update Education"}
      </Button>
    </form>
  );
};

export default EducationForm;
