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
  job_title: Yup.string().required("Functietitel is vereist"),
  company_name: Yup.string().required("Bedrijfsnaam is vereist"),
  start_date: Yup.string().required("Startdatum is vereist"),
  end_date: Yup.string().required("Einddatum is vereist"),
  description: Yup.string().required("Beschrijving is vereist"),
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
          label="Functietitel"
          placeholder="Voer de functietitel in"
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
          label="Bedrijfsnaam"
          placeholder="Voer de bedrijfsnaam in"
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
          label="Startdatum"
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
          label="Einddatum"
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
        label={"Beschrijving"}
        placeholder={"Voer de beschrijving van de ervaring in"}
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.description && errors.description}
      />

      <Button
        type="submit"
        formNoValidate={true}
        isLoading={isCreating || isUpdating}
        loadingText={mode === "add" ? "Toevoegen..." : "Bijwerken..."}
      >
        {mode === "add" ? "Ervaring Indienen" : "Ervaring Bijwerken"}
      </Button>
    </form>
  );
};

export default ExperienceForm;
