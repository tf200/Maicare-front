import React, { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ExperienceFormType } from "@/types/experiences/experience-form-type";
import { ExpResDto } from "@/types/experiences/exp-res.dto";
import { useCreateExperience } from "@/utils/experiences/create-experience";
import { useUpdateExperience } from "@/utils/experiences/update-experience";
import InputField from "@/components/FormFields/InputField";
import Button from "@/components/buttons/Button";
import Textarea from "@/components/FormFields/Textarea";
import { FormProps } from "@/types/form-props";

const initialValues: ExperienceFormType = {
  job_title: "",
  company_name: "",
  start_date: "",
  end_date: "",
  description: "",
};

type Props = FormProps<ExpResDto> & {
  employeeId: number;
};

const experienceSchema: Yup.ObjectSchema<ExperienceFormType> = Yup.object({
  job_title: Yup.string().required("Job title is required"),
  company_name: Yup.string().required("Company name is required"),
  start_date: Yup.string().required("Start date is required"),
  end_date: Yup.string().required("End date is required"),
  description: Yup.string().required("Description is required"),
});

const ExperienceForm: FunctionComponent<Props> = ({
  mode = "add",
  onSuccess,
  employeeId,
  initialData,
}) => {
  const { mutate: create, isLoading: isCreating } = useCreateExperience();
  const { mutate: update, isLoading: isUpdating } = useUpdateExperience();

  function onSubmit(value: ExperienceFormType) {
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
    useFormik<ExperienceFormType>({
      initialValues: mode === "update" ? initialData : initialValues,
      onSubmit: onSubmit,
      validationSchema: experienceSchema,
    });
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <InputField
          className="w-full xl:w-1/2"
          name="job_title"
          id="job_title"
          label="Job Title"
          placeholder="Please enter the job title"
          type="text"
          value={values.job_title}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.job_title && errors.job_title}
        />
        <InputField
          className="w-full xl:w-1/2"
          name="company_name"
          id="company_name"
          label="Company Name"
          placeholder="Please enter the company name"
          type="text"
          value={values.company_name}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.company_name && errors.company_name}
        />
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

      <Textarea
        rows={6}
        id={"description"}
        required={true}
        className={"mb-6"}
        label={"Description"}
        placeholder={"Please enter the description of the experience"}
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.description && errors.description}
      />

      <Button
        type="submit"
        formNoValidate={true}
        isLoading={isCreating || isUpdating}
        loadingText={mode === "add" ? "Adding..." : "Updating..."}
      >
        {mode === "add" ? "Submit Experience" : "Update Experience"}
      </Button>
    </form>
  );
};

export default ExperienceForm;
